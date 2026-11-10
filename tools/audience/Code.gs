/**
 * Cambon AI · Audience
 * ------------------------------------------------------------
 * Script Google Apps Script rattaché au tableur « Cambon AI · Audience ».
 * Déployé en application web : « Exécuter en tant que : moi »,
 * « Accès : tout le monde ».
 *
 * Reçoit les événements de mesure d'audience du site cambon.ai (sans cookie)
 * et ajoute une ligne par événement dans l'onglet « Événements » :
 *   horodatage | type | visite | vue | page | langue | provenance |
 *   provenance_brute | utm_source | utm_medium | utm_campaign | appareil | duree_s
 * Rien d'autre n'est enregistré : ni adresse IP, ni navigateur.
 *
 * Fonctions à lancer à la main depuis l'éditeur :
 *   setup()  crée les onglets « Événements » et « Tableau de bord » ;
 *   purge()  supprime les lignes de plus de 13 mois (à programmer chaque mois).
 *
 * Mode d'emploi : voir README.md dans le même dossier du dépôt.
 *
 * @OnlyCurrentDoc  Limite l'autorisation à CE tableur (et non à tous ceux du Drive).
 */

/* ============================================================
   PROVENANCES : regroupement des sites d'origine.
   Une ligne = [domaine, nom affiché]. La première règle qui correspond
   l'emporte : placer les règles précises avant les règles générales
   (ex. mail.google.com avant google.*).
   - « linkedin.com » correspond à linkedin.com et à ses sous-domaines
     (fr.linkedin.com…).
   - « google.* » correspond à google.com, google.fr, google.co.uk…
   Les préfixes www., m., l. et lm. sont retirés avant la comparaison.
   Un domaine absent de la liste est enregistré tel quel (sans www.).
   Pour ajouter une règle : ajouter une ligne, puis publier une nouvelle
   version du script (voir README).
   ============================================================ */
var PROVENANCES = [
  ['linkedin.com', 'linkedin'],
  ['lnkd.in', 'linkedin'],
  ['mail.google.com', 'gmail'],
  ['google.*', 'google'],
  ['googleusercontent.com', 'google'],
  ['com.google.android.gm', 'google'],
  ['facebook.com', 'facebook'],
  ['fb.me', 'facebook'],
  ['t.co', 'x'],
  ['x.com', 'x'],
  ['twitter.com', 'x'],
  ['bing.com', 'bing'],
  ['duckduckgo.com', 'duckduckgo'],
  ['qwant.com', 'qwant'],
];

var CONFIG = {
  EVENTS_SHEET: 'Événements',
  DASHBOARD_SHEET: 'Tableau de bord',
  HELPER_SHEET: '_visites', // calculs intermédiaires du tableau de bord (onglet masqué)
  HEADERS: [
    'horodatage', 'type', 'visite', 'vue', 'page', 'langue', 'provenance',
    'provenance_brute', 'utm_source', 'utm_medium', 'utm_campaign', 'appareil', 'duree_s',
  ],
  MAX_LENGTH: 200, // chaque valeur est tronquée à 200 caractères
  MAX_DURATION_S: 86400, // durée au-delà de 24 h : ignorée
  RETENTION_MONTHS: 13,
  TIMEZONE: 'Europe/Paris',
};

/* ---------- Réception des événements ---------- */

/** Reçoit un événement (corps text/plain contenant du JSON). */
function doPost(e) {
  try {
    var body = e && e.postData && e.postData.contents;
    if (!body || body.length > 4000) return text_('ignoré');
    var data = JSON.parse(body);
    var row = buildRow_(data);
    if (!row) return text_('ignoré');

    var lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) return text_('occupé');
    try {
      eventsSheet_().appendRow(row);
    } finally {
      lock.releaseLock();
    }
    return text_('ok');
  } catch (err) {
    return text_('ignoré');
  }
}

