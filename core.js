let products = JSON.parse(localStorage.products || "[]");
let cart = [];

if(products.length === 0){
  products = [
    {name:"توت", price:50},
    {name:"عصير", price:20},
    {name:"مياه", price:10}
  ];
  localStorage.products = JSON.stringify(products);
}

const productsList = document.getElementById("productsList");
const invoiceItems = document.getElementById("invoiceItems");
const totalEl = document.getElementById("total");

function renderProducts(){
  productsList.innerHTML = "";
  products.forEach((p,i)=>{
    productsList.innerHTML += `
      <div class="product-box" onclick="addToCart(${i})">
        <strong>${p.name}</strong>
        <span>${p.price} جنيه</span>
      </div>
    `;
  });
}

function addToCart(i){
  cart.push(products[i]);
  renderInvoice();
}

function renderInvoice(){
  invoiceItems.innerHTML = "";
  let total = 0;

  cart.forEach(p=>{
    total += p.price;
    invoiceItems.innerHTML += `
      <div class="invoice-row">
        <span>${p.name}</span>
        <span>${p.price}</span>
      </div>
    `;
  });

  totalEl.innerText = total;
}

function clearInvoice(){
  cart = [];
  renderInvoice();
}

function pay(){
  if(cart.length === 0){
    alert("لا توجد أصناف");
    return;
  }
  alert("تم الدفع بنجاح");
  clearInvoice();
}

renderProducts();
