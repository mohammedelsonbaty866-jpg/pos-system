/* ===============================
   POS SYSTEM - CORE LOGIC
   Author: Mohammed
   Version: Professional
================================ */

// ---------- Local Storage Keys ----------
const STORAGE_KEYS = {
  PRODUCTS: "pos_products",
  CART: "pos_cart",
  SALES: "pos_sales",
  CUSTOMERS: "pos_customers"
};

// ---------- Helpers ----------
function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function setData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function generateId() {
  return Date.now();
}

// ---------- Products ----------
function getProducts() {
  return getData(STORAGE_KEYS.PRODUCTS);
}

function saveProduct(name, price) {
  const products = getProducts();
  products.push({
    id: generateId(),
    name,
    price: Number(price)
  });
  setData(STORAGE_KEYS.PRODUCTS, products);
}

function deleteProduct(id) {
  let products = getProducts();
  products = products.filter(p => p.id !== id);
  setData(STORAGE_KEYS.PRODUCTS, products);
}

// ---------- Cart ----------
function getCart() {
  return getData(STORAGE_KEYS.CART);
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(i => i.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      ...product,
      qty: 1
    });
  }

  setData(STORAGE_KEYS.CART, cart);
  renderCart();
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  setData(STORAGE_KEYS.CART, cart);
  renderCart();
}

function clearCart() {
  setData(STORAGE_KEYS.CART, []);
  renderCart();
}

// ---------- Sales ----------
function saveSale(total) {
  const sales = getData(STORAGE_KEYS.SALES);
  sales.push({
    id: generateId(),
    date: new Date().toLocaleString("ar-EG"),
    items: getCart(),
    total
  });
  setData(STORAGE_KEYS.SALES, sales);
  clearCart();
}

// ---------- Rendering ----------
function renderProducts(containerId = "products") {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";
  getProducts().forEach(p => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <strong>${p.name}</strong>
      <div>${p.price} جنيه</div>
    `;
    div.onclick = () => addToCart(p);
    container.appendChild(div);
  });
}

function renderCart(containerId = "cart") {
  const container = document.getElementById(containerId);
  const totalEl = document.getElementById("total");
  if (!container || !totalEl) return;

  container.innerHTML = "";
  let total = 0;

  getCart().forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      ${item.name} × ${item.qty}
      <span>${item.price * item.qty} جنيه</span>
    `;
    container.appendChild(div);
  });

  totalEl.innerText = total;
}

// ---------- Admin ----------
function renderAdminProducts(tableId = "admin-products") {
  const table = document.getElementById(tableId);
  if (!table) return;

  table.innerHTML = "";
  getProducts().forEach(p => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.name}</td>
      <td>${p.price}</td>
      <td>
        <button onclick="deleteProduct(${p.id}); renderAdminProducts();">
          حذف
        </button>
      </td>
    `;
    table.appendChild(row);
  });
}

// ---------- Reports ----------
function renderReports(containerId = "reports") {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";
  let totalSales = 0;

  getData(STORAGE_KEYS.SALES).forEach(sale => {
    totalSales += sale.total;
    const div = document.createElement("div");
    div.className = "report-item";
    div.innerHTML = `
      <strong>${sale.date}</strong>
      <div>الإجمالي: ${sale.total} جنيه</div>
    `;
    container.appendChild(div);
  });

  container.innerHTML += `<hr><strong>إجمالي المبيعات: ${totalSales} جنيه</strong>`;
}

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
});
