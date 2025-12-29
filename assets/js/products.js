/* =====================================
   PRODUCTS MANAGEMENT
   Add - Delete - Search - Barcode
   ===================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderProductsTable();
});

/* ---------- ADD PRODUCT ---------- */
function addProduct() {
  const nameInput = document.getElementById("productName");
  const priceInput = document.getElementById("productPrice");
  const barcodeInput = document.getElementById("productBarcode");

  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value);
  const barcode = barcodeInput.value.trim();

  if (!name || isNaN(price)) {
    alert("من فضلك أدخل اسم وسعر الصنف");
    return;
  }

  let products = getProducts();

  // prevent duplicate barcode
  if (barcode && products.some(p => p.barcode === barcode)) {
    alert("الباركود مسجل بالفعل");
    return;
  }

  const product = {
    id: generateID("P"),
    name,
    price,
    barcode
  };

  products.push(product);
  saveProducts(products);

  nameInput.value = "";
  priceInput.value = "";
  barcodeInput.value = "";

  renderProductsTable();
}

/* ---------- DELETE PRODUCT ---------- */
function deleteProduct(id) {
  let products = getProducts();
  products = products.filter(p => p.id !== id);
  saveProducts(products);
  renderProductsTable();
}

/* ---------- RENDER TABLE ---------- */
function renderProductsTable() {
  const table = document.getElementById("productsTable");
  if (!table) return;

  const products = getProducts();
  table.innerHTML = "";

  products.forEach((product, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${product.name}</td>
      <td>${product.price} ج</td>
      <td>${product.barcode || "-"}</td>
      <td>
        <button onclick="deleteProduct('${product.id}')">حذف</button>
      </td>
    `;

    table.appendChild(tr);
  });
}

/* ---------- SEARCH PRODUCT ---------- */
function searchProduct(value) {
  const products = getProducts();
  const keyword = value.trim().toLowerCase();

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(keyword) ||
    (p.barcode && p.barcode.includes(keyword))
  );

  renderProductsGrid(filtered);
}

/* ---------- CASHIER GRID ---------- */
function renderProductsGrid(list = null) {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  const products = list || getProducts();
  grid.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <strong>${product.name}</strong>
      <span>${product.price} ج</span>
    `;

    div.onclick = () => addToInvoice(product.id);
    grid.appendChild(div);
  });
}

/* ---------- BARCODE SEARCH ---------- */
function findProductByBarcode(code) {
  const products = getProducts();
  return products.find(p => p.barcode === code);
}
