/* ================= CASHIER ================= */

let cart = [];

/* ===== LOAD PRODUCTS ===== */
function loadProducts() {
  const products = Storage.get(DB.products);
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  products.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <b>${p.name}</b>
      <small>${p.price} ج</small>
    `;
    div.onclick = () => addToCart(i);
    grid.appendChild(div);
  });
}

/* ===== ADD TO CART ===== */
function addToCart(index) {
  const products = Storage.get(DB.products);
  const product = products[index];

  if (!product) return;

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

/* ===== RENDER INVOICE ===== */
function renderInvoice() {
  const box = document.getElementById("invoiceItems");
  const totalBox = document.getElementById("total");
  if (!box || !totalBox) return;

  box.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price * item.qty;

    box.innerHTML += `
      <div class="item">
        ${item.name}<br>
        ${item.qty} × ${item.price}
        <br>
        <button onclick="removeItem(${i})">❌</button>
      </div>
    `;
  });

  totalBox.innerText = "الإجمالي: " + total + " ج";
}

/* ===== REMOVE ITEM ===== */
function removeItem(index) {
  cart.splice(index, 1);
  renderInvoice();
}

/* ===== SAVE INVOICE ===== */
function saveInvoice() {
  if (cart.length === 0) {
    alert("لا توجد أصناف");
    return;
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  Storage.add(DB.invoices, {
    date: new Date().toLocaleString(),
    items: cart,
    total: total
  });

  cart = [];
  renderInvoice();
  alert("تم حفظ الفاتورة");
}

/* ===== SEARCH ===== */
function searchProduct(value) {
  const products = Storage.get(DB.products);
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = "";

  products
    .filter(p => p.name.includes(value))
    .forEach((p, i) => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `<b>${p.name}</b><small>${p.price} ج</small>`;
      div.onclick = () => addToCart(i);
      grid.appendChild(div);
    });
}

/* ===== INIT ===== */
document.addEventListener("DOMContentLoaded", loadProducts);
