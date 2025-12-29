const invoices = Storage.get("invoices") || [];

// مبيعات اليوم
const today = new Date().toLocaleDateString();
let todayTotal = 0;
let monthTotal = 0;
let productCount = {};

invoices.forEach(inv=>{
  const d = new Date(inv.date).toLocaleDateString();
  const m = new Date(inv.date).getMonth();

  if(d === today){
    todayTotal += inv.total;
  }

  if(m === new Date().getMonth()){
    monthTotal += inv.total;
  }

  inv.items.forEach(i=>{
    productCount[i.name] = (productCount[i.name] || 0) + i.qty;
  });
});

// أكثر صنف
let topProduct = "—";
let max = 0;
for(let p in productCount){
  if(productCount[p] > max){
    max = productCount[p];
    topProduct = p;
  }
}

// عرض القيم
todaySales.innerText = todayTotal + " ج";
monthSales.innerText = monthTotal + " ج";
invoiceCount.innerText = invoices.length;
topProductEl = document.getElementById("topProduct");
topProductEl.innerText = topProduct;

// آخر فواتير
const last = invoices.slice(-5).reverse();
lastInvoices.innerHTML = "";

last.forEach(i=>{
  lastInvoices.innerHTML += `
    <tr>
      <td>${i.no}</td>
      <td>${i.date}</td>
      <td>${i.total} ج</td>
    </tr>
  `;
});
