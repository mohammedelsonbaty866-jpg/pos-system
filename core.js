/* =========================
   CORE.JS – POS SYSTEM
   نسخة احترافية مستقرة
========================= */

/* ====== DATA ====== */
let products   = JSON.parse(localStorage.products || "[]");
let customers  = JSON.parse(localStorage.customers || "[]");
let invoices   = JSON.parse(localStorage.invoices || "[]");
let settings   = JSON.parse(localStorage.settings || "{}");
let cart = [];

/* ====== SAVE ====== */
function saveAll(){
  localStorage.products  = JSON.stringify(products);
  localStorage.customers = JSON.stringify(customers);
  localStorage.invoices  = JSON.stringify(invoices);
  localStorage.settings  = JSON.stringify(settings);
}

/* ====== MENU ====== */
function toggleMenu(){
  menu.style.right = menu.style.right === "0px" ? "-220px" : "0px";
}

function showScreen(id){
  document.querySelectorAll(".screen").forEach(s=>{
    s.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
  menu.style.right = "-220px";
}

/* ====== PRODUCTS ====== */
function renderProducts(){
  productsGrid.innerHTML = "";
  products.forEach((p,index)=>{
    let div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <b>${p.n}</b>
      <span>${p.p} جنيه</span>
    `;
    div.onclick = ()=> addToCart(index);
    productsGrid.appendChild(div);
  });
}

function addProduct(){
  if(!pn.value || !pp.value) return alert("أدخل البيانات كاملة");

  products.push({
    n: pn.value,
    p: Number(pp.value),
    c: Number(pc.value || 0),
    s: Number(ps.value || 0)
  });

  pn.value = pp.value = pc.value = ps.value = "";
  saveAll();
  renderProducts();
  alert("تم حفظ الصنف");
}

/* ====== CART ====== */
function addToCart(index){
  let p = products[index];
  if(p.s <= 0) return alert("المخزون نفد");

  let existing = cart.find(i => i.n === p.n);

  if(existing){
    existing.q += 1;
  }else{
    cart.push({
      n: p.n,
      p: p.p,
      c: p.c,
      q: 1
    });
  }

  p.s -= 1;
  saveAll();
  renderInvoice();
}

function renderInvoice(){
  invoiceItems.innerHTML = "";
  let totalVal = 0;

  cart.forEach((i,idx)=>{
    totalVal += i.p * i.q;
    invoiceItems.innerHTML += `
      <div class="item">
        <b>${i.n}</b><br>
        ${i.q} × ${i.p}
      </div>
    `;
  });

  total.innerText = "الإجمالي: " + totalVal;
}

/* ====== INVOICE ====== */
function saveInvoice(){
  if(cart.length === 0){
    alert("لا توجد أصناف");
    return;
  }

  let totalVal = cart.reduce((a,i)=> a + (i.p * i.q), 0);
  let profit   = cart.reduce((a,i)=> a + ((i.p - i.c) * i.q), 0);

  let invoice = {
    no: invoices.length + 1,
    date: new Date().toLocaleString("ar-EG"),
    type: payType.value,
    total: totalVal,
    profit: profit,
    items: JSON.parse(JSON.stringify(cart))
  };

  if(payType.value === "credit"){
    if(customer.value === ""){
      alert("اختر عميل");
      return;
    }
    let c = customers[customer.value];
    c.b += totalVal;
    invoice.customer = c.n;
  }

  invoices.push(invoice);
  cart = [];
  saveAll();
  renderInvoice();
  alert("تم حفظ الفاتورة بنجاح");
}

/* ====== CUSTOMERS ====== */
function addCustomer(){
  if(!cn.value) return;
  customers.push({ n: cn.value, b: 0 });
  cn.value = "";
  saveAll();
  renderCustomers();
}

function renderCustomers(){
  customerList.innerHTML = "";
  customer.innerHTML = `<option value="">اختر عميل</option>`;

  customers.forEach((c,i)=>{
    customerList.innerHTML += `
      <div class="item">${c.n} : ${c.b} جنيه</div>
    `;
    customer.innerHTML += `
      <option value="${i}">${c.n}</option>
    `;
  });
}

/* ====== SETTINGS ====== */
function saveSettings(){
  settings.shopName = shopInput.value;
  shopName.innerText = settings.shopName || "نظام كاشير";
  saveAll();
}

/* ====== INIT ====== */
shopName.innerText = settings.shopName || "نظام كاشير";
renderProducts();
renderCustomers();

/* ====== PAY TYPE ====== */
payType.onchange = ()=>{
  customer.style.display = payType.value === "credit" ? "block" : "none";
};
