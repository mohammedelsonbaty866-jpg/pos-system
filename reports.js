/* ===============================
   REPORTS.JS – POS SYSTEM
   =============================== */

/* ===== HELPERS ===== */
function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("ar-EG");
}

/* ===== DAILY REPORT ===== */
function dailyReport() {
  const today = getTodayDate();

  const dailyInvoices = invoices.filter(inv =>
    inv.date.startsWith(today)
  );

  renderReport(dailyInvoices, "📅 تقرير اليوم");
}

/* ===== MONTHLY REPORT ===== */
function monthlyReport() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  const monthlyInvoices = invoices.filter(inv => {
    const d = new Date(inv.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });

  renderReport(monthlyInvoices, "📆 تقرير شهري");
}

/* ===== YEARLY REPORT ===== */
function yearlyReport() {
  const year = new Date().getFullYear();

  const yearlyInvoices = invoices.filter(inv =>
    new Date(inv.date).getFullYear() === year
  );

  renderReport(yearlyInvoices, "📊 تقرير سنوي");
}

/* ===== RENDER REPORT ===== */
function renderReport(list, title) {
  const box = document.getElementById("reportBox");
  if (!box) return;

  let totalSales = 0;
  let totalProfit = 0;

  list.forEach(inv => {
    totalSales += inv.total;
    inv.items.forEach(i => {
      totalProfit += (i.price - (i.cost || 0)) * i.qty;
    });
  });

  box.innerHTML = `
    <div class="report-card">
      <h3>${title}</h3>

      <p>🧾 عدد الفواتير: <b>${list.length}</b></p>
      <p>💰 إجمالي المبيعات: <b>${totalSales.toFixed(2)} جنيه</b></p>
      <p>📈 صافي الربح: <b>${totalProfit.toFixed(2)} جنيه</b></p>

      <hr>

      ${list.map(inv => `
        <div class="report-item">
          <span>فاتورة #${inv.no}</span>
          <span>${formatDate(inv.date)}</span>
          <span>${inv.total} جنيه</span>
        </div>
      `).join("")}
    </div>
  `;
}

/* ===== DAILY CLOSE ===== */
function dailyClose() {
  if (!confirm("هل تريد قفل اليوم؟")) return;

  localStorage.setItem("dayClosed", getTodayDate());
  alert("تم قفل اليوم – لا يمكن البيع");
}

/* ===== CHECK DAY CLOSED ===== */
function isClosed() {
  return localStorage.getItem("dayClosed") === getTodayDate();
}
