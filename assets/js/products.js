/*************************************************
 * PRODUCTS MODULE
 * إدارة الأصناف + البحث + الباركود
 *************************************************/

let products = getProducts();

// ===============================
// عرض المنتجات
// ===============================
function renderProducts(filter = "") {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  products
    .filter(p =>
      p.name.includes(filter) ||
      p.barcode.includes(filter)
    )
    .forEach((product, index) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <strong>${product.name}</strong>
        <small>${product.price} ${getSettings().currency}</small>
      `;
      card.onclick = () => addToInvoice(product.barcode);
      grid.appendChild(card);
    });
}

// ===============================
// إضافة صنف جديد
// ===============================
function addProduct(name, price, barcode) {
  if (!name || !price) {
    alert("من فضلك أدخل اسم وسعر الصنف");
    return;
  }

  products.push({
    id: Date.now(),
    name,
    price: Number(price),
    barcode: barcode || "",
    stock: 0
  });

  saveProducts(products);
  renderProducts();
}

// ===============================
// البحث بالاسم أو الباركود
// ===============================
function searchProduct(value) {
  renderProducts(value.trim());
}

// ===============================
// صوت الباركود
// ===============================
const barcodeSound = new Audio("assets/sounds/beep.mp3");

// ===============================
// إضافة للفاتورة
// ===============================
function addToInvoice(barcode) {
  const product = products.find(p => p.barcode === barcode);
  if (!product) return;

  barcodeSound.play();
  addItemToInvoice(product);
}

// ===============================
// تحديث المنتجات عند التحميل
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});
