let products = JSON.parse(localStorage.products || "[]");
let invoices = JSON.parse(localStorage.invoices || "[]");
let settings = JSON.parse(localStorage.settings || "{}");
let dailyCloses = JSON.parse(localStorage.dailyCloses || "[]");
let customers = JSON.parse(localStorage.customers || "[]");
let cart = [];
let payType = "cash";   // cash | credit
let selectedCustomer = null;

/* حفظ */
function saveAll(){
localStorage.products = JSON.stringify(products);
localStorage.invoices = JSON.stringify(invoices);
localStorage.settings = JSON.stringify(settings);
localStorage.dailyCloses = JSON.stringify(dailyCloses);
localStorage.customers = JSON.stringify(customers);
}

/* تغيير طريقة الدفع */
function setPay(type){
payType = type;
if(type==="credit"){
document.getElementById("customerBox").style.display="block";
}else{
document.getElementById("customerBox").style.display="none";
selectedCustomer = null;
}
}

/* اختيار عميل */
function selectCustomer(i){
if(customers[i].locked) return alert("الحساب مقفول");
selectedCustomer = i;
}

/* إضافة صنف */
function addItem(){
let key = search.value.trim();
let qtyVal = parseInt(qty.value);
if(!key || qtyVal<=0) return alert("بيانات غير صحيحة");

let p = products.find(x=>x.name===key || x.barcode===key);
if(!p) return alert("الصنف غير موجود");
if(p.stock < qtyVal) return alert("المخزون غير كافي");

cart.push({name:p.name,price:p.price,cost:p.cost,qty:qtyVal});
p.stock -= qtyVal;
renderInvoice();
saveAll();
}

/* حذف صنف */
function removeItem(index){
let item = cart[index];
let p = products.find(x=>x.name===item.name);
if(p) p.stock += item.qty;
cart.splice(index,1);
renderInvoice();
saveAll();
}

/* رسم الفاتورة */
function renderInvoice(){
let box=document.getElementById("invoice");
let totalBox=document.getElementById("total");
box.innerHTML="";
let total=0;

cart.forEach((i,idx)=>{
total+=i.price*i.qty;
box.innerHTML+=`
<div class="item">
<b>${i.name}</b>
${i.qty} × ${i.price}
<br><b>${i.qty*i.price}</b>
<br>
<button onclick="removeItem(${idx})"
style="margin-top:6px;background:#ef4444;color:#fff;
border:0;border-radius:8px;padding:6px 10px">🗑 حذف</button>
</div>`;
});

totalBox.innerText="الإجمالي: "+total;
}

/* حفظ فاتورة */
function saveInvoice(){
if(cart.length===0) return alert("الفاتورة فارغة");

let total=cart.reduce((a,i)=>a+i.price*i.qty,0);
let profit=cart.reduce((a,i)=>a+(i.price-i.cost)*i.qty,0);

let inv={
no:invoices.length+1,
date:new Date().toISOString(),
items:cart,
total,
profit,
payType
};

if(payType==="credit"){
if(selectedCustomer===null) return alert("اختر عميل");
customers[selectedCustomer].balance += total;
inv.customer = customers[selectedCustomer].name;
}

invoices.push(inv);
cart=[];
renderInvoice();
saveAll();
alert("تم حفظ الفاتورة");
}

/* طباعة */
function printInvoice(){
if(cart.length===0) return alert("الفاتورة فارغة");
let shop = settings.shopName || "اسم المحل";
let total = cart.reduce((a,i)=>a+i.price*i.qty,0);

let w = window.open("", "", "width=380");
w.document.write(`
<html dir="rtl">
<head><link rel="stylesheet" href="print.css"></head>
<body>
<div class="receipt">
<h2>${shop}</h2>
<p>${new Date().toLocaleString()}</p>
<hr>
${cart.map(i=>`
<div class="row">
<span>${i.name}</span>
<span>${i.qty}×${i.price}</span>
<span>${i.qty*i.price}</span>
</div>`).join("")}
<hr>
<h3>الإجمالي: ${total}</h3>
<p class="thanks">شكراً لتعاملكم معنا</p>
</div>
<script>window.print()</script>
</body></html>
`);
w.document.close();
}

/* فتح العملاء */
function openCustomers(){
location.href="customers.html";
}
