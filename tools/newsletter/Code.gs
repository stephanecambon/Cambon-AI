/**
 * Cambon AI · Inscriptions newsletter
 * ------------------------------------------------------------
 * Script Google Apps Script rattaché au tableur
 * « Cambon AI · Inscriptions newsletter ».
 * Déployé en application web : « Exécuter en tant que : moi »,
 * « Accès : tout le monde ».
 *
 * Reçoit le formulaire du site cambon.ai et ajoute une ligne :
 *   date | email | langue | page | consentement |
 *   optin_site | optin_veille_r | optin_exports | desinscription
 * Les colonnes optin_* contiennent la date d'inscription à chaque liste
 * (optin_exports : date et origine de l'import). desinscription : date à
 * laquelle la personne s'est désinscrite (elle ne reçoit plus rien).
 * Rien d'autre n'est enregistré (ni adresse IP, ni navigateur).
 * L'onglet « content » sert de sommaire éditorial (articles du blog, envois).
 * À chaque nouvelle inscription, un e-mail de notification est envoyé à
 * NOTIFY_EMAIL (pas pour les doublons ni les robots).
 *
 * Mode d'emploi : voir README.md dans le même dossier du dépôt.
 *
 * @OnlyCurrentDoc  Limite l'autorisation à CE tableur (et non à tous ceux du Drive).
 */

var CONFIG = {
  SHEET_NAME: 'Inscriptions',
  HEADERS: [
    'date', 'email', 'langue', 'page', 'consentement',
    'optin_site', 'optin_veille_r', 'optin_exports', 'desinscription',
  ],
  CONTENT_SHEET: 'content',
  CONTENT_HEADERS: ['titre', 'url', 'langue', 'statut', 'date_publication', 'date_envoi', 'listes', 'notes'],
  SITE_URL: 'https://cambon.ai',
  // Versions du texte de consentement acceptées. Si le texte de la case
  // à cocher change sur le site, ajouter ici la nouvelle version.
  CONSENT_VERSIONS: ['v1-2026-11'],
  MIN_DELAY_MS: 3000, // envoi plus rapide = robot
  TIMEZONE: 'Europe/Paris',
  // Destinataire des notifications de nouvelle inscription ('' pour désactiver).
  NOTIFY_EMAIL: 'stephane@cambon.ai',
};

var MESSAGES = {
  fr: {
    title: 'Newsletter Cambon AI',
    ok: "Merci, c'est noté. À bientôt dans votre boîte mail.",
    email: 'Cette adresse e-mail ne semble pas valide.',
    consent: 'Cochez la case pour confirmer votre inscription.',
    error: 'Une erreur est survenue. Écrivez-moi directement à stephane@cambon.ai.',
    back: 'Retour au site',
    endpoint: 'Cette adresse reçoit les inscriptions à la newsletter du site cambon.ai.',
    unsubAsk: 'Vous ne recevrez plus la newsletter de Cambon AI. Confirmez-vous votre désinscription ?',
    unsubButton: 'Me désinscrire',
    unsubDone: 'C’est fait : vous ne recevrez plus la newsletter de Cambon AI.',
  },
  en: {
    title: 'Cambon AI newsletter',
    ok: "Thanks, you're on the list. See you soon in your inbox.",
    email: "This email address doesn't look valid.",
    consent: 'Tick the box to confirm your subscription.',
    error: 'Something went wrong. Email me directly at stephane@cambon.ai.',
    back: 'Back to the website',
    endpoint: 'This address receives newsletter sign-ups from the cambon.ai website.',
    unsubAsk: 'You will no longer receive the Cambon AI newsletter. Do you confirm?',
    unsubButton: 'Unsubscribe',
    unsubDone: 'Done: you will no longer receive the Cambon AI newsletter.',
  },
};

