/* =========================
   REPORTS SYSTEM
   Commercial POS Version
========================= */

function getToday(){
  return new Date().toLocaleDateString();
}

/* ===== DAILY REPORT ===== */
function dailyReport(){
  let today = getToday();
  let dayInvoices = invoices.filter(i =>
    i.date.startsWith(today)
  );

  let total = 0, profit = 0;
  dayInvoices.forEach(i=>{
    total += i.total;
    profit += (i.profit || 0);
  });

  reportBox.innerHTML = `
    <h4>📅 تقرير اليوم</h4>
    <p>عدد الفواتير: ${dayInvoices.length}</p>
    <p>إجمالي المبيعات: ${total}</p>
    <p>الأرباح: ${profit}</p>
  `;
}

/* ===== MONTHLY REPORT ===== */
function monthlyReport(){
  let m = new Date().getMonth();
  let y = new Date().getFullYear();

  let list = invoices.filter(i=>{
    let d=new Date(i.date);
    return d.getMonth()==m && d.getFullYear()==y;
  });

  let total=0,profit=0;
  list.forEach(i=>{
    total+=i.total;
    profit+=(i.profit||0);
  });

  reportBox.innerHTML=`
   <h4>📆 تقرير الشهر</h4>
   <p>عدد الفواتير: ${list.length}</p>
   <p>إجمالي المبيعات: ${total}</p>
   <p>الأرباح: ${profit}</p>
  `;
}

/* ===== YEARLY REPORT ===== */
function yearlyReport(){
  let y = new Date().getFullYear();
  let list = invoices.filter(i=>{
    new Date(i.date).getFullYear()==y;
  });

  let total=0,profit=0;
  list.forEach(i=>{
    total+=i.total;
    profit+=(i.profit||0);
  });

  reportBox.innerHTML=`
   <h4>📊 تقرير سنوي</h4>
   <p>عدد الفواتير: ${list.length}</p>
   <p>إجمالي المبيعات: ${total}</p>
   <p>الأرباح: ${profit}</p>
  `;
}

/* ===== DAILY CLOSE ===== */
function dailyClose(){
  let today = getToday();
  localStorage["close-"+today]="true";
  alert("تم القفل اليومي");
}

/* ===== CHECK CLOSE ===== */
function isClosed(){
  let today = getToday();
  return localStorage["close-"+today]=="true";
}
