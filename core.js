/* ===================================
   CORE.JS
   قلب نظام الكاشير الاحترافي
=================================== */

/* ===== تحميل البيانات ===== */
let products   = JSON.parse(localStorage.products  || "[]");
let customers  = JSON.parse(localStorage.customers || "[]");
let invoices   = JSON.parse(localStorage.invoices  || "[]");
let settings   = JSON.parse(localStorage.settings  || "{}");
let cart = [];

/* ===== حفظ ===== */
function saveAll(){
  localStorage.products  = JSON.stringify(products);
  localStorage.customers = JSON.stringify(customers);
  localStorage.invoices  = JSON.stringify(invoices);
  localStorage.settings  = JSON.stringify(settings);
}

/* ===== القوائم ===== */
function toggleMenu(){
  menu.style.right = (menu.style.right === "0px") ? "-220px" : "0px";
}

function showScreen(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  menu.style.right = "-220px";
}

/* ===== الكاشير ===== */
function renderProducts(){
  const grid = document.getElementById("productsGrid");
  if(!grid) return;

  grid.innerHTML = "";
  products.forEach((p)=>{
    if(p.s <= 0) return;

    const d = document.createElement("div");
    d.className = "product";
    d.innerHTML = `<b>${p.n}</b>${p.p} جنيه`;
    d.onclick = ()=>addToCart(p);
    grid.appendChild(d);
  });
}

function addToCart(p){
  if(isClosed()){
    alert("اليوم مقفول");
    return;
  }

  if(p.s <= 0){
    alert("نفاد المخزون");
    return;
  }

  let item = cart.find(i=>i.n===p.n);
  if(item){
    item.q++;
  }else{
    cart.push({n:p.n,p:p.p,c:p.c,q:1});
  }

  p.s--;
  saveAll();
  renderInvoice();
}

function renderInvoice(){
  const box = document.getElementById("invoiceItems");
  const totalBox = document.getElementById("total");
  if(!box) return;

  let total = 0;
  box.innerHTML = "";

  cart.forEach(i=>{
    const line = i.q * i.p;
    total += line;

    box.innerHTML += `
      <div class="item">
        ${i.n}<br>
        ${i.q} × ${i.p}
      </div>
    `;
  });

  totalBox.innerText = "الإجمالي: " + total;
}

/* ===== حفظ الفاتورة ===== */
function saveInvoice(){
  if(cart.length === 0){
    alert("الفاتورة فارغة");
    return;
  }

  if(isClosed()){
    alert("اليوم مقفول");
    return;
  }

  const total = cart.reduce((a,i)=>a + i.q*i.p,0);
  const profit = cart.reduce((a,i)=>a + (i.p - i.c)*i.q,0);

  const payType = document.getElementById("payType")?.value || "cash";
  const customerIndex = document.getElementById("customer")?.value;

  let invoice = {
    no: invoices.length + 1,
    date: new Date().toLocaleString(),
    type: payType,
    total,
    profit,
    items: JSON.parse(JSON.stringify(cart))
  };

  if(payType === "credit"){
    if(customerIndex === "" || customerIndex == null){
      alert("اختر عميل");
      return;
    }
    customers[customerIndex].b += total;
    invoice.customer = customers[customerIndex].n;
  }

  invoices.push(invoice);
  cart = [];
  saveAll();
  renderInvoice();
  alert("تم حفظ الفاتورة");
}

/* ===== العملاء ===== */
function renderCustomers(){
  const list = document.getElementById("customerList");
  const select = document.getElementById("customer");
  if(!list || !select) return;

  list.innerHTML = "";
  select.innerHTML = "<option value=''>اختر عميل</option>";

  customers.forEach((c,i)=>{
    list.innerHTML += `<div>${c.n} | مديونية: ${c.b}</div>`;
    select.innerHTML += `<option value="${i}">${c.n}</option>`;
  });
}

function addCustomer(){
  const name = document.getElementById("cn").value.trim();
  if(!name) return alert("ادخل اسم العميل");

  customers.push({n:name,b:0});
  saveAll();
  renderCustomers();
  document.getElementById("cn").value="";
}

/* ===== الإعدادات ===== */
function saveSettings(){
  const input = document.getElementById("shopInput");
  if(!input) return;

  settings.shopName = input.value;
  document.getElementById("shopName").innerText =
    settings.shopName || "نظام كاشير";
  saveAll();
}

/* ===== تغيير نوع الدفع ===== */
document.addEventListener("change",(e)=>{
  if(e.target.id === "payType"){
    const c = document.getElementById("customer");
    if(e.target.value === "credit"){
      c.style.display = "block";
    }else{
      c.style.display = "none";
    }
  }
});

/* ===== بدء التشغيل ===== */
document.addEventListener("DOMContentLoaded",()=>{
  document.getElementById("shopName").innerText =
    settings.shopName || "نظام كاشير";

  renderProducts();
  renderCustomers();
  renderInvoice();
});
