/* ===============================
   CORE.JS – POS SYSTEM
   =============================== */

/* ===== GLOBAL DATA ===== */
let products   = JSON.parse(localStorage.getItem("products") || "[]");
let customers  = JSON.parse(localStorage.getItem("customers") || "[]");
let invoices   = JSON.parse(localStorage.getItem("invoices") || "[]");
let settings   = JSON.parse(localStorage.getItem("settings") || "{}");

let cart = [];

/* ===== DOM SHORTCUT ===== */
const $ = id => document.getElementById(id);

/* ===== MENU ===== */
function toggleMenu() {
  const menu = $("menu");
  menu.classList.toggle("open");
}

/* ===== SCREEN NAV ===== */
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.remove("active")
  );
  $(screenId).classList.add("active");
  $("menu").classList.remove("open");
}

/* ===== SETTINGS ===== */
function saveSettings() {
  settings.shopName = $("shopInput").value.trim();
  localStorage.setItem("settings", JSON.stringify(settings));
  $("shopName").innerText = settings.shopName || "نظام كاشير";
  alert("تم حفظ الإعدادات");
}

/* ===== PRODUCTS RENDER ===== */
function renderProducts() {
  const grid = $("productsGrid");
  if (!grid) return;

  grid.innerHTML = "";
  products.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <strong>${p.name}</strong>
      <span>${p.price} جنيه</span>
    `;
    div.onclick = () => addToCart(i);
    grid.appendChild(div);
  });
}

/* ===== ADD TO CART ===== */
function addToCart(index) {
  const p = products[index];
  if (!p) return;

  const existing = cart.find(i => i.name === p.name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      name: p.name,
      price: p.price,
      qty: 1
    });
  }

  renderInvoice();
}

/* ===== INVOICE ===== */
function renderInvoice() {
  const box = $("invoiceItems");
  box.innerHTML = "";

  let total = 0;

  cart.forEach((item, i) => {
    total += item.price * item.qty;
    box.innerHTML += `
      <div class="invoice-item">
        <span>${item.name}</span>
        <span>${item.qty} × ${item.price}</span>
      </div>
    `;
  });

  $("total").innerText = total;
}

/* ===== SAVE INVOICE ===== */
function saveInvoice() {
  if (cart.length === 0) {
    alert("الفاتورة فارغة");
    return;
  }

  const invoice = {
    id: invoices.length + 1,
    date: new Date().toLocaleString("ar-EG"),
    items: cart,
    total: cart.reduce((s, i) => s + i.price * i.qty, 0),
    payType: $("payType").value,
    customer: $("payType").value === "credit"
      ? $("customer").value
      : null
  };

  invoices.push(invoice);
  localStorage.setItem("invoices", JSON.stringify(invoices));

  cart = [];
  renderInvoice();

  alert("تم حفظ الفاتورة بنجاح");
}

/* ===== PAY TYPE ===== */
function toggleCustomer() {
  const select = $("customer");
  if ($("payType").value === "credit") {
    select.style.display = "block";
    renderCustomersSelect();
  } else {
    select.style.display = "none";
  }
}

/* ===== CUSTOMERS ===== */
function addCustomer() {
  const name = $("cName").value.trim();
  if (!name) return alert("اكتب اسم العميل");

  customers.push({ name });
  localStorage.setItem("customers", JSON.stringify(customers));
  $("cName").value = "";
  renderCustomers();
}

function renderCustomers() {
  const list = $("customerList");
  if (!list) return;

  list.innerHTML = "";
  customers.forEach(c => {
    list.innerHTML += `<div>${c.name}</div>`;
  });
}

function renderCustomersSelect() {
  const select = $("customer");
  select.innerHTML = "";
  customers.forEach((c, i) => {
    select.innerHTML += `<option value="${c.name}">${c.name}</option>`;
  });
}

/* ===== INIT ===== */
document.addEventListener("DOMContentLoaded", () => {
  $("shopName").innerText = settings.shopName || "نظام كاشير";
  renderProducts();
  renderCustomers();
});
