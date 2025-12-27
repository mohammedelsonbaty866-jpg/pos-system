/* =========================
   CORE.JS – Commercial POS
   ========================= */

// ====== Storage ======
const DB = {
  products: JSON.parse(localStorage.getItem("products") || "[]"),
  customers: JSON.parse(localStorage.getItem("customers") || "[]"),
  invoices: JSON.parse(localStorage.getItem("invoices") || "[]"),
  settings: JSON.parse(localStorage.getItem("settings") || "{}"),
};

function saveDB() {
  localStorage.setItem("products", JSON.stringify(DB.products));
  localStorage.setItem("customers", JSON.stringify(DB.customers));
  localStorage.setItem("invoices", JSON.stringify(DB.invoices));
  localStorage.setItem("settings", JSON.stringify(DB.settings));
}

// ====== Helpers ======
function uid() {
  return Date.now();
}
function today() {
  return new Date().toLocaleDateString("ar-EG");
}
function now() {
  return new Date().toLocaleString("ar-EG");
}

// =====================
// PRODUCTS
// =====================
function addProduct(data) {
  DB.products.push({
    id: uid(),
    name: data.name,
    price: +data.price,
    cost: +data.cost,
    stock: +data.stock,
    barcode: data.barcode || "",
  });
  saveDB();
}

function updateProduct(id, data) {
  const p = DB.products.find(x => x.id === id);
  if (!p) return;
  Object.assign(p, data);
  saveDB();
}

function getProductByName(name) {
  return DB.products.find(p => p.name === name);
}

function getProductByBarcode(code) {
  return DB.products.find(p => p.barcode === code);
}

// =====================
// CUSTOMERS
// =====================
function addCustomer(name) {
  DB.customers.push({
    id: uid(),
    name,
    balance: 0,
    locked: false
  });
  saveDB();
}

function payCustomer(id, amount) {
  const c = DB.customers.find(x => x.id === id);
  if (!c) return;
  c.balance -= amount;
  if (c.balance < 0) c.balance = 0;
  saveDB();
}

// =====================
// INVOICE / CASHIER
// =====================
let CART = [];

function addToCart(product, qty) {
  if (product.stock < qty) {
    alert("❌ المخزون غير كافي");
    return;
  }
  CART.push({
    id: product.id,
    name: product.name,
    price: product.price,
    cost: product.cost,
    qty
  });
  product.stock -= qty;
  saveDB();
}

function cartTotal() {
  return CART.reduce((t, i) => t + i.price * i.qty, 0);
}

function cartProfit() {
  return CART.reduce((t, i) => t + (i.price - i.cost) * i.qty, 0);
}

function saveInvoice(type, customerId = null) {
  if (CART.length === 0) return;

  const invoice = {
    id: DB.invoices.length + 1,
    date: now(),
    day: today(),
    type,
    total: cartTotal(),
    profit: cartProfit(),
    items: CART
  };

  if (type === "credit") {
    const c = DB.customers.find(x => x.id === customerId);
    if (!c || c.locked) {
      alert("❌ العميل غير متاح");
      return;
    }
    c.balance += invoice.total;
    invoice.customer = c.name;
  }

  DB.invoices.push(invoice);
  CART = [];
  saveDB();

  return invoice;
}

// =====================
// REPORTS (TABLE BASED)
// =====================
function dailyReport(day = today()) {
  const list = DB.invoices.filter(i => i.day === day);

  let cash = 0, credit = 0, profit = 0;
  list.forEach(i => {
    profit += i.profit;
    if (i.type === "cash") cash += i.total;
    else credit += i.total;
  });

  return {
    count: list.length,
    cash,
    credit,
    total: cash + credit,
    profit,
    list
  };
}

function monthlyReport(month, year) {
  const list = DB.invoices.filter(i => {
    const d = new Date(i.date);
    return d.getMonth() + 1 === month && d.getFullYear() === year;
  });

  let total = 0, profit = 0;
  list.forEach(i => {
    total += i.total;
    profit += i.profit;
  });

  return { total, profit, list };
}

// =====================
// SETTINGS
// =====================
function saveSettings(data) {
  DB.settings = data;
  saveDB();
}

function getSettings() {
  return DB.settings;
}
