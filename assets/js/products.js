/************************
 * PRODUCTS MODULE
 * إدارة الأصناف + البحث
 ************************/

/*
  شكل الصنف:
  {
    id: Number,
    name: String,
    price: Number,
    barcode: String,
    stock: Number
  }
*/

let products = JSON.parse(localStorage.getItem("products")) || [];

/* ===== حفظ ===== */
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

/* ===== إضافة صنف ===== */
function addProduct(name, price, barcode, stock = 0) {
  if (!name || !price) {
    alert("اسم الصنف والسعر مطلوبين");
    return;
  }

  const exists = products.find(p => p.barcode === barcode && barcode);
  if (exists) {
    alert("الباركود مستخدم بالفعل");
    return;
  }

  const product = {
    id: Date.now(),
    name: name.trim(),
    price: Number(price),
    barcode: barcode ? barcode.trim() : "",
    stock: Number(stock)
  };

  products.push(product);
  saveProducts();
  renderProducts();
}

/* ===== عرض الأصناف ===== */
function renderProducts(list = products) {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = "<p style='text-align:center'>لا توجد أصناف</p>";
    return;
  }

  list.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <b>${p.name}</b>
      <small>${p.price} ج</small>
    `;
    div.onclick = () => addToCart(p.id);
    grid.appendChild(div);
  });
}

/* ===== البحث بالاسم أو الباركود ===== */
function searchProduct(keyword) {
  keyword = keyword.trim();

  if (!keyword) {
    renderProducts(products);
    return;
  }

  const result = products.filter(p =>
    p.name.includes(keyword) ||
    (p.barcode && p.barcode === keyword)
  );

  renderProducts(result);
}

/* ===== جلب صنف بالـ ID ===== */
function getProductById(id) {
  return products.find(p => p.id === id);
}

/* ===== تحديث المخزون ===== */
function updateStock(productId, qty) {
  const product = getProductById(productId);
  if (!product) return;

  product.stock -= qty;
  if (product.stock < 0) product.stock = 0;
  saveProducts();
}

/* ===== تهيئة ===== */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});
