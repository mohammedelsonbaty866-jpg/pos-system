let products = JSON.parse(localStorage.getItem("products")) || [];

function addProduct() {
  const name = document.getElementById("productName").value;
  const price = +document.getElementById("productPrice").value;
  const barcode = document.getElementById("productBarcode").value;

  if (!name || !price) return alert("أكمل البيانات");

  products.push({
    id: Date.now(),
    name,
    price,
    barcode
  });

  saveProducts();
  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = "";
  products.forEach(p => {
    const d = document.createElement("div");
    d.className = "product-card";
    d.innerHTML = `<b>${p.name}</b><span>${p.price} ج</span>`;
    d.onclick = () => addToCart(p);
    grid.appendChild(d);
  });
}

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}
