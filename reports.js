/* ===================================
   REPORTS.JS
   التقارير + الأرباح + القفل اليومي
=================================== */

/* تقرير اليوم */
function dailyReport(){
  const today = new Date().toLocaleDateString();
  let total = 0;
  let profit = 0;

  const list = invoices.filter(inv =>
    inv.date.includes(today)
  );

  list.forEach(inv=>{
    total += inv.total;
    profit += inv.profit || 0;
  });

  reportBox.innerHTML = `
    <div class="card">
      <h4>📅 تقرير اليوم</h4>
      <p>عدد الفواتير: ${list.length}</p>
      <p>إجمالي المبيعات: ${total} جنيه</p>
      <p>الأرباح: ${profit} جنيه</p>
    </div>
  `;
}

/* تقرير شهري */
function monthlyReport(){
  const month = new Date().getMonth()+1;
  const year = new Date().getFullYear();
  let total = 0;
  let profit = 0;

  const list = invoices.filter(inv=>{
    const d = new Date(inv.date);
    return d.getMonth()+1===month && d.getFullYear()===year;
  });

  list.forEach(inv=>{
    total += inv.total;
    profit += inv.profit || 0;
  });

  reportBox.innerHTML = `
    <div class="card">
      <h4>📆 تقرير شهري</h4>
      <p>عدد الفواتير: ${list.length}</p>
      <p>إجمالي المبيعات: ${total} جنيه</p>
      <p>الأرباح: ${profit} جنيه</p>
    </div>
  `;
}

/* تقرير سنوي */
function yearlyReport(){
  const year = new Date().getFullYear();
  let total = 0;
  let profit = 0;

  const list = invoices.filter(inv=>{
    return new Date(inv.date).getFullYear()===year;
  });

  list.forEach(inv=>{
    total += inv.total;
    profit += inv.profit || 0;
  });

  reportBox.innerHTML = `
    <div class="card">
      <h4>📊 تقرير سنوي</h4>
      <p>عدد الفواتير: ${list.length}</p>
      <p>إجمالي المبيعات: ${total} جنيه</p>
      <p>الأرباح: ${profit} جنيه</p>
    </div>
  `;
}

/* ===== قفل يومي ===== */
function dailyClose(){
  const today = new Date().toLocaleDateString();
  if(localStorage.closedDay === today){
    alert("تم قفل اليوم بالفعل");
    return;
  }

  dailyReport();
  localStorage.closedDay = today;
  alert("تم القفل اليومي بنجاح");
}

/* ===== تحقق من القفل ===== */
function isClosed(){
  return localStorage.closedDay === new Date().toLocaleDateString();
}