/** Réception du formulaire. */
function doPost(e) {
  var p = (e && e.parameter) || {};
  if (p.format === 'desinscription') return desinscrire_(p);
  var lang = p.langue === 'en' ? 'en' : 'fr';
  var wantsJson = p.format === 'json'; // ajouté par le JavaScript du site
  var page = cleanPage_(p.page, lang);

  try {
    // 1. Robots : on fait comme si tout allait bien, sans rien enregistrer.
    if (looksLikeBot_(p)) return respond_('ok', lang, page, wantsJson);

    // 2. Consentement obligatoire, dans une version connue.
    var version = String(p.version || '');
    if (p.consentement !== 'oui' || CONFIG.CONSENT_VERSIONS.indexOf(version) === -1) {
      return respond_('consent', lang, page, wantsJson);
    }

    // 3. Adresse e-mail : minuscules, sans espaces, format valide.
    var email = String(p.email || '').replace(/\s+/g, '').toLowerCase();
    if (!isValidEmail_(email)) return respond_('email', lang, page, wantsJson);

    // 4. Écriture, une à la fois. Déjà inscrit via le site : pas de nouvelle
    //    ligne, mais même message de succès (ne pas révéler qui est inscrit).
    //    Déjà présent mais désinscrit, ou venu d'une autre liste : la ligne
    //    existante est mise à jour (nouvelle inscription via le site).
    var lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) return respond_('error', lang, page, wantsJson);
    var added = null;
    try {
      var sheet = getSheet_();
      var date = maintenant_();
      var row = findRow_(sheet, email);
      if (!row) {
        sheet.appendRow([date, email, lang, page, version, date, '', '', '']);
        added = { date: date, total: sheet.getLastRow() - 1 };
      } else {
        var c = colonnes_();
        var r = sheet.getRange(row, 1, 1, CONFIG.HEADERS.length).getValues()[0];
        if (r[c.desinscription] !== '' || r[c.optin_site] === '') {
          sheet.getRange(row, c.consentement + 1).setValue(version);
          sheet.getRange(row, c.optin_site + 1).setValue(date);
          sheet.getRange(row, c.desinscription + 1).setValue('');
          added = { date: date, total: sheet.getLastRow() - 1 };
        }
      }
    } finally {
      lock.releaseLock();
    }
    if (added) notify_(email, lang, page, added.date, added.total);
    return respond_('ok', lang, page, wantsJson);
  } catch (err) {
    console.error('Inscription impossible : ' + (err && err.message)); // jamais l'adresse
    return respond_('error', lang, page, wantsJson);
  }
}

