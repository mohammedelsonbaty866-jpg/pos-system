/* ===============================
   CASHIER.JS
   السلة + الفاتورة + الإجمالي
================================ */

/*
  يعتمد على:
  - products (Array) من data.js
  - invoices (Array) من data.js
  - saveData() من data.js
*/

let cart = [];

/* ===== إضافة للسلة ===== */
function addToCart(productIndex) {
  const product = products[productIndex];
  if (!product) return;

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += 1;
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

/* ===== عرض الفاتورة ===== */
function renderInvoice() {
  const invoiceBox = document.getElementById("invoiceItems");
  const totalBox = document.getElementById("total");

  if (!invoiceBox || !totalBox) return;

  invoiceBox.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    invoiceBox.innerHTML = `<p class="empty">لا توجد أصناف</p>`;
    totalBox.textContent = "0 ج";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const row = document.createElement("div");
    row.className = "invoice-item";

    row.innerHTML = `
      <span>${item.name}</span>
      <span>${item.qty} × ${item.price}</span>
      <button onclick="removeItem(${index})">✖</button>
    `;

    invoiceBox.appendChild(row);
  });

  totalBox.textContent = total + " ج";
}

/* ===== حذف صنف ===== */
function removeItem(index) {
  cart.splice(index, 1);
  renderInvoice();
}

/* ===== تفريغ الفاتورة ===== */
function clearInvoice() {
  if (cart.length === 0) return;

  if (!confirm("تفريغ الفاتورة؟")) return;

  cart = [];
  renderInvoice();
}

/* ===== حفظ الفاتورة ===== */
function saveInvoice() {
  if (cart.length === 0) {
    alert("لا توجد أصناف في الفاتورة");
    return;
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const invoice = {
    id: Date.now(),
    date: new Date().toLocaleString("ar-EG"),
    items: [...cart],
    total: total
  };

  invoices.push(invoice);
  saveData();

  cart = [];
  renderInvoice();

  alert("تم حفظ الفاتورة بنجاح");
}

/* ===== تحميل أولي ===== */
document.addEventListener("DOMContentLoaded", () => {
  renderInvoice();
});
