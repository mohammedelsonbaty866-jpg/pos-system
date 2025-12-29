/************************
 * DATA MODULE
 * إدارة البيانات العامة
 ************************/

/* ===== تهيئة أول مرة ===== */
(function initAppData() {
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify([]));
  }

  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]));
  }

  if (!localStorage.getItem("invoices")) {
    localStorage.setItem("invoices", JSON.stringify([]));
  }

  if (!localStorage.getItem("currentUser")) {
    localStorage.setItem("currentUser", "");
  }
})();

/* ===== المنتجات ===== */
function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

function getProductById(id) {
  return getProducts().find(p => p.id === id);
}

function addProduct(product) {
  const products = getProducts();
  products.push(product);
  saveProducts(products);
}

function updateStock(productId, qty) {
  const products = getProducts();
  const p = products.find(x => x.id === productId);
  if (!p) return;
  p.stock = Math.max(0, p.stock - qty);
  saveProducts(products);
}

/* ===== المستخدم الحالي ===== */
function setCurrentUser(phone) {
  localStorage.setItem("currentUser", phone);
}

function getCurrentUser() {
  return localStorage.getItem("currentUser");
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
