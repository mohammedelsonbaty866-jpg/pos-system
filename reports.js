/* ===============================
   REPORTS SYSTEM
   Commercial POS Version
================================ */

let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

/* ===== LOAD REPORTS ===== */
document.addEventListener("DOMContentLoaded", () => {
  renderReports();
});

/* ===== RENDER REPORTS ===== */
function renderReports() {
  const box = document.getElementById("reportsBox");
  if (!box) return;

  let totalSales = 0;
  let totalProfit = 0;
  let cash = 0;
  let credit = 0;

  invoices.forEach(inv => {
    totalSales += inv.total;
    totalProfit += inv.profit;

    if (inv.type === "cash") cash += inv.total;
    if (inv.type === "credit") credit += inv.total;
  });

  box.innerHTML = `
    <div class="report-card">
      <h3>📦 عدد الفواتير</h3>
      <p>${invoices.length}</p>
    </div>

    <div class="report-card">
      <h3>💰 إجمالي المبيعات</h3>
      <p>${totalSales} ج</p>
    </div>

    <div class="report-card">
      <h3>📈 إجمالي الأرباح</h3>
      <p>${totalProfit} ج</p>
    </div>

    <div class="report-card">
      <h3>💵 نقدي</h3>
      <p>${cash} ج</p>
    </div>

    <div class="report-card">
      <h3>🧾 آجل</h3>
      <p>${credit} ج</p>
    </div>
  `;
}

/* ===== CLEAR REPORTS ===== */
function clearReports() {
  if (!confirm("مسح جميع التقارير؟")) return;

  localStorage.removeItem("invoices");
  invoices = [];
  renderReports();
}
