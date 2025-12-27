/* =========================
   POS SYSTEM - CORE JS
   ========================= */

let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================
   PRODUCTS
   ========================= */

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

function addProduct(name, price, barcode = "") {
  if (!name || !price) {
    alert("ادخل اسم وسعر الصنف");
    return;
  }

  products.push({
    id: Date.now(),
    name,
    price: parseFloat(price),
    barcode
  });

  saveProducts();
  renderProducts();
}

function renderProducts() {
  const container = document.getElementById("productsList");
  if (!container) return;

  container.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-box";
    div.innerHTML = `
      <strong>${p.name}</strong>
      <span>${p.price} جنيه</span>
    `;
    div.onclick = () => addToCart(p.id);
    container.appendChild(div);
  });
}

/* =========================
   CART
   ========================= */

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
}

function renderCart() {
  const container = document.getElementById("invoice");
  const totalBox = document.getElementById("totalAmount");

  if (!container) return;

  let total = 0;
  container.innerHTML = "";

  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "invoice-row";
    row.innerHTML = `
      <span>${item.name} × ${item.qty}</span>
      <span>${item.price * item.qty} جنيه</span>
    `;
    container.appendChild(row);
    total += item.price * item.qty;
  });

  if (totalBox) totalBox.innerText = total + " جنيه";
}

/* =========================
   BARCODE SEARCH (OPTIONAL)
   ========================= */

function searchBarcode(value) {
  const product = products.find(p => p.barcode === value);
  if (product) {
    addToCart(product.id);
  }
}

/* =========================
   PAYMENT
   ========================= */

function completeSale(type) {
  if (cart.length === 0) {
    alert("الفاتورة فاضية");
    return;
  }

  const sale = {
    date: new Date().toLocaleString(),
    items: cart,
    total: cart.reduce((s, i) => s + i.price * i.qty, 0),
    payment: type
  };

  let sales = JSON.parse(localStorage.getItem("sales")) || [];
  sales.push(sale);
  localStorage.setItem("sales", JSON.stringify(sales));

  cart = [];
  saveCart();
  renderCart();

  alert("تم البيع (" + type + ")");
}

/* =========================
   PRINT
   ========================= */

function printInvoice() {
  window.print();
}

/* =========================
   INIT
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
});