/** Ouverture de l'adresse dans un navigateur, ou test de déploiement (?format=json). */
function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.format === 'stats') return lireInscriptions_(p);
  if (p.format === 'desinscription') return pageDesinscription_(p);
  if (p.format === 'json') {
    return ContentService.createTextOutput(JSON.stringify({ ok: true, service: 'newsletter' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  var lang = p.langue === 'en' ? 'en' : 'fr';
  return htmlPage_(lang, MESSAGES[lang].endpoint, CONFIG.SITE_URL + (lang === 'en' ? '/en/' : '/'));
}

/**
 * À lancer une fois à la main depuis l'éditeur (bouton « Exécuter ») :
 * crée l'onglet et les en-têtes, et déclenche la demande d'autorisation.
 */
function setup() {
  var sheet = getSheet_();
  migrer_(sheet);
  contentSheet_();
  console.log('Tableur prêt : onglets « ' + CONFIG.SHEET_NAME + ' » et « ' + CONFIG.CONTENT_SHEET + ' ».');
}

/**
 * Ajoute les colonnes manquantes (en-têtes en ligne 1, format texte brut)
 * et remplit optin_site pour les inscrits venus du site avant leur création.
 * Peut être relancée sans risque.
 */
function migrer_(sheet) {
  var n = CONFIG.HEADERS.length;
  var entetes = sheet.getRange(1, 1, 1, n).getValues()[0];
  for (var i = 0; i < n; i++) {
    if (entetes[i] === '') {
      sheet.getRange(1, i + 1).setValue(CONFIG.HEADERS[i]);
      sheet.getRange(1, i + 1, sheet.getMaxRows(), 1).setNumberFormat('@');
    } else if (entetes[i] !== CONFIG.HEADERS[i]) {
      throw new Error('Colonne ' + (i + 1) + ' inattendue : « ' + entetes[i] + ' » au lieu de « ' + CONFIG.HEADERS[i] + ' ».');
    }
  }
  var last = sheet.getLastRow();
  if (last < 2) return;
  var c = colonnes_();
  var rows = sheet.getRange(2, 1, last - 1, n).getValues();
  var remplies = 0;
  rows.forEach(function (r, k) {
    // Une ligne avec un consentement mais sans optin_site vient du formulaire du site.
    if (r[c.optin_site] === '' && r[c.consentement] !== '' && r[c.optin_exports] === '' && r[c.optin_veille_r] === '') {
      sheet.getRange(k + 2, c.optin_site + 1).setValue(String(r[c.date]));
      remplies++;
    }
  });
  console.log('optin_site rempli pour ' + remplies + ' inscrit(s).');
}

/** Onglet « content » : sommaire éditorial (articles du blog, dates d'envoi, listes visées). */
function contentSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(CONFIG.CONTENT_SHEET);
  if (!sh) {
    sh = ss.insertSheet(CONFIG.CONTENT_SHEET);
    sh.getRange(1, 1, sh.getMaxRows(), CONFIG.CONTENT_HEADERS.length).setNumberFormat('@');
    sh.getRange(1, 1, 1, CONFIG.CONTENT_HEADERS.length).setValues([CONFIG.CONTENT_HEADERS]).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

/**
 * À lancer une fois à la main depuis l'éditeur après l'ajout des notifications :
 * déclenche l'autorisation d'envoi d'e-mails et envoie un message de test.
 */
function testNotification() {
  notify_('test@example.com', 'fr', '/', Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "yyyy-MM-dd'T'HH:mm:ssXXX"), 0);
  console.log('E-mail de test envoyé à ' + CONFIG.NOTIFY_EMAIL + '.');
}

// ---------------------------------------------------------------------------

/** E-mail à Stéphane pour une nouvelle inscription. Une erreur d'envoi n'empêche pas l'inscription. */
function notify_(email, lang, page, date, total) {
  if (!CONFIG.NOTIFY_EMAIL) return;
  try {
    var url = SpreadsheetApp.getActiveSpreadsheet().getUrl();
    MailApp.sendEmail({
      to: CONFIG.NOTIFY_EMAIL,
      subject: 'Newsletter cambon.ai : nouvelle inscription (' + email + ')',
      name: 'Site cambon.ai',
      body:
        'Nouvelle inscription à la newsletter.\n\n' +
        'Adresse : ' + email + '\n' +
        'Langue : ' + lang + '\n' +
        'Page : ' + CONFIG.SITE_URL + page + '\n' +
        'Date : ' + date + '\n' +
        'Nombre d\'inscrits : ' + total + '\n\n' +
        'Tableur : ' + url + '\n',
    });
  } catch (err) {
    console.error('Notification impossible : ' + (err && err.message));
  }
}

function looksLikeBot_(p) {
  if (String(p.website || '').trim() !== '') return true; // champ piège rempli
  var shownAt = Number(p.t);
  if (!shownAt) return true; // formulaire trafiqué
  // Avec JavaScript, « sent » est l'heure d'envoi mesurée par le même
  // navigateur que « t » : pas de souci de décalage d'horloge.
  var sentAt = Number(p.sent) || Date.now();
  return sentAt - shownAt < CONFIG.MIN_DELAY_MS;
}

function isValidEmail_(email) {
  if (!email || email.length > 254) return false;
  // Commence par une lettre ou un chiffre : empêche aussi toute formule
  // (=, +, -, @) d'être interprétée par le tableur.
  return /^[a-z0-9][a-z0-9._%+'-]{0,63}@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:[a-z]{2,63}|xn--[a-z0-9-]{1,59})$/.test(email);
}

function cleanPage_(page, lang) {
  var s = String(page || '');
  return /^\/[a-z0-9\-\/]{0,120}$/.test(s) ? s : lang === 'en' ? '/en/' : '/';
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    // Texte brut partout : aucune conversion automatique de date ou de nombre.
    sheet.getRange(1, 1, sheet.getMaxRows(), CONFIG.HEADERS.length).setNumberFormat('@');
    sheet.appendRow(CONFIG.HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Numéro de ligne de l'adresse dans l'onglet, ou 0. */
function findRow_(sheet, email) {
  var last = sheet.getLastRow();
  if (last < 2) return 0;
  var col = CONFIG.HEADERS.indexOf('email') + 1;
  var cell = sheet
    .getRange(2, col, last - 1, 1)
    .createTextFinder(email)
    .matchCase(false)
    .matchEntireCell(true)
    .findNext();
  return cell ? cell.getRow() : 0;
}

/** Index (à partir de 0) de chaque colonne, par nom. */
function colonnes_() {
  var c = {};
  CONFIG.HEADERS.forEach(function (h, i) { c[h] = i; });
  return c;
}

function maintenant_() {
  return Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "yyyy-MM-dd'T'HH:mm:ssXXX");
}

function respond_(status, lang, page, wantsJson) {
  if (wantsJson) {
    return ContentService.createTextOutput(JSON.stringify({ ok: status === 'ok', status: status }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  return htmlPage_(lang, MESSAGES[lang][status], CONFIG.SITE_URL + page + '#newsletter', status === 'ok');
}

function htmlPage_(lang, message, backUrl, success, extra) {
  var m = MESSAGES[lang];
  var html =
    '<!doctype html><html lang="' + lang + '"><head><meta charset="utf-8">' +
    '<style>' + STYLE_PAGE_ + '</style></head><body><main>' +
    '<div class="logo">Cambon <b>AI</b></div>' +
    '<p class="msg' + (success ? ' ok' : '') + '" role="status">' + escapeHtml_(message) + '</p>' +
    (extra || '<a class="btn" href="' + escapeHtml_(backUrl) + '" target="_top">← ' + escapeHtml_(m.back) + '</a>') +
    '</main></body></html>';
  return HtmlService.createHtmlOutput(html)
    .setTitle(m.title)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function escapeHtml_(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Inscriptions pour la page /admin/ du site : date, langue, page, listes et
 * désinscription (oui / non). Les adresses e-mail ne sortent jamais du tableur.
 * Clé de lecture obligatoire.
 */
function lireInscriptions_(p) {
  if (!cleValide_(p.cle)) return json_({ ok: false });
  var sheet = getSheet_();
  var n = sheet.getLastRow() - 1;
  var rows = n > 0 ? sheet.getRange(2, 1, n, CONFIG.HEADERS.length).getDisplayValues() : [];
  var c = colonnes_();
  var inscriptions = rows.map(function (r) {
    return {
      date: r[c.date],
      langue: r[c.langue],
      page: r[c.page],
      site: r[c.optin_site] !== '',
      veille_r: r[c.optin_veille_r] !== '',
      exports: r[c.optin_exports] !== '',
      desinscrit: r[c.desinscription] !== '',
    };
  });
  return json_({ ok: true, total: inscriptions.length, inscriptions: inscriptions });
}

/* ---------- Lecture protégée (page /admin/ du site, en local uniquement) ---------- */

/**
 * La lecture des données (?format=stats&cle=…) n'aboutit qu'avec la clé
 * enregistrée dans la propriété de script CLE_LECTURE (voir creerCleLecture).
 */
function cleValide_(cle) {
  var attendue = PropertiesService.getScriptProperties().getProperty('CLE_LECTURE') || '';
  if (attendue.length < 32 || typeof cle !== 'string' || cle.length !== attendue.length) return false;
  var diff = 0;
  for (var i = 0; i < cle.length; i++) diff |= cle.charCodeAt(i) ^ attendue.charCodeAt(i);
  return diff === 0;
}

/**
 * À lancer une fois depuis l'éditeur : crée la clé de lecture (si elle n'existe
 * pas) et l'affiche dans le journal d'exécution. Elle se recopie dans le fichier
 * .env du site, sur l'ordinateur de travail uniquement (jamais dans le dépôt).
 * Pour changer de clé : supprimer la propriété CLE_LECTURE, puis relancer.
 */
function creerCleLecture() {
  var props = PropertiesService.getScriptProperties();
  var cle = props.getProperty('CLE_LECTURE');
  if (!cle) {
    cle = (Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, '');
    props.setProperty('CLE_LECTURE', cle);
  }
  console.log('Clé de lecture : ' + cle);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* ---------- Style des pages de réponse (charte Cambon AI) ---------- */

var STYLE_PAGE_ =
  'body{margin:0;background:#FFFBF7;color:#4A190F;font:17px/1.6 Barlow,system-ui,-apple-system,"Segoe UI",sans-serif}' +
  'main{max-width:560px;margin:0 auto;padding:56px 20px}' +
  '.logo{font:600 24px/1 "Barlow Condensed","Arial Narrow",sans-serif;text-transform:uppercase;color:#782114;letter-spacing:.02em}' +
  '.logo b{background:#E02A00;color:#fff;padding:2px 5px;border-radius:2px;font-weight:600}' +
  'p.msg{margin:40px 0 28px;padding:14px 16px;border-top:2px solid #782114;color:#782114;font-weight:600}' +
  'p.ok{background:#FFD2BA}' +
  '.btn{display:inline-flex;align-items:center;min-height:48px;padding:0 18px;border:2px solid #782114;border-radius:2px;' +
  'background:#E02A00;color:#fff;font:600 17px/1 Barlow,system-ui,sans-serif;text-decoration:none;box-shadow:3px 3px 0 #782114;cursor:pointer}' +
  '.btn:focus-visible{outline:3px solid #782114;outline-offset:3px}';

/* ---------- Désinscription ---------- */

/**
 * Jeton de désinscription d'une adresse : HMAC avec une clé secrète du script
 * (propriété CLE_DESINSCRIPTION, créée au premier appel). Le lien ne contient
 * jamais l'adresse e-mail, et on ne peut pas fabriquer le jeton d'un autre.
 */
function jeton_(email) {
  var props = PropertiesService.getScriptProperties();
  var cle = props.getProperty('CLE_DESINSCRIPTION');
  if (!cle) {
    cle = (Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, '');
    props.setProperty('CLE_DESINSCRIPTION', cle);
  }
  var sig = Utilities.computeHmacSha256Signature(String(email).toLowerCase(), cle);
  return Utilities.base64EncodeWebSafe(sig).replace(/=+$/, '').slice(0, 32);
}

/** Lien de désinscription à mettre dans chaque envoi. */
function lienDesinscription_(email, lang) {
  return ScriptApp.getService().getUrl() + '?format=desinscription&langue=' + (lang === 'en' ? 'en' : 'fr') +
    '&id=' + jeton_(email);
}

/**
 * GET (clic dans l'e-mail) : page de confirmation, sans rien modifier
 * (les antivirus des messageries ouvrent les liens tout seuls).
 * POST (bouton de confirmation) : la date de désinscription est enregistrée.
 * Même réponse que l'adresse soit trouvée ou non.
 */
function pageDesinscription_(p) {
  var lang = p.langue === 'en' ? 'en' : 'fr';
  var m = MESSAGES[lang];
  var id = String(p.id || '').replace(/[^A-Za-z0-9_-]/g, '').slice(0, 64);
  var form =
    '<form method="post" action="' + escapeHtml_(ScriptApp.getService().getUrl()) + '" target="_top">' +
    '<input type="hidden" name="format" value="desinscription">' +
    '<input type="hidden" name="langue" value="' + lang + '">' +
    '<input type="hidden" name="id" value="' + escapeHtml_(id) + '">' +
    '<button class="btn" type="submit">' + escapeHtml_(m.unsubButton) + '</button></form>';
  return htmlPage_(lang, m.unsubAsk, '', false, form);
}

function desinscrire_(p) {
  var lang = p.langue === 'en' ? 'en' : 'fr';
  var id = String(p.id || '');
  var lock = LockService.getScriptLock();
  if (lock.tryLock(10000)) {
    try {
      var sheet = getSheet_();
      var last = sheet.getLastRow();
      if (id && last >= 2) {
        var c = colonnes_();
        var rows = sheet.getRange(2, 1, last - 1, CONFIG.HEADERS.length).getValues();
        for (var i = 0; i < rows.length; i++) {
          if (rows[i][c.email] && jeton_(rows[i][c.email]) === id) {
            if (rows[i][c.desinscription] === '') sheet.getRange(i + 2, c.desinscription + 1).setValue(maintenant_());
            break;
          }
        }
      }
    } catch (err) {
      console.error('Désinscription impossible : ' + (err && err.message));
    } finally {
      lock.releaseLock();
    }
  }
  return htmlPage_(lang, MESSAGES[lang].unsubDone, CONFIG.SITE_URL + (lang === 'en' ? '/en/' : '/'), true);
}
