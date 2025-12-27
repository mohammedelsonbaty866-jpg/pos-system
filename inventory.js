/* ===============================
   INVENTORY MANAGEMENT
   Commercial POS Version
================================ */

let products = JSON.parse(localStorage.getItem("products")) || [];

/* ===== INITIAL LOAD ===== */
document.addEventListener("DOMContentLoaded", () => {
  renderInventory();
});

/* ===== ADD PRODUCT ===== */
function addProduct() {
  const name = document.getElementById("pName").value.trim();
  const buy = Number(document.getElementById("pBuy").value);
  const sell = Number(document.getElementById("pSell").value);

  if (!name || buy <= 0 || sell <= 0) {
    alert("ادخل بيانات صحيحة");
    return;
  }

  products.push({
    id: Date.now(),
    name,
    buy,
    sell
  });

  saveProducts();
  clearForm();
  renderInventory();
}

/* ===== RENDER INVENTORY TABLE ===== */
function renderInventory() {
  const table = document.getElementById("inventoryBody");
  if (!table) return;

  table.innerHTML = "";

  products.forEach((p, i) => {
    table.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.buy}</td>
        <td>${p.sell}</td>
        <td>${p.sell - p.buy}</td>
        <td>
          <button onclick="editProduct(${i})">✏️</button>
          <button onclick="deleteProduct(${i})">🗑️</button>
        </td>
      </tr>
    `;
  });
}

/* ===== DELETE PRODUCT ===== */
function deleteProduct(index) {
  if (!confirm("حذف الصنف؟")) return;

  products.splice(index, 1);
  saveProducts();
  renderInventory();
}

/* ===== EDIT PRODUCT ===== */
function editProduct(index) {
  const p = products[index];

  document.getElementById("pName").value = p.name;
  document.getElementById("pBuy").value = p.buy;
  document.getElementById("pSell").value = p.sell;

  deleteProduct(index);
}

/* ===== SAVE STORAGE ===== */
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

/* ===== CLEAR FORM ===== */
function clearForm() {
  document.getElementById("pName").value = "";
  document.getElementById("pBuy").value = "";
  document.getElementById("pSell").value = "";
}
