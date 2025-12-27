/* ===============================
   CORE POS SYSTEM
   Commercial Version
================================ */

let products = JSON.parse(localStorage.getItem("products")) || [];
let invoice = [];
let customers = JSON.parse(localStorage.getItem("customers")) || [];
let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

/* ===== INITIAL LOAD ===== */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  loadSettings();
});

/* ===== PRODUCTS (CASHIER VIEW) ===== */
function renderProducts() {
  const box = document.getElementById("products");
  if (!box) return;

  box.innerHTML = "";
  products.forEach((p, i) => {
    box.innerHTML += `
      <div class="product-card" onclick="addToInvoice(${i})">
        <strong>${p.name}</strong>
        <div>${p.sell} ج</div>
      </div>
    `;
  });
}

/* ===== ADD TO INVOICE ===== */
function addToInvoice(index) {
  const product = products[index];
  if (!product) return;

  const found = invoice.find(i => i.name === product.name);
  if (found) {
    found.qty++;
  } else {
    invoice.push({
      name: product.name,
      price: product.sell,
      qty: 1
    });
  }
  renderInvoice();
}

/* ===== INVOICE RENDER ===== */
function renderInvoice() {
  const body = document.getElementById("invoiceBody");
  const totalBox = document.getElementById("invoiceTotal");
  if (!body) return;

  body.innerHTML = "";
  let total = 0;

  invoice.forEach((item, i) => {
    const sum = item.qty * item.price;
    total += sum;

    body.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>${item.price}</td>
        <td>${sum}</td>
        <td>
          <button onclick="removeItem(${i})">❌</button>
        </td>
      </tr>
    `;
  });

  totalBox.textContent = total;
}

/* ===== REMOVE ITEM ===== */
function removeItem(index) {
  invoice.splice(index, 1);
  renderInvoice();
}

/* ===== CLEAR INVOICE ===== */
function clearInvoice() {
  if (!invoice.length) return;
  if (!confirm("مسح الفاتورة؟")) return;

  invoice = [];
  renderInvoice();
}

/* ===== SAVE INVOICE ===== */
function saveInvoice() {
  if (!invoice.length) {
    alert("الفاتورة فارغة");
    return;
  }

  const total = invoice.reduce((s, i) => s + i.qty * i.price, 0);

  invoices.push({
    id: Date.now(),
    date: new Date().toLocaleString(),
    items: invoice,
    total
  });

  localStorage.setItem("invoices", JSON.stringify(invoices));

  invoice = [];
  renderInvoice();
  alert("تم حفظ الفاتورة بنجاح");
}

/* ===== PRINT INVOICE ===== */
function printInvoice() {
  if (!invoice.length) {
    alert("لا يوجد فاتورة للطباعة");
    return;
  }

  let html = `
    <h2>فاتورة بيع</h2>
    <hr>
    <table border="1" width="100%" cellspacing="0">
      <tr>
        <th>الصنف</th>
        <th>الكمية</th>
        <th>السعر</th>
        <th>الإجمالي</th>
      </tr>
  `;

  let total = 0;
  invoice.forEach(i => {
    const sum = i.qty * i.price;
    total += sum;
    html += `
      <tr>
        <td>${i.name}</td>
        <td>${i.qty}</td>
        <td>${i.price}</td>
        <td>${sum}</td>
      </tr>
    `;
  });

  html += `
    </table>
    <h3>الإجمالي: ${total} ج</h3>
  `;

  const win = window.open("", "", "width=400,height=600");
  win.document.write(html);
  win.print();
  win.close();
}

/* ===== SETTINGS ===== */
function saveSettings() {
  const name = document.getElementById("shopNameInput").value;
  if (!name) return alert("اكتب اسم المحل");

  localStorage.setItem("shopName", name);
  document.getElementById("shopTitle").textContent = name;
  alert("تم حفظ الإعدادات");
}

function loadSettings() {
  const name = localStorage.getItem("shopName");
  if (name) {
    document.getElementById("shopTitle").textContent = name;
  }
}
