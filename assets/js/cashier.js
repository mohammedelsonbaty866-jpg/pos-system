/*********************************
 * CASHIER.JS
 *********************************/

let cart = [];

/* ===== RENDER PRODUCTS ===== */
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  products.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <b>${p.name}</b>
      <span>${p.price} ج</span>
    `;
    div.onclick = () => addToCart(index);
    grid.appendChild(div);
  });
}

/* ===== ADD TO CART ===== */
function addToCart(index) {
  const product = products[index];

  const found = cart.find(i => i.id === index);
  if (found) {
    found.qty++;
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

/* ===== RENDER INVOICE ===== */
function renderInvoice() {
  const itemsBox = document.getElementById("invoiceItems");
  const totalBox = document.getElementById("total");

  if (!itemsBox || !totalBox) return;

  itemsBox.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    const row = document.createElement("div");
    row.className = "invoice-item";
    row.innerHTML = `
      ${item.name} × ${item.qty}
      <span>${item.price * item.qty} ج</span>
    `;
    itemsBox.appendChild(row);

    total += item.price * item.qty;
  });

  totalBox.innerText = "الإجمالي: " + total + " ج";
}

/* ===== SAVE INVOICE ===== */
function saveInvoice() {
  if (cart.length === 0) {
    alert("الفاتورة فارغة");
    return;
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  invoices.push({
    id: invoices.length + 1,
    date: formatDate(),
    items: cart,
    total: total
  });

  saveInvoices();
  cart = [];
  renderInvoice();

  alert("تم حفظ الفاتورة");
}

/* ===== INIT ===== */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderInvoice();
});
