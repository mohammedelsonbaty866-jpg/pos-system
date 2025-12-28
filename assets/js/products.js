/* =============================
   PRODUCTS MANAGEMENT
============================= */

let products = JSON.parse(localStorage.getItem("products")) || [];

/* =============================
   SAVE
============================= */
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

/* =============================
   ADD PRODUCT
============================= */
function addProduct() {
  const nameInput = document.getElementById("productName");
  const priceInput = document.getElementById("productPrice");

  if (!nameInput || !priceInput) return;

  const name = nameInput.value.trim();
  const price = Number(priceInput.value);

  if (name === "" || price <= 0) {
    alert("بيانات الصنف غير صحيحة");
    return;
  }

  products.push({
    name,
    price
  });

  saveProducts();
  nameInput.value = "";
  priceInput.value = "";

  renderProductsTable();
  alert("تم إضافة الصنف");
}

/* =============================
   DELETE PRODUCT
============================= */
function deleteProduct(index) {
  if (!confirm("حذف الصنف؟")) return;

  products.splice(index, 1);
  saveProducts();
  renderProductsTable();
}

/* =============================
   RENDER TABLE
============================= */
function renderProductsTable() {
  const table = document.getElementById("productsTable");
  if (!table) return;

  table.innerHTML = "";

  products.forEach((p, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${p.name}</td>
      <td>${p.price}</td>
      <td>
        <button onclick="deleteProduct(${i})">🗑 حذف</button>
      </td>
    `;
    table.appendChild(row);
  });
}

/* =============================
   INIT
============================= */
document.addEventListener("DOMContentLoaded", () => {
  renderProductsTable();
});
