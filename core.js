let products = JSON.parse(localStorage.products || "[]");
let invoices = JSON.parse(localStorage.invoices || "[]");
let cart = [];

function save(){
localStorage.products = JSON.stringify(products);
localStorage.invoices = JSON.stringify(invoices);
}

/* ===== إدارة الأصناف ===== */
function addProduct(){
if(!pn.value || !pp.value) return alert("أدخل البيانات");
products.push({name:pn.value, price:+pp.value});
pn.value=""; pp.value="";
save(); renderProducts();
}

function renderProducts(){
if(!plist) return;
plist.innerHTML="";
products.forEach((p,i)=>{
plist.innerHTML += `
<div class="card">
<b>${p.name}</b> - ${p.price}
<button class="del" onclick="delProduct(${i})">حذف</button>
</div>`;
});
}

function delProduct(i){
if(confirm("حذف الصنف؟")){
products.splice(i,1);
save(); renderProducts();
}
}

/* ===== الكاشير ===== */
function addItem(){
let p = products.find(x=>x.name==search.value);
if(!p) return alert("الصنف غير موجود");
cart.push({name:p.name, price:p.price, qty:+qty.value});
renderInvoice();
}

function renderInvoice(){
invoice.innerHTML="";
let t=0;
cart.forEach(i=>{
t += i.price*i.qty;
invoice.innerHTML += `
<div class="card">
${i.name} | ${i.qty} × ${i.price}
</div>`;
});
total.innerText = "الإجمالي: " + t;
}

function saveInvoice(){
if(cart.length==0) return;
invoices.push({
date:new Date().toLocaleString(),
items:cart
});
cart=[];
renderInvoice();
save();
alert("تم حفظ الفاتورة");
}

/* ===== أدوات ===== */
function openAdmin(){
window.location.href="admin.html";
}

function printInvoice(){
window.print();
}
