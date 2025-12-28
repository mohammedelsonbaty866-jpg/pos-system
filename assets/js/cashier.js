/* ===============================
   CASHIER.JS
   السلة + الفاتورة
================================ */

/*
  يعتمد على:
  - products, invoices, saveData() من data.js
*/

/* ===== السلة ===== */
let cart = [];

/* ===== إضافة صنف للسلة ===== */
function addToCart(productIndex) {
  const product = products[productIndex];
  if (!product) return;

  const existing = cart.find(i => i.id === product.id);

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
  const container = document.getElementById("invoiceItems");
  const totalBox = document.getElementById("total");
  if (!container || !totalBox) return;

  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = `<p class="empty">لا توجد أصناف</p>`;
    totalBox.innerText = "0 ج";
    return;
  }

  cart.forEach((item, index) => {
    const lineTotal = item.price * item.qty;
    total += lineTotal;

    const row = document.createElement("div");
    row.className = "invoice-item";
    row.innerHTML = `
      <span>${item.name}</span>
      <span>${item.qty} × ${item.price}</span>
      <strong>${lineTotal} ج</strong>
      <button onclick="removeItem(${index})">✕</button>
    `;

    container.appendChild(row);
  });

  totalBox.innerText = total + " ج";
}

/* ===== حذف صنف من السلة ===== */
function removeItem(index) {
  cart.splice(index, 1);
  renderInvoice();
}

/* ===== تفريغ الفاتورة ===== */
function clearInvoice() {
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

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const invoice = {
    id: generateId(invoices),
    date: new Date().toLocaleString("ar-EG"),
    items: cart,
    total: total
  };

  invoices.push(invoice);
  saveData();

  cart = [];
  renderInvoice();

  alert("تم حفظ الفاتورة بنجاح");
}
