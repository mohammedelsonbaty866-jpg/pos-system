/* ===============================
   POS SYSTEM - CORE LOGIC
   =============================== */

/* ===== التخزين ===== */
let products = JSON.parse(localStorage.getItem("products")) || [];
let customers = JSON.parse(localStorage.getItem("customers")) || [];
let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

let cart = [];

/* ===== عناصر ===== */
const invoiceBox = document.getElementById("invoice");
const totalBox = document.getElementById("total");
const customerSelect = document.getElementById("customer");

/* ===== القائمة ===== */
function toggleMenu(){
 document.getElementById("menu").style.right =
 document.getElementById("menu").style.right === "0px" ? "-220px" : "0px";
}

function show(id){
 document.querySelectorAll("#screens > div").forEach(d=>d.classList.add("hidden"));
 document.getElementById(id).classList.remove("hidden");
 toggleMenu();
}

/* ===== الأصناف ===== */
function saveProducts(){
 localStorage.setItem("products",JSON.stringify(products));
}

function addProduct(name,price){
 products.push({id:Date.now(),name,price});
 saveProducts();
}

/* ===== العملاء ===== */
function saveCustomers(){
 localStorage.setItem("customers",JSON.stringify(customers));
}

function loadCustomers(){
 customerSelect.innerHTML="";
 customers.forEach(c=>{
  let o=document.createElement("option");
  o.value=c.id;
  o.textContent=c.name;
  customerSelect.appendChild(o);
 });
}

/* ===== إضافة صنف للفاتورة ===== */
function addItem(){
 const search=document.getElementById("search").value.trim();
 const qty=parseInt(document.getElementById("qty").value)||1;

 if(!search) return alert("اكتب اسم الصنف");

 const product=products.find(p=>p.name===search);
 if(!product) return alert("الصنف غير موجود");

 let item=cart.find(i=>i.id===product.id);
 if(item){
  item.qty+=qty;
 }else{
  cart.push({...product,qty});
 }

 renderInvoice();
 document.getElementById("search").value="";
}

/* ===== عرض الفاتورة ===== */
function renderInvoice(){
 invoiceBox.innerHTML="";
 let total=0;

 cart.forEach(item=>{
  total+=item.price*item.qty;

  let div=document.createElement("div");
  div.className="card";
  div.innerHTML=`
   <b>${item.name}</b><br>
   ${item.qty} × ${item.price}<br>
   <button onclick="removeItem(${item.id})">❌</button>
  `;
  invoiceBox.appendChild(div);
 });

 totalBox.textContent="الإجمالي: "+total;
}

/* ===== حذف صنف ===== */
function removeItem(id){
 cart=cart.filter(i=>i.id!==id);
 renderInvoice();
}

/* ===== الدفع ===== */
function toggleCustomer(){
 if(document.getElementById("payType").value==="credit"){
  customerSelect.classList.remove("hidden");
  loadCustomers();
 }else{
  customerSelect.classList.add("hidden");
 }
}

/* ===== حفظ الفاتورة ===== */
function saveInvoice(){
 if(cart.length===0) return alert("الفاتورة فارغة");

 let invoice={
  id:Date.now(),
  date:new Date().toLocaleString(),
  items:cart,
  total:cart.reduce((s,i)=>s+i.price*i.qty,0),
  payType:document.getElementById("payType").value,
  customer:document.getElementById("customer").value||null
 };

 invoices.push(invoice);
 localStorage.setItem("invoices",JSON.stringify(invoices));

 printInvoice(invoice);

 cart=[];
 renderInvoice();
}

/* ===== الطباعة ===== */
function printInvoice(inv){
 document.getElementById("print-area").style.display="block";
 document.getElementById("p-shop").textContent=
 localStorage.getItem("shopName")||"متجر";

 let itemsHTML="";
 inv.items.forEach(i=>{
  itemsHTML+=`${i.name} (${i.qty}) - ${i.price*i.qty}<br>`;
 });

 document.getElementById("p-items").innerHTML=itemsHTML;
 document.getElementById("p-total").textContent=inv.total;

 setTimeout(()=>{
  window.print();
  document.getElementById("print-area").style.display="none";
 },300);
}

/* ===== إعدادات ===== */
function setShopName(name){
 localStorage.setItem("shopName",name);
 document.getElementById("shopTitle").textContent=name;
}

/* ===== تحميل أولي ===== */
document.getElementById("shopTitle").textContent=
 localStorage.getItem("shopName")||"نظام كاشير";
