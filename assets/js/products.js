let products = [
  { id: 1, name: "شيبسي", price: 5 },
  { id: 2, name: "بيبسي", price: 10 },
  { id: 3, name: "مياه", price: 6 }
];

function renderProducts(list = products) {
  productsGrid.innerHTML = "";
  list.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerText = `${p.name} - ${p.price}ج`;
    div.onclick = () => addToInvoice(p);
    productsGrid.appendChild(div);
  });
}

function searchProduct(v) {
  renderProducts(products.filter(p => p.name.includes(v)));
}

renderProducts();
