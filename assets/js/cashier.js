/*************************************************
 * CASHIER MODULE
 * الفاتورة + الحساب + الحفظ
 *************************************************/

let invoiceItems = [];
let invoiceTotal = 0;

// ===============================
// إضافة عنصر للفاتورة
// ===============================
function addItemToInvoice(product) {
  const existing = invoiceItems.find(i => i.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    invoiceItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1
    });
  }

  renderInvoice();
}

// ===============================
// عرض الفاتورة
// ===============================
function renderInvoice() {
  const box = document.getElementById("invoiceItems");
  const totalBox = document.getElementById("total");

  if (!box || !totalBox) return;

  box.innerHTML = "";
  invoiceTotal = 0;

  invoiceItems.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "invoice-row";
    row.innerHTML = `
      <span>${item.name}</span>
      <span>${item.qty} × ${item.price}</span>
      <span>${item.qty * item.price}</span>
      <button onclick="removeInvoiceItem(${index})">✖</button>
    `;
    box.appendChild(row);
    invoiceTotal += item.qty * item.price;
  });

  totalBox.innerText = invoiceTotal + " " + getSettings().currency;
}

// ===============================
// حذف عنصر
// ===============================
function removeInvoiceItem(index) {
  invoiceItems.splice(index, 1);
  renderInvoice();
}

// ===============================
// تفريغ الفاتورة
// ===============================
function clearInvoice() {
  if (!confirm("تفريغ الفاتورة؟")) return;
  invoiceItems = [];
  renderInvoice();
}

// ===============================
// حفظ الفاتورة
// ===============================
function saveInvoice() {
  if (invoiceItems.length === 0) {
    alert("لا توجد أصناف");
    return;
  }

  const invoices = getInvoices();

  invoices.push({
    id: Date.now(),
    date: new Date().toLocaleString("ar-EG"),
    total: invoiceTotal,
    items: invoiceItems,
    cashier: getCurrentUser().phone
  });

  saveInvoices(invoices);
  clearInvoice();
  alert("تم حفظ الفاتورة");
}

// ===============================
// حماية الصفحة
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  if (!getCurrentUser()) {
    location.href = "login.html";
  }
});
