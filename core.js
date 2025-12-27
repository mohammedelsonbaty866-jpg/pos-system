let products = JSON.parse(localStorage.products || "[]");
let invoices = JSON.parse(localStorage.invoices || "[]");
let settings = JSON.parse(localStorage.settings || "{}");
let cart = [];

function saveAll(){
localStorage.products = JSON.stringify(products);
localStorage.invoices = JSON.stringify(invoices);
localStorage.settings = JSON.stringify(settings);
}

/* إضافة صنف */
function addItem(){
let name = search.value.trim();
let qtyVal = parseInt(qty.value);
if(!name || qtyVal<=0) return alert("بيانات غير صحيحة");

let p = products.find(x=>x.name===name);
if(!p) return alert("الصنف غير موجود");
if(p.stock < qtyVal) return alert("المخزون غير كافي");

cart.push({
name:p.name,
price:p.price,
cost:p.cost,
qty:qtyVal
});
p.stock -= qtyVal;
renderInvoice();
saveAll();
}

/* رسم الفاتورة */
function renderInvoice(){
let box=document.getElementById("invoice");
let totalBox=document.getElementById("total");
box.innerHTML="";
let total=0;
cart.forEach(i=>{
total+=i.price*i.qty;
box.innerHTML+=`
<div class="item">
<b>${i.name}</b>
${i.qty} × ${i.price}
<br><b>${i.qty*i.price}</b>
</div>`;
});
totalBox.innerText="الإجمالي: "+total;
}

/* حفظ فاتورة */
function saveInvoice(){
if(cart.length===0) return alert("الفاتورة فارغة");
let total=cart.reduce((a,i)=>a+i.price*i.qty,0);
let profit=cart.reduce((a,i)=>a+(i.price-i.cost)*i.qty,0);

invoices.push({
no:invoices.length+1,
date:new Date().toLocaleString(),
items:cart,
total,
profit
});
cart=[];
renderInvoice();
saveAll();
alert("تم الحفظ");
}

/* طباعة */
function printInvoice(){
let w = window.open("", "", "width=380");
let shop = settings.shopName || "اسم المحل";
let html = `
<html dir="rtl">
<head>
<link rel="stylesheet" href="print.css">
</head>
<body>
<div class="receipt">
<h2>${shop}</h2>
<p>فاتورة رقم: ${invoices.length}</p>
<p>${new Date().toLocaleString()}</p>
<hr>
${cart.map(i=>`
<div class="row">
<span>${i.name}</span>
<span>${i.qty}×${i.price}</span>
<span>${i.qty*i.price}</span>
</div>`).join("")}
<hr>
<h3>الإجمالي: ${cart.reduce((a,i)=>a+i.price*i.qty,0)}</h3>
<p class="thanks">شكراً لتعاملكم معنا</p>
</div>
<script>window.print();</script>
</body></html>`;
w.document.write(html);
w.document.close();
}

/* فتح الإدارة */
function openAdmin(){
location.href="admin.html";
}
