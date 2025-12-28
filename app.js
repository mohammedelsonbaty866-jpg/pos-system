/* ===============================
   POS CORE SYSTEM
   Cashier / Invoices / Reports
================================ */

let products   = JSON.parse(localStorage.getItem("products") || "[]");
let invoices   = JSON.parse(localStorage.getItem("invoices") || "[]");
let customers  = JSON.parse(localStorage.getItem("customers") || "[]");
let cart       = [];
let dailyClose = localStorage.getItem("dailyCloseDate") || "";

/* ===============================
   PRODUCTS
================================ */

function renderProducts(){
  const grid = document.getElementById("productsGrid");
  if(!grid) return;
  grid.innerHTML = "";

  products.forEach((p, i) => {
    const d = document.createElement("div");
    d.className = "product";
    d.innerHTML = `
      <b>${p.name}</b>
      <div>${p.price} ج</div>
      <small>مخزون: ${p.stock}</small>
    `;
    d.onclick = () => addToCart(i);
    grid.appendChild(d);
  });
}

function addProduct(){
  const name  = pn.value.trim();
  const price = +pp.value;
  const cost  = +pc.value;
  const stock = +ps.value;

  if(!name || price<=0) return alert("❌ بيانات غير صحيحة");

  products.push({ name, price, cost, stock });
  saveData();
  renderProducts();
  alert("✅ تم حفظ الصنف");
}

/* ===============================
   CART
================================ */

function addToCart(index){
  const p = products[index];
  if(p.stock <= 0) return alert("❌ نفاد المخزون");

  const found = cart.find(i => i.name === p.name);
  if(found){
    found.qty++;
  }else{
    cart.push({ name:p.name, price:p.price, qty:1 });
  }

  p.stock--;
  saveData();
  renderInvoice();
}

function renderInvoice(){
  const box = document.getElementById("invoiceItems");
  const totalBox = document.getElementById("total");

  if(!box) return;
  box.innerHTML = "";
  let total = 0;

  cart.forEach(i=>{
    const row = document.createElement("div");
    row.className = "item";
    row.innerHTML = `
      ${i.name}<br>
      ${i.qty} × ${i.price}
    `;
    box.appendChild(row);
    total += i.qty * i.price;
  });

  totalBox.innerText = "الإجمالي: " + total + " ج";
}

/* ===============================
   INVOICES
================================ */

function saveInvoice(){
  if(isDayClosed()) return alert("❌ اليوم مقفول");

  if(cart.length === 0)
    return alert("❌ لا توجد أصناف");

  const invoice = {
    id: invoices.length + 1,
    date: new Date().toLocaleString(),
    items: cart,
    total: cart.reduce((s,i)=>s+i.qty*i.price,0)
  };

  invoices.push(invoice);
  cart = [];
  saveData();
  renderInvoice();

  alert("✅ تم حفظ الفاتورة");
}

function printInvoice(){
  if(cart.length === 0)
    return alert("❌ لا توجد فاتورة");

  window.print();
}

/* ===============================
   REPORTS
================================ */

function dailyReport(){
  const today = new Date().toLocaleDateString();
  const list = invoices.filter(i =>
    i.date.includes(today)
  );

  showReport(list, "📅 تقرير اليوم");
}

function monthlyReport(){
  const month = new Date().getMonth()+1;
  const list = invoices.filter(i =>
    new Date(i.date).getMonth()+1 === month
  );

  showReport(list, "📆 تقرير شهري");
}

function yearlyReport(){
  const year = new Date().getFullYear();
  const list = invoices.filter(i =>
    new Date(i.date).getFullYear() === year
  );

  showReport(list, "📊 تقرير سنوي");
}

function showReport(list, title){
  const box = document.getElementById("reportBox");
  let total = 0;

  box.innerHTML = `<h4>${title}</h4>`;
  list.forEach(i=>{
    total += i.total;
    box.innerHTML += `
      <div>
        فاتورة #${i.id} — ${i.total} ج
      </div>
    `;
  });

  box.innerHTML += `<hr><b>الإجمالي: ${total} ج</b>`;
}

/* ===============================
   DAILY CLOSE
================================ */

function closeDay(){
  const today = new Date().toLocaleDateString();
  localStorage.setItem("dailyCloseDate", today);
  alert("✅ تم القفل اليومي");
}

function isDayClosed(){
  const today = new Date().toLocaleDateString();
  return dailyClose === today;
}

/* ===============================
   CUSTOMERS
================================ */

function addCustomer(){
  if(!cn.value.trim()) return;
  customers.push({ name: cn.value, balance:0 });
  saveData();
  renderCustomers();
}

function renderCustomers(){
  const list = document.getElementById("customerList");
  if(!list) return;

  list.innerHTML = "";
  customers.forEach(c=>{
    list.innerHTML += `<div>${c.name} — ${c.balance} ج</div>`;
  });
}

/* ===============================
   SAVE
================================ */

function saveData(){
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("invoices", JSON.stringify(invoices));
  localStorage.setItem("customers", JSON.stringify(customers));
}

/* ===============================
   INIT
================================ */

document.addEventListener("DOMContentLoaded", ()=>{
  renderProducts();
  renderCustomers();
});
