/*********************************
 * DATA.JS
 * مركز البيانات للتطبيق
 *********************************/

/* ====== PRODUCTS ====== */
let products = JSON.parse(localStorage.getItem("products")) || [];

/* ====== INVOICES ====== */
let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

/* ====== SETTINGS ====== */
let settings = JSON.parse(localStorage.getItem("settings")) || {
  shopName: "نظام كاشير"
};

/* ====== SAVE FUNCTIONS ====== */
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

function saveInvoices() {
  localStorage.setItem("invoices", JSON.stringify(invoices));
}

function saveSettings() {
  localStorage.setItem("settings", JSON.stringify(settings));
}

/* ====== HELPERS ====== */
function formatDate() {
  return new Date().toLocaleString("ar-EG");
}
