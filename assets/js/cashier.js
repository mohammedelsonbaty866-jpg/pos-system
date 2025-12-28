/*********************************
 * CASHIER.JS
 * شاشة الكاشير / الفاتورة
 *********************************/

/* ====== عناصر الصفحة ====== */
const productsGrid   = document.getElementById("productsGrid");
const invoiceItems   = document.getElementById("invoiceItems");
const totalEl        = document.getElementById("total");

/* ====== البيانات ====== */
// المنتجات جاية من data.js
// let products = [...]

let cart = [];   // الفاتورة الحالية

/* ====== عرض المنتجات ====== */
function renderProducts(list = products) {
  productsGrid.innerHTML = "";

  if (list.length === 0) {
    productsGrid.innerHTML = "<p>لا توجد منتجات</p>";
    return;
  }

  list.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <strong>${p.name}</strong>
      <span>${p.price} ج</span>
      <small>المخزون: ${p.stock}</small>
    `;

    div.onclick = () => addToCart(index);
    productsGrid.appendChild(div);
  });
}

/* ====== البحث ====== */
function searchProduct(val) {
  const q = val.trim();
  if (!q) {
    renderProducts(products);
    return;
  }

  const filtered = products.filter(p =>
    p.name.includes(q)
  );
  renderProducts(filtered);
}

/* ====== إضافة للفاتورة ====== */
function addToCart(index) {
  const product = products[index];

  if (product.stock <= 0) {
    alert("المخزون نفد");
    return;
  }

  product.stock--;

  cart.push({
    name: product.name,
    price: product.price
  });

  saveProducts();
  renderInvoice();
  renderProducts();
}

/* ====== عرض الفاتورة ====== */
function renderInvoice() {
  invoiceItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;

    invoiceItems.innerHTML += `
      <div class="invoice-item">
        <span>${i + 1}. ${item.name}</span>
        <span>${item.price} ج</span>
      </div>
    `;
  });

  totalEl.innerText = total + " ج";
}

/* ====== حفظ الفاتورة ====== */
function saveInvoice() {
  if (cart.length === 0) {
    alert("الفاتورة فارغة");
    return;
  }

  let invoices = JSON.parse(localStorage.getItem("invoices") || "[]");

  invoices.push({
    date: new Date().toLocaleString(),
    items: cart,
    total: cart.reduce((s, i) => s + i.price, 0)
  });

  localStorage.setItem("invoices", JSON.stringify(invoices));

  alert("تم حفظ الفاتورة");
  clearInvoice();
}

/* ====== تفريغ الفاتورة ====== */
function clearInvoice() {
  cart = [];
  renderInvoice();
}

/* ====== تشغيل أولي ====== */
renderProducts();
renderInvoice();
