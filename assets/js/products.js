/* ===============================
   PRODUCTS.JS
   عرض + بحث + إضافة للسلة
================================ */

/*
  يعتمد على:
  - products (Array) من data.js
  - addToCart(product) من cashier.js
*/

/* ===== عرض المنتجات ===== */
function renderProducts(list = products) {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = `<p class="empty">لا توجد أصناف</p>`;
    return;
  }

  list.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <h3>${product.name}</h3>
      <p class="price">${product.price} ج</p>
      <button onclick="addToCart(${index})">إضافة</button>
    `;

    grid.appendChild(card);
  });
}

/* ===== البحث ===== */
function searchProduct(keyword) {
  keyword = keyword.trim().toLowerCase();

  if (keyword === "") {
    renderProducts(products);
    return;
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(keyword)
  );

  renderProducts(filtered);
}

/* ===== تحميل تلقائي ===== */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
});
