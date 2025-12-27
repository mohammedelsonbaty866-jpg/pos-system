/* ===============================
   POS CORE SYSTEM - STABLE VERSION
   Author: Final Commercial Release
================================ */

// ===== Storage =====
let DB = {
  products: JSON.parse(localStorage.getItem("products") || "[]"),
  customers: JSON.parse(localStorage.getItem("customers") || "[]"),
  invoices: JSON.parse(localStorage.getItem("invoices") || "[]"),
  settings: JSON.parse(localStorage.getItem("settings") || "{}")
};

let cart = [];

// ===== Helpers =====
function saveDB() {
  localStorage.setItem("products", JSON.stringify(DB.products));
  localStorage.setItem("customers", JSON.stringify(DB.customers));
  localStorage.setItem("invoices", JSON.stringify(DB.invoices));
  localStorage.setItem("settings", JSON.stringify(DB.settings));
}

function $(id) {
  return document.getElementById(id);
}

// ===== Products =====
function addProduct(name, price, cost, stock, barcode = "") {
  if (!name || price <= 0) return alert("بيانات الصنف غير صحيحة");

  DB.products.push({
    id: Date.now(),
    name,
    price: Number(price),
    cost: Number(cost),
    stock: Number(stock),
    barcode
  });

  saveDB();
}

function findProduct(value) {
  return DB.products.find(
    p => p.name === value || p.barcode === value
  );
}

// ===== Cart =====
function addToCart(value, qty = 1) {
  let product = findProduct(value);
  if (!product) return alert("الصنف غير موجود");

  qty = Number(qty);
  if (product.stock < qty) return alert("المخزون غير كافي");

  let item = cart.find(i => i.id === product.id);
  if (item) {
    item.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      cost: product.cost,
      qty
    });
  }

  product.stock -= qty;
  saveDB();
  renderCart();
}

function removeFromCart(id) {
  let index = cart.findIndex(i => i.id === id);
  if (index === -1) return;

  let item = cart[index];
  let product = DB.products.find(p => p.id === id);
  if (product) product.stock += item.qty;

  cart.splice(index, 1);
  saveDB();
  renderCart();
}

// ===== Render =====
function renderCart() {
  let box = $("invoice");
  let totalBox = $("total");

  box.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    let line = item.price * item.qty;
    total += line;

    box.innerHTML += `
      <div class="invoice-item">
        <div>${item.name}</div>
        <div>${item.qty} × ${item.price}</div>
        <div>${line}</div>
        <button onclick="removeFromCart(${item.id})">✖</button>
      </div>
    `;
  });

  totalBox.innerText = "الإجمالي: " + total.toFixed(2);
}

// ===== Customers =====
function addCustomer(name) {
  if (!name) return alert("اكتب اسم العميل");

  DB.customers.push({
    id: Date.now(),
    name,
    balance: 0,
    locked: false
  });

  saveDB();
}

function getCustomer(id) {
  return DB.customers.find(c => c.id == id);
}

// ===== Invoice =====
function saveInvoice(type, customerId = null, printAfter = true) {
  if (cart.length === 0) return alert("الفاتورة فارغة");

  let total = cart.reduce((a, i) => a + i.price * i.qty, 0);
  let profit = cart.reduce((a, i) => a + (i.price - i.cost) * i.qty, 0);

  let invoice = {
    number: DB.invoices.length + 1,
    date: new Date().toLocaleString("ar-EG"),
    type,
    total,
    profit,
    items: [...cart]
  };

  if (type === "credit") {
    if (!customerId) return alert("اختر عميل");
    let customer = getCustomer(customerId);
    if (!customer || customer.locked) return alert("العميل غير صالح");

    customer.balance += total;
    invoice.customer = customer.name;
  }

  DB.invoices.push(invoice);
  cart = [];
  saveDB();
  renderCart();

  if (printAfter) printInvoice(invoice);
}

// ===== Printing =====
function printInvoice(inv) {
  let win = window.open("", "", "width=300");
  win.document.write(`
    <html>
    <head>
      <title>فاتورة</title>
      <style>
        body{font-family:Tahoma;font-size:12px}
        h3{text-align:center}
        table{width:100%;border-collapse:collapse}
        td{border-bottom:1px dashed #000;padding:4px}
      </style>
    </head>
    <body>
      <h3>${DB.settings.shopName || "متجر"}</h3>
      <p>فاتورة رقم: ${inv.number}</p>
      <p>${inv.date}</p>
      <table>
        ${inv.items.map(i =>
          `<tr><td>${i.name}</td><td>${i.qty}×${i.price}</td><td>${i.qty * i.price}</td></tr>`
        ).join("")}
      </table>
      <h4>الإجمالي: ${inv.total}</h4>
      <script>
        window.print();
        window.close();
      </script>
    </body>
    </html>
  `);
  win.document.close();
}

// ===== Settings =====
function saveShopName(name) {
  DB.settings.shopName = name;
  saveDB();
}
