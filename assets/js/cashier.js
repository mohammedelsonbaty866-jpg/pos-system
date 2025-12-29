/* =========================
   CASHIER.JS | POS PRO
========================= */

// عناصر الصفحة
const productsGrid = document.getElementById("productsGrid");
const invoiceItems = document.getElementById("invoiceItems");
const totalEl = document.getElementById("total");
const barcodeInput = document.getElementById("barcodeInput");

// الفاتورة الحالية
let cart = [];

// صوت الباركود
const beep = new Audio("assets/sounds/beep.mp3");

// =========================
// تحميل المنتجات
// =========================
function renderProducts(list = products) {
  productsGrid.innerHTML = "";

  list.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <h4>${product.name}</h4>
      <p>${product.price} ج</p>
    `;
    div.onclick = () => addToCart(product);
    productsGrid.appendChild(div);
  });
}

renderProducts();

// =========================
// البحث
// =========================
function searchProduct(keyword) {
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(keyword.toLowerCase())
  );
  renderProducts(filtered);
}

// =========================
// إضافة للفاتورة
// =========================
function addToCart(product) {
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

// =========================
// رسم الفاتورة
// =========================
function renderInvoice() {
  invoiceItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const row = document.createElement("div");
    row.className = "invoice-row";
    row.innerHTML = `
      <span>${item.name}</span>
      <span>${item.qty} × ${item.price}</span>
      <button onclick="removeItem(${index})">❌</button>
    `;
    invoiceItems.appendChild(row);
  });

  totalEl.textContent = total + " ج";
}

// =========================
// حذف عنصر
// =========================
function removeItem(index) {
  cart.splice(index, 1);
  renderInvoice();
}

// =========================
// تفريغ الفاتورة
// =========================
function clearInvoice() {
  if (!cart.length) return;
  if (!confirm("تفريغ الفاتورة؟")) return;

  cart = [];
  renderInvoice();
}

// =========================
// حفظ الفاتورة
// =========================
function saveInvoice() {
  if (!cart.length) {
    alert("الفاتورة فارغة");
    return;
  }

  const invoices = JSON.parse(localStorage.getItem("invoices") || "[]");

  invoices.push({
    id: Date.now(),
    date: new Date().toLocaleString("ar-EG"),
    items: cart,
    total: totalEl.textContent
  });

  localStorage.setItem("invoices", JSON.stringify(invoices));

  alert("تم حفظ الفاتورة");
  clearInvoice();
}

// =========================
// دعم الباركود
// =========================
barcodeInput?.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const code = barcodeInput.value.trim();
    if (!code) return;

    const product = products.find(p => p.barcode === code);

    if (product) {
      beep.play();
      addToCart(product);
    } else {
      alert("المنتج غير موجود");
    }

    barcodeInput.value = "";
  }
});
