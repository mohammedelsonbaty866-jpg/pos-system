// assets/js/core/data.js

const DB = {
  users: JSON.parse(localStorage.getItem("users")) || [],
  products: JSON.parse(localStorage.getItem("products")) || [],
  invoices: JSON.parse(localStorage.getItem("invoices")) || [],
  settings: JSON.parse(localStorage.getItem("settings")) || {}
};

function saveDB() {
  localStorage.setItem("users", JSON.stringify(DB.users));
  localStorage.setItem("products", JSON.stringify(DB.products));
  localStorage.setItem("invoices", JSON.stringify(DB.invoices));
  localStorage.setItem("settings", JSON.stringify(DB.settings));
}

// أدوات مساعدة
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
