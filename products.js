/* ===============================
   PRODUCTS.JS – POS SYSTEM
   =============================== */

/* ===== ADD PRODUCT ===== */
function addProduct() {
  const name  = document.getElementById("pn").value.trim();
  const price = parseFloat(document.getElementById("pp").value);
  const cost  = parseFloat(document.getElementById("pc").value);
  const stock = parseInt(document.getElementById("ps").value);

  if (!name || isNaN(price) || price <= 0) {
    alert("بيانات الصنف غير صحيحة");
    return;
  }

  products.push({
    id: Date.now(),
    name,
    price,
    cost: isNaN(cost) ? 0 : cost,
    stock: isNaN(stock) ? 0 : stock
  });

  saveProducts();
  clearProductForm();
  renderProducts();
  renderProductsTable();

  alert("تم إضافة الصنف بنجاح");
}

/* ===== SAVE PRODUCTS ===== */
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

/* ===== CLEAR FORM ===== */
function clearProductForm() {
  document.getElementById("pn").value = "";
  document.getElementById("pp").value = "";
  document.getElementById("pc").value = "";
  document.getElementById("ps").value = "";
}

/* ===== RENDER PRODUCTS TABLE ===== */
function renderProductsTable() {
  const box = document.getElementById("productsTable");
  if (!box) return;

  box.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>الصنف</th>
          <th>سعر البيع</th>
          <th>المخزون</th>
          <th>تحكم</th>
        </tr>
      </thead>
      <tbody>
        ${products.map((p, i) => `
          <tr>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td>${p.stock}</td>
            <td>
              <button onclick="editProduct(${i})">✏️</button>
              <button onclick="deleteProduct(${i})">🗑️</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

/* ===== EDIT PRODUCT ===== */
function editProduct(index) {
  const p = products[index];
  if (!p) return;

  document.getElementById("pn").value = p.name;
  document.getElementById("pp").value = p.price;
  document.getElementById("pc").value = p.cost;
  document.getElementById("ps").value = p.stock;

  deleteProduct(index);
}

/* ===== DELETE PRODUCT ===== */
function deleteProduct(index) {
  if (!confirm("حذف الصنف؟")) return;

  products.splice(index, 1);
  saveProducts();
  renderProducts();
  renderProductsTable();
}

/* ===== SEARCH PRODUCT ===== */
function searchProducts(value) {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = "";
  products
    .filter(p => p.name.includes(value))
    .forEach((p, i) => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <strong>${p.name}</strong>
        <span>${p.price} جنيه</span>
      `;
      div.onclick = () => addToCart(i);
      grid.appendChild(div);
    });
}

/* ===== INIT ===== */
document.addEventListener("DOMContentLoaded", () => {
  renderProductsTable();

  const search = document.getElementById("search");
  if (search) {
    search.addEventListener("input", e =>
      searchProducts(e.target.value)
    );
  }
});
