let products = JSON.parse(localStorage.products || "[]");
let cart = [];
let settings = JSON.parse(localStorage.settings || "{}");

/* بيانات افتراضية */
if(products.length === 0){
products = [
{n:"مياه",p:10},
{n:"عصير",p:20},
{n:"شيبسي",p:7}
];
localStorage.products = JSON.stringify(products);
}

const productsList = document.getElementById("productsList");
const invoiceItems = document.getElementById("invoiceItems");
const invoiceHeader = document.getElementById("invoiceHeader");
const invoiceTotal = document.getElementById("invoiceTotal");

function renderProducts(){
productsList.innerHTML="";
products.forEach((p,i)=>{
productsList.innerHTML+=`
<div class="product-box" onclick="addToCart(${i})">
<strong>${p.n}</strong>
<span>${p.p} جنيه</span>
</div>`;
});
}

function addToCart(i){
cart.push(products[i]);
renderInvoice();
}

function renderInvoice(){
invoiceItems.innerHTML="";
let total=0;

invoiceHeader.innerHTML=`
<strong>${settings.shopName || "اسم المحل"}</strong><br>
فاتورة بيع<br>
${new Date().toLocaleString()}
`;

cart.forEach(item=>{
total+=item.p;
invoiceItems.innerHTML+=`
<div class="invoice-item">
<div>${item.n}</div>
<div>1×</div>
<div>${item.p}</div>
</div>`;
});

invoiceTotal.innerText="الإجمالي: "+total+" جنيه";
}

function clearInvoice(){
cart=[];
renderInvoice();
}

function pay(){
if(cart.length===0){alert("الفاتورة فارغة");return;}
alert("تم الدفع");
clearInvoice();
}

function printInvoice(){
if(cart.length===0){alert("لا توجد أصناف للطباعة");return;}
window.print();
}

renderProducts();
renderInvoice();
