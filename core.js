/* ==============================
   POS SYSTEM - CORE LOGIC
   ============================== */

/* المنتجات */
let products = [
  { id: 1, name: "توت", price: 50 },
  { id: 2, name: "بيبسي", price: 15 },
  { id: 3, name: "شيبسي", price: 10 },
  { id: 4, name: "مياه", price: 7 },
  { id: 5, name: "عصير", price: 12 }
];

/* الفاتورة */
let cart = [];

/* عناصر الصفحة */
const productsContainer = document.getElementById("products");
const invoiceBody = document.getElementById("invoice-body");
const totalEl = document.getElementById("total");

/* تحميل المنتجات */
function loadProducts() {
  productsContainer.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <div class="product-name">${p.name}</div>
      <div class="product-price">${p.price} ج</div>
    `;
    div.onclick = () => addToCart(p.id);
    productsContainer.appendChild(div);
  });
}

/* إضافة للفاتورة */
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const item = cart.find(i => i.id === id);

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

/* حذف عنصر */
function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  renderInvoice();
}

/* رسم الفاتورة */
function renderInvoice() {
  invoiceBody.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const row = document.createElement("tr");
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>${item.price}</td>
      <td>${itemTotal}</td>
      <td>
        <button onclick="removeItem(${item.id})">✖</button>
      </td>
    `;
    invoiceBody.appendChild(row);
  });

  totalEl.innerText = total + " ج";
}

/* حفظ + طباعة */
function saveAndPrint() {
  if (cart.length === 0) {
    alert("الفاتورة فاضية");
    return;
  }

  localStorage.setItem("lastInvoice", JSON.stringify(cart));
  window.print();
}

/* مسح الفاتورة */
function clearInvoice() {
  cart = [];
  renderInvoice();
}

/* تحميل عند الفتح */
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  renderInvoice();
});
