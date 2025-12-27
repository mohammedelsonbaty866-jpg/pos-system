/* =============================
   بيانات الأصناف
============================= */
let products = [
  { id: 1, name: "سكر", price: 10 },
  { id: 2, name: "أرز", price: 15 },
  { id: 3, name: "زيت", price: 25 }
];

let invoice = [];

/* =============================
   تحميل الأصناف
============================= */
function loadProducts() {
  const box = document.getElementById("productsBox");
  box.innerHTML = "";

  products.forEach(p => {
    box.innerHTML += `
      <div class="product-card" onclick="addToInvoice(${p.id})">
        <strong>${p.name}</strong>
        <span>${p.price} ج</span>
      </div>
    `;
  });
}

/* =============================
   إضافة للفاتورة
============================= */
function addToInvoice(id) {
  let item = products.find(p => p.id === id);
  let exists = invoice.find(i => i.id === id);

  if (exists) {
    exists.qty++;
  } else {
    invoice.push({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: 1
    });
  }

  renderInvoice();
}

/* =============================
   عرض الفاتورة
============================= */
function renderInvoice() {
  const body = document.getElementById("invoiceBody");
  body.innerHTML = "";
  let total = 0;

  invoice.forEach((i, index) => {
    let rowTotal = i.qty * i.price;
    total += rowTotal;

    body.innerHTML += `
      <tr>
        <td>${i.name}</td>
        <td>${i.qty}</td>
        <td>${i.price}</td>
        <td>${rowTotal}</td>
        <td>
          <button onclick="removeItem(${index})">✖</button>
        </td>
      </tr>
    `;
  });

  document.getElementById("totalBox").innerText = total + " ج";
}

/* =============================
   حذف صنف
============================= */
function removeItem(index) {
  invoice.splice(index, 1);
  renderInvoice();
}

/* =============================
   حفظ + طباعة
============================= */
function saveInvoice() {
  if (invoice.length === 0) {
    alert("الفاتورة فارغة");
    return;
  }

  window.print();
  invoice = [];
  renderInvoice();
}

/* =============================
   تشغيل عند الفتح
============================= */
loadProducts();
