/**
 * Cambon AI · Inscriptions newsletter
 * ------------------------------------------------------------
 * Script Google Apps Script rattaché au tableur
 * « Cambon AI · Inscriptions newsletter ».
 * Déployé en application web : « Exécuter en tant que : moi »,
 * « Accès : tout le monde ».
 *
 * Reçoit le formulaire du site cambon.ai et ajoute une ligne :
 *   date | email | langue | page | consentement
 * Rien d'autre n'est enregistré (ni adresse IP, ni navigateur).
 *
 * Mode d'emploi : voir README.md dans le même dossier du dépôt.
 *
 * @OnlyCurrentDoc  Limite l'autorisation à CE tableur (et non à tous ceux du Drive).
 */

var CONFIG = {
  SHEET_NAME: 'Inscriptions',
  HEADERS: ['date', 'email', 'langue', 'page', 'consentement'],
  SITE_URL: 'https://cambon.ai',
  // Versions du texte de consentement acceptées. Si le texte de la case
  // à cocher change sur le site, ajouter ici la nouvelle version.
  CONSENT_VERSIONS: ['v1-2026-11'],
  MIN_DELAY_MS: 3000, // envoi plus rapide = robot
  TIMEZONE: 'Europe/Paris',
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
  },
  en: {
    title: 'Cambon AI newsletter',
    ok: "Thanks, you're on the list. See you soon in your inbox.",
    email: "This email address doesn't look valid.",
    consent: 'Tick the box to confirm your subscription.',
    error: 'Something went wrong. Email me directly at stephane@cambon.ai.',
    back: 'Back to the website',
    endpoint: 'This address receives newsletter sign-ups from the cambon.ai website.',
  },
};

/** Réception du formulaire. */
function doPost(e) {
  var p = (e && e.parameter) || {};
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

    // 4. Écriture, une à la fois. Doublon : pas de nouvelle ligne,
    //    mais même message de succès (ne pas révéler qui est inscrit).
    var lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) return respond_('error', lang, page, wantsJson);
    try {
      var sheet = getSheet_();
      if (!alreadySubscribed_(sheet, email)) {
        var date = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "yyyy-MM-dd'T'HH:mm:ssXXX");
        sheet.appendRow([date, email, lang, page, version]);
      }
    } finally {
      lock.releaseLock();
    }
    return respond_('ok', lang, page, wantsJson);
  } catch (err) {
    console.error('Inscription impossible : ' + (err && err.message)); // jamais l'adresse
    return respond_('error', lang, page, wantsJson);
  }
}

/** Ouverture de l'adresse dans un navigateur, ou test de déploiement (?format=json). */
function doGet(e) {
  var p = (e && e.parameter) || {};
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
  getSheet_();
  console.log('Tableur prêt : onglet « ' + CONFIG.SHEET_NAME + ' ».');
}

// ---------------------------------------------------------------------------

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

function alreadySubscribed_(sheet, email) {
  var last = sheet.getLastRow();
  if (last < 2) return false;
  var col = CONFIG.HEADERS.indexOf('email') + 1;
  return !!sheet
    .getRange(2, col, last - 1, 1)
    .createTextFinder(email)
    .matchCase(false)
    .matchEntireCell(true)
    .findNext();
}

function respond_(status, lang, page, wantsJson) {
  if (wantsJson) {
    return ContentService.createTextOutput(JSON.stringify({ ok: status === 'ok', status: status }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  return htmlPage_(lang, MESSAGES[lang][status], CONFIG.SITE_URL + page + '#newsletter', status === 'ok');
}

function htmlPage_(lang, message, backUrl, success) {
  var m = MESSAGES[lang];
  var html =
    '<!doctype html><html lang="' + lang + '"><head><meta charset="utf-8">' +
    '<style>' +
    'body{margin:0;background:#F3F1EA;color:#24395A;font:17px/1.6 Barlow,system-ui,-apple-system,"Segoe UI",sans-serif;' +
    'background-image:linear-gradient(rgba(14,46,85,.07) 1px,transparent 1px);background-size:100% 34px}' +
    'main{max-width:560px;margin:0 auto;padding:56px 20px}' +
    '.logo{font:600 24px/1 "Barlow Condensed","Arial Narrow",sans-serif;text-transform:uppercase;color:#0E2E55;letter-spacing:.02em}' +
    '.logo b{background:#FFB347;padding:2px 5px;border-radius:2px;font-weight:600}' +
    'p.msg{margin:40px 0 28px;padding:14px 16px;border-top:2px solid #0E2E55;color:#0E2E55;font-weight:600}' +
    'p.ok{background:rgba(255,179,71,.7)}' +
    'a.back{display:inline-flex;align-items:center;min-height:48px;padding:0 18px;border:2px solid #0E2E55;border-radius:2px;' +
    'background:#FFB347;color:#0E2E55;font-weight:600;text-decoration:none;box-shadow:3px 3px 0 #0E2E55}' +
    'a.back:focus-visible{outline:3px solid #0E2E55;outline-offset:3px}' +
    '</style></head><body><main>' +
    '<div class="logo">Cambon <b>AI</b></div>' +
    '<p class="msg' + (success ? ' ok' : '') + '" role="status">' + escapeHtml_(message) + '</p>' +
    '<a class="back" href="' + escapeHtml_(backUrl) + '" target="_top">← ' + escapeHtml_(m.back) + '</a>' +
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
