// ===== PRODUCTS =====

function addProduct() {
  const name = document.getElementById("productName").value.trim();
  const price = Number(document.getElementById("productPrice").value);
  const barcode = document.getElementById("productBarcode").value.trim();

  if (!name || !price) {
    alert("أكمل البيانات");
    return;
  }

  products.push({
    id: Date.now(),
    name,
    price,
    barcode
  });

  saveProducts();
  renderProducts();
  clearInputs();
}

function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = "";
  products.forEach(p => {
    grid.innerHTML += `
      <div class="product-card" onclick="addToInvoice(${p.id})">
        <strong>${p.name}</strong>
        <span>${p.price} ج</span>
      </div>
    `;
  });
}

function clearInputs() {
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productBarcode").value = "";
}

renderProducts();