/** Vérification du déploiement : ?format=json */
function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.format === 'json') {
    return ContentService.createTextOutput(JSON.stringify({ ok: true, service: 'audience' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  return text_("Cette adresse reçoit la mesure d'audience du site cambon.ai.");
}

/**
 * Construit la ligne à écrire, ou renvoie null si l'événement est invalide.
 * Seuls les champs connus sont lus ; tout le reste est ignoré.
 */
function buildRow_(d) {
  if (!d || typeof d !== 'object' || Array.isArray(d)) return null;

  var type = clean_(d.type);
  if (type !== 'vue' && type !== 'fin') return null;

  var vue = id_(d.vue);
  if (!vue) return null;
  var visite = id_(d.visite); // peut être vide (stockage du navigateur inaccessible)

  var page = clean_(d.page);
  if (page.charAt(0) !== '/') page = '';

  var langue = clean_(d.langue);
  if (langue !== 'fr' && langue !== 'en') langue = '';

  var appareil = clean_(d.appareil);
  if (appareil !== 'mobile' && appareil !== 'ordinateur') appareil = '';

  var brute = clean_(d.provenance).toLowerCase();
  var provenance = normaliserProvenance_(brute);

  var duree = '';
  if (type === 'fin') {
    var n = Number(d.duree_s);
    if (!isFinite(n) || n < 0 || n > CONFIG.MAX_DURATION_S) return null;
    duree = Math.round(n);
  }

  return [
    new Date(),
    type,
    visite,
    vue,
    safe_(page),
    langue,
    safe_(provenance),
    safe_(brute),
    safe_(clean_(d.utm_source)),
    safe_(clean_(d.utm_medium)),
    safe_(clean_(d.utm_campaign)),
    appareil,
    duree,
  ];
}

/** Regroupe un domaine d'origine selon la table PROVENANCES. */
function normaliserProvenance_(brute) {
  if (!brute || brute === 'direct' || brute === 'interne') return brute;
  var host = brute.replace(/^(www|m|l|lm)\./, '');
  for (var i = 0; i < PROVENANCES.length; i++) {
    if (matches_(host, PROVENANCES[i][0])) return PROVENANCES[i][1];
  }
  return host;
}

/** Le domaine correspond-il au motif (sous-domaines compris) ? */
function matches_(host, motif) {
  var pattern = motif
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\\\.\*$/, '\\.[a-z]{2,3}(?:\\.[a-z]{2})?'); // « .* » final : extension de pays
  return new RegExp('^(?:.+\\.)?' + pattern + '$').test(host);
}

/** Texte nettoyé, sans caractères de contrôle, tronqué à 200 caractères. */
function clean_(v) {
  if (v === null || v === undefined) return '';
  if (typeof v !== 'string' && typeof v !== 'number') return '';
  return String(v).replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, CONFIG.MAX_LENGTH);
}

/** Identifiant aléatoire : lettres, chiffres et tirets uniquement. */
function id_(v) {
  var s = clean_(v);
  return /^[A-Za-z0-9-]{1,64}$/.test(s) ? s : '';
}

/** Empêche qu'une valeur soit interprétée comme une formule par le tableur. */
function safe_(s) {
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function text_(s) {
  return ContentService.createTextOutput(s).setMimeType(ContentService.MimeType.TEXT);
}

function eventsSheet_() {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName(CONFIG.EVENTS_SHEET);
  if (!sh) {
    sh = ss.insertSheet(CONFIG.EVENTS_SHEET, 0);
    sh.getRange(1, 1, 1, CONFIG.HEADERS.length).setValues([CONFIG.HEADERS]).setFontWeight('bold');
    sh.setFrozenRows(1);
    sh.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm:ss');
  }
  return sh;
}

/* ---------- Mise en place ---------- */

/**
 * Crée l'onglet « Événements » (en-têtes) et (re)crée le « Tableau de bord ».
 * Peut être relancée sans risque : les événements ne sont jamais effacés.
 */
function setup() {
  var ss = SpreadsheetApp.getActive();
  ss.setSpreadsheetTimeZone(CONFIG.TIMEZONE);
  eventsSheet_();

  // Onglet de calcul : une ligne par visite des 30 derniers jours.
  var helper = ss.getSheetByName(CONFIG.HELPER_SHEET) || ss.insertSheet(CONFIG.HELPER_SHEET);
  helper.clear();
  helper.getRange('A1').setFormula(FORMULE_VISITES);
  helper.hideSheet();

  // Tableau de bord
  var db = ss.getSheetByName(CONFIG.DASHBOARD_SHEET) || ss.insertSheet(CONFIG.DASHBOARD_SHEET, 1);
  db.clear();
  db.getRange('A1').setValue('Audience cambon.ai · 30 derniers jours').setFontWeight('bold').setFontSize(14);
  db.getRange('A2').setValue('Visites :').setFontWeight('bold');
  db.getRange('B2').setFormula("=COUNTA('_visites'!A2:A)");
  db.getRange('C2').setValue('Mis à jour à chaque nouvel événement (et toutes les heures).');

  var blocs = [
    ['A4', 'Visites par jour', FORMULES.parJour],
    ['D4', 'Visites par source', FORMULES.parSource],
    ['G4', 'Visites par provenance', FORMULES.parProvenance],
    ['J4', 'Visites par utm_source et utm_campaign', FORMULES.parUtm],
    ['N4', 'Pages vues par page', FORMULES.parPage],
    ['Q4', "Durée d'une visite (secondes)", FORMULES.dureeTotal],
    ['Q9', 'Durée par source (secondes)', FORMULES.dureeParSource],
    ['V4', 'Part mobile / ordinateur', FORMULES.appareils],
  ];
  blocs.forEach(function (b) {
    var titre = db.getRange(b[0]);
    titre.setValue(b[1]).setFontWeight('bold');
    titre.offset(1, 0).setFormula(b[2]);
  });
  db.setFrozenRows(2);
  db.getRange('5:5').setFontWeight('bold');
  db.getRange('Q10:T10').setFontWeight('bold');
  // NOW() (fenêtre de 30 jours) est recalculé à chaque modification et toutes les heures.
  ss.setRecalculationInterval(SpreadsheetApp.RecalculationInterval.HOUR);
  db.activate();
}

/* ---------- Conservation : 13 mois ---------- */

/** Supprime les événements de plus de 13 mois. À programmer chaque mois (voir README). */
function purge() {
  var sh = SpreadsheetApp.getActive().getSheetByName(CONFIG.EVENTS_SHEET);
  if (!sh || sh.getLastRow() < 2) return;
  var limite = new Date();
  limite.setMonth(limite.getMonth() - CONFIG.RETENTION_MONTHS);

  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var dates = sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues();
    // Les lignes sont ajoutées dans l'ordre chronologique : on compte les plus anciennes.
    var n = 0;
    while (n < dates.length && dates[n][0] instanceof Date && dates[n][0] < limite) n++;
    if (n > 0) sh.deleteRows(2, n);
    Logger.log(n + ' ligne(s) supprimée(s).');
  } finally {
    lock.releaseLock();
  }
}

/* ============================================================
   FORMULES DU TABLEAU DE BORD
   Tout est calculé par formules à partir de l'onglet « Événements » :
   une nouvelle provenance, source ou campagne apparaît d'elle-même.
   ============================================================ */

/**
 * Onglet « _visites » : une ligne par visite des 30 derniers jours.
 * - Clé de visite : l'id de visite, ou l'id de vue s'il manque.
 * - Jour, provenance, utm et appareil : ceux du PREMIER événement « vue ».
 * - Source : utm_source s'il existe, sinon la provenance.
 * - Durée : somme, sur les vues de la visite, du plus grand duree_s de chaque vue.
 */
var FORMULE_VISITES = [
  '=ARRAYFORMULA(LET(',
  "ev, 'Événements'!A2:M,",
  'depuis, NOW() - 30,',
  'entetes, HSTACK("visite", "jour", "source", "provenance", "utm_source", "utm_campaign", "appareil", "duree_s"),',
  'v, SORT(FILTER(ev, INDEX(ev, 0, 2) = "vue", INDEX(ev, 0, 1) >= depuis), 1, TRUE),',
  'cle, IF(INDEX(v, 0, 3) = "", INDEX(v, 0, 4), INDEX(v, 0, 3)),',
  'tab, HSTACK(cle, TEXT(INDEX(v, 0, 1), "yyyy-mm-dd"), INDEX(v, 0, 7), INDEX(v, 0, 9), INDEX(v, 0, 11), INDEX(v, 0, 12)),',
  'cles, UNIQUE(cle),',
  'prem, VLOOKUP(cles, tab, SEQUENCE(1, 5, 2), FALSE),',
  'f, FILTER(ev, INDEX(ev, 0, 2) = "fin", INDEX(ev, 0, 1) >= depuis, ISNUMBER(INDEX(ev, 0, 13))),',
  'fcle, IF(INDEX(f, 0, 3) = "", INDEX(f, 0, 4), INDEX(f, 0, 3)),',
  "parVue, QUERY(HSTACK(INDEX(f, 0, 4), fcle, INDEX(f, 0, 13)), \"select Col1, Col2, max(Col3) group by Col1, Col2 label Col1 '', Col2 '', max(Col3) ''\", 0),",
  "parVisite, QUERY(parVue, \"select Col2, sum(Col3) group by Col2 label Col2 '', sum(Col3) ''\", 0),",
  'duree, MAP(cles, LAMBDA(k, IFERROR(VLOOKUP(k, parVisite, 2, FALSE), 0))),',
  'utmSource, INDEX(prem, 0, 3),',
  'source, IF(utmSource <> "", utmSource, INDEX(prem, 0, 2)),',
  'corps, HSTACK(cles, INDEX(prem, 0, 1),',
  '  IF(source = "", "(aucune)", source),',
  '  IF(INDEX(prem, 0, 2) = "", "(aucune)", INDEX(prem, 0, 2)),',
  '  IF(utmSource = "", "(aucune)", utmSource),',
  '  IF(INDEX(prem, 0, 4) = "", "(aucune)", INDEX(prem, 0, 4)),',
  '  IF(INDEX(prem, 0, 5) = "", "(aucune)", INDEX(prem, 0, 5)),',
  '  duree),',
  'IFERROR(VSTACK(entetes, corps), entetes)',
  '))',
].join('\n');

var VIDE = '"Pas encore de données"';

/** Requête « une ligne par valeur » sur l'onglet _visites, triée par visites. */
function parValeur_(col, libelle) {
  return '=IFERROR(QUERY(\'_visites\'!A1:H, "select ' + col + ', count(A) where A is not null group by ' + col +
    ' order by count(A) desc label ' + col + " '" + libelle + "', count(A) 'Visites'\", 1), " + VIDE + ')';
}

var FORMULES = {
  parJour:
    "=IFERROR(QUERY('_visites'!A1:H, \"select B, count(A) where A is not null group by B order by B desc label B 'Jour', count(A) 'Visites'\", 1), " + VIDE + ')',
  parSource: parValeur_('C', 'Source'),
  parProvenance: parValeur_('D', 'Provenance'),
  parUtm:
    "=IFERROR(QUERY('_visites'!A1:H, \"select E, F, count(A) where A is not null group by E, F order by count(A) desc label E 'utm_source', F 'utm_campaign', count(A) 'Visites'\", 1), " + VIDE + ')',
  parPage:
    "=IFERROR(QUERY('Événements'!A1:M, \"select E, count(D) where B = 'vue' and A >= datetime '\"&TEXT(NOW() - 30, \"yyyy-mm-dd HH:mm:ss\")&\"' group by E order by count(D) desc label E 'Page', count(D) 'Vues'\", 1), " + VIDE + ')',
  dureeTotal: [
    '=IFERROR(VSTACK(',
    'HSTACK("", "Médiane", "Moyenne"),',
    "HSTACK(\"Toutes les visites\", ROUND(MEDIAN(FILTER('_visites'!H2:H, '_visites'!A2:A <> \"\")), 0), ROUND(AVERAGE(FILTER('_visites'!H2:H, '_visites'!A2:A <> \"\")), 0))",
    '), ' + VIDE + ')',
  ].join('\n'),
  dureeParSource: [
    '=IFERROR(LET(',
    "s, QUERY('_visites'!A1:H, \"select C, count(A) where A is not null group by C order by count(A) desc label C '', count(A) ''\", 1),",
    "med, MAP(INDEX(s, 0, 1), LAMBDA(k, ROUND(MEDIAN(FILTER('_visites'!H2:H, '_visites'!C2:C = k)), 0))),",
    "moy, MAP(INDEX(s, 0, 1), LAMBDA(k, ROUND(AVERAGE(FILTER('_visites'!H2:H, '_visites'!C2:C = k)), 0))),",
    'VSTACK(HSTACK("Source", "Visites", "Médiane", "Moyenne"), HSTACK(s, med, moy))',
    '), ' + VIDE + ')',
  ].join('\n'),
  appareils: [
    '=IFERROR(LET(',
    "q, QUERY('_visites'!A1:H, \"select G, count(A) where A is not null group by G order by count(A) desc label G '', count(A) ''\", 1),",
    'part, ARRAYFORMULA(TEXT(INDEX(q, 0, 2) / SUM(INDEX(q, 0, 2)), "0 %")),',
    'VSTACK(HSTACK("Appareil", "Visites", "Part"), HSTACK(q, part))',
    '), ' + VIDE + ')',
  ].join('\n'),
};
