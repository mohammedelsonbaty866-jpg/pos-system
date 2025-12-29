/*************************************************
 * DATA LAYER
 * إدارة البيانات – LocalStorage
 *************************************************/

// ===============================
// مفاتيح التخزين
// ===============================
const STORAGE_KEYS = {
  USERS: "pos_users",
  CURRENT_USER: "currentUser",
  PRODUCTS: "pos_products",
  INVOICES: "pos_invoices",
  SETTINGS: "pos_settings"
};

// ===============================
// أدوات عامة
// ===============================
function getData(key, defaultValue = []) {
  return JSON.parse(localStorage.getItem(key)) || defaultValue;
}

function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ===============================
// المستخدمين
// ===============================
function getUsers() {
  return getData(STORAGE_KEYS.USERS);
}

function saveUsers(users) {
  setData(STORAGE_KEYS.USERS, users);
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
}

// ===============================
// المنتجات
// ===============================
function getProducts() {
  return getData(STORAGE_KEYS.PRODUCTS);
}

function saveProducts(products) {
  setData(STORAGE_KEYS.PRODUCTS, products);
}

// ===============================
// الفواتير
// ===============================
function getInvoices() {
  return getData(STORAGE_KEYS.INVOICES);
}

function saveInvoices(invoices) {
  setData(STORAGE_KEYS.INVOICES, invoices);
}

// ===============================
// الإعدادات
// ===============================
function getSettings() {
  return getData(STORAGE_KEYS.SETTINGS, {
    shopName: "نظام نقاط بيع",
    currency: "ج"
  });
}

function saveSettings(settings) {
  setData(STORAGE_KEYS.SETTINGS, settings);
}

// ===============================
// تهيئة أول مرة
// ===============================
(function initStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    saveProducts([]);
  }

  if (!localStorage.getItem(STORAGE_KEYS.INVOICES)) {
    saveInvoices([]);
  }

  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    saveUsers([]);
  }

  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    saveSettings(getSettings());
  }
})();
