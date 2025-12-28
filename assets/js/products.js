let products = JSON.parse(localStorage.getItem("products")) || [];

document.addEventListener("DOMContentLoaded", renderProducts);

function addProduct() {
  const name = document.getElementById("productName").value.trim();
  const price = document.getElementById("productPrice").value;

  if (name === "" || price === "") {
    alert("من فضلك أدخل اسم الصنف والسعر");
    return;
  }

  products.push({
    id: Date.now(),
    name,
    price
  });

  localStorage.setItem("products", JSON.stringify(products));
  clearInputs();
  renderProducts();
}

function renderProducts() {
  const table = document.getElementById("productsTable");
  table.innerHTML = "";

  products.forEach((p, i) => {
    table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>
          <button onclick="deleteProduct(${p.id})">🗑</button>
        </td>
      </tr>
    `;
  });
}

function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

function clearInputs() {
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
}
