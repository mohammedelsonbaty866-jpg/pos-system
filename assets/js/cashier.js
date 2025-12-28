/* =============================
   CASHIER LOGIC
============================= */

let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = [];

/* =============================
   RENDER PRODUCTS
============================= */
function renderProducts() {
  const container = document.getElementById("productsGrid");
  if (!container) return;

  container.innerHTML = "";

  products.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <b>${p.name}</b>
      <small>${p.price} جنيه</small>
    `;
    div.onclick = () => addToCart(index);
    container.appendChild(div);
  });
}

/* =============================
   ADD TO CART
============================= */
function addToCart(index) {
  const product = products[index];

  const existing = cart.find(i => i.id === index);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({
      id: index,
      name: product.name,
      price: product.price,
      qty: 1
    });
  }

  renderInvoice();
}

/* =============================
   RENDER INVOICE
============================= */
function renderInvoice() {
  const box = document.getElementById("invoiceItems");
  const totalBox = document.getElementById("totalAmount");

  if (!box || !totalBox) return;

  box.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "invoice-item";
    div.innerHTML = `
      ${item.name}<br>
      ${item.qty} × ${item.price} = ${item.qty * item.price}
    `;
    box.appendChild(div);
  });

  totalBox.innerText = total + " جنيه";
}

/* =============================
   SAVE INVOICE
============================= */
function saveInvoice() {
  if (cart.length === 0) {
    alert("لا توجد أصناف في الفاتورة");
    return;
  }

  const invoices = JSON.parse(localStorage.getItem("invoices")) || [];

  invoices.push({
    date: new Date().toLocaleString("ar-EG"),
    items: cart,
    total: cart.reduce((s, i) => s + i.price * i.qty, 0)
  });

  localStorage.setItem("invoices", JSON.stringify(invoices));
  cart = [];
  renderInvoice();

  alert("تم حفظ الفاتورة بنجاح");
}

/* =============================
   INIT
============================= */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});
