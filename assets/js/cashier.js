// ===== CASHIER =====
let cart = [];

function addToCart(product) {
  let item = cart.find(i => i.id === product.id);
  if (item) {
    item.qty++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1
    });
  }
  renderInvoice();
}

function renderInvoice() {
  const box = document.getElementById("invoiceItems");
  const totalBox = document.getElementById("total");

  box.innerHTML = "";
  let total = 0;

  cart.forEach(i => {
    total += i.price * i.qty;
    box.innerHTML += `
      <div class="invoice-item">
        ${i.name} × ${i.qty}
        <strong>${i.price * i.qty} ج</strong>
      </div>`;
  });

  totalBox.innerText = total + " ج";
}
// 🔍 بحث بالاسم أو الباركود
function searchProduct(value) {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = "";

  products
    .filter(p =>
      p.name.includes(value) || p.barcode === value
    )
    .forEach(p => {
      grid.innerHTML += `
        <div class="product-card" onclick="addToInvoice(${p.id})">
          <strong>${p.name}</strong>
          <span>${p.price} ج</span>
        </div>
      `;
    });
}

// 📷 مسح باركود (كأنه كيبورد)
let barcodeBuffer = "";
document.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const product = products.find(p => p.barcode === barcodeBuffer);
    if (product) addToInvoice(product.id);
    barcodeBuffer = "";
  } else {
    barcodeBuffer += e.key;
  }
});
let cart = [];
let discount = 0;
let vat = 0.14; // 14%

function calculateTotal() {
  let subtotal = cart.reduce((a,i)=>a + i.price*i.qty,0);
  let vatValue = subtotal * vat;
  let final = subtotal + vatValue - discount;

  document.getElementById("total").innerText =
    `الإجمالي: ${final.toFixed(2)} ج`;
}

function applyDiscount(val) {
  discount = +val;
  calculateTotal();
}
