/***********************
 * POS SYSTEM CORE.JS *
 * Stable Commercial  *
 ***********************/

/* ========= STORAGE ========= */
const DB = {
  products: "products",
  invoices: "invoices",
  settings: "settings"
};

function load(key, def = []) {
  try {
    return JSON.parse(localStorage.getItem(key)) || def;
  } catch {
    return def;
  }
}

function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

/* ========= DATA ========= */
let products = load(DB.products);
let invoices = load(DB.invoices);
let settings = load(DB.settings, { shopName: "POS System" });
let cart = [];

/* ========= UI HELPERS ========= */
function qs(id) {
  return document.getElementById(id);
}

function notify(msg) {
  alert(msg);
}

/* ========= PRODUCTS ========= */
function addProductCore(name, sell, buy, stock) {
  if (!name || sell <= 0) {
    notify("بيانات الصنف غير صحيحة");
    return false;
  }

  products.push({
    id: Date.now(),
    name,
    sell,
    buy,
    stock
  });

  save(DB.products, products);
  return true;
}

function getProductByName(name) {
  return products.find(p => p.name === name);
}

/* ========= CART ========= */
function addItemToCart(product) {
  if (product.stock <= 0) {
    notify("نفاد المخزون");
    return;
  }

  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.sell,
      cost: product.buy,
      qty: 1
    });
  }

  product.stock--;
  save(DB.products, products);
}

function clearCart() {
  cart = [];
}

/* ========= INVOICE ========= */
function calculateTotal() {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function calculateProfit() {
  return cart.reduce((sum, i) => sum + (i.price - i.cost) * i.qty, 0);
}

function saveInvoiceCore(type = "cash", customer = null) {
  if (cart.length === 0) {
    notify("الفاتورة فارغة");
    return false;
  }

  const invoice = {
    id: invoices.length + 1,
    date: new Date().toLocaleString("ar-EG"),
    type,
    customer,
    total: calculateTotal(),
    profit: calculateProfit(),
    items: JSON.parse(JSON.stringify(cart))
  };

  invoices.push(invoice);
  save(DB.invoices, invoices);
  clearCart();

  return true;
}

/* ========= REPORTS ========= */
function dailyReport() {
  const today = new Date().toLocaleDateString("ar-EG");
  const list = invoices.filter(i =>
    i.date.includes(today)
  );

  let total = 0, profit = 0;
  list.forEach(i => {
    total += i.total;
    profit += i.profit;
  });

  return {
    count: list.length,
    total,
    profit
  };
}

/* ========= SETTINGS ========= */
function updateShopName(name) {
  if (!name) return;
  settings.shopName = name;
  save(DB.settings, settings);
}

/* ========= PRINT ========= */
function buildPrintHTML(invoice) {
  let rows = "";
  invoice.items.forEach(i => {
    rows += `
      <tr>
        <td>${i.name}</td>
        <td>${i.qty}</td>
        <td>${i.price}</td>
        <td>${i.qty * i.price}</td>
      </tr>
    `;
  });

  return `
  <html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8">
    <style>
      body{font-family:Arial;margin:10px}
      h2{text-align:center}
      table{width:100%;border-collapse:collapse}
      td,th{border:1px solid #000;padding:6px;text-align:center}
      .total{margin-top:10px;font-weight:bold;text-align:center}
    </style>
  </head>
  <body>
    <h2>${settings.shopName}</h2>
    <table>
      <thead>
        <tr>
          <th>الصنف</th>
          <th>الكمية</th>
          <th>السعر</th>
          <th>الإجمالي</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
    <div class="total">الإجمالي: ${invoice.total}</div>
    <p style="text-align:center">شكراً لزيارتكم</p>
  </body>
  </html>
  `;
}

function printInvoiceCore(invoice) {
  const w = window.open("", "", "width=400,height=600");
  w.document.write(buildPrintHTML(invoice));
  w.document.close();
  w.focus();
  w.print();
  w.close();
}

/* ========= INIT ========= */
document.addEventListener("DOMContentLoaded", () => {
  if (qs("shopTitle")) {
    qs("shopTitle").innerText = settings.shopName;
  }
});
