/* =====================================
   LOCAL DATABASE (LocalStorage)
   Users - Products - Invoices - Settings
   ===================================== */

/* ---------- USERS ---------- */
// users: [{id, phone, password, role}]
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([]));
}

// current logged user
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

/* ---------- PRODUCTS ---------- */
// products: [{id, name, price, barcode}]
if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify([]));
}

function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

/* ---------- INVOICES ---------- */
// invoices: [{id, date, items, total, cashier}]
if (!localStorage.getItem("invoices")) {
  localStorage.setItem("invoices", JSON.stringify([]));
}

function getInvoices() {
  return JSON.parse(localStorage.getItem("invoices")) || [];
}

function saveInvoices(invoices) {
  localStorage.setItem("invoices", JSON.stringify(invoices));
}

/* ---------- SETTINGS ---------- */
// settings: {storeName, barcodeSound}
if (!localStorage.getItem("settings")) {
  localStorage.setItem(
    "settings",
    JSON.stringify({
      storeName: "متجري",
      barcodeSound: true
    })
  );
}

function getSettings() {
  return JSON.parse(localStorage.getItem("settings"));
}

function saveSettings(settings) {
  localStorage.setItem("settings", JSON.stringify(settings));
}

/* ---------- HELPERS ---------- */
function generateID(prefix = "") {
  return prefix + Date.now();
}

/* ---------- BARCODE SOUND ---------- */
const barcodeAudio = new Audio("assets/sounds/beep.mp3");

function playBarcodeSound() {
  const settings = getSettings();
  if (settings.barcodeSound) {
    barcodeAudio.currentTime = 0;
    barcodeAudio.play();
  }
}
