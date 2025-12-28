/*************************
 * REPORTS & USERS SYSTEM
 * Commercial Stable
 *************************/

/* ===== LOAD DATA ===== */
function loadData(key, def = []) {
  try {
    return JSON.parse(localStorage.getItem(key)) || def;
  } catch {
    return def;
  }
}

const invoicesR = loadData("invoices");
const users = loadData("users", [
  { username: "admin", role: "admin" },
  { username: "cashier", role: "cashier" }
]);

/* ===== HELPERS ===== */
function formatMoney(n) {
  return Number(n).toFixed(2);
}

/* ===== REPORTS ===== */
function reportDaily() {
  const today = new Date().toLocaleDateString("ar-EG");
  return invoicesR.filter(i => i.date.includes(today));
}

function reportMonthly() {
  const m = new Date().toLocaleDateString("ar-EG", { month: "2-digit", year: "numeric" });
  return invoicesR.filter(i => i.date.includes(m));
}

function reportYearly() {
  const y = new Date().getFullYear();
  return invoicesR.filter(i => i.date.includes(y));
}

/* ===== CALCULATIONS ===== */
function calcSummary(list) {
  let total = 0, profit = 0;
  list.forEach(i => {
    total += i.total;
    profit += i.profit || 0;
  });
  return { count: list.length, total, profit };
}

/* ===== RENDER ===== */
function renderReport(type = "daily") {
  let list = [];
  if (type === "daily") list = reportDaily();
  if (type === "monthly") list = reportMonthly();
  if (type === "yearly") list = reportYearly();

  const s = calcSummary(list);

  let html = `
    <div class="card">
      <b>عدد الفواتير:</b> ${s.count}<br>
      <b>إجمالي المبيعات:</b> ${formatMoney(s.total)}<br>
      <b>الأرباح:</b> ${formatMoney(s.profit)}
    </div>
  `;

  list.forEach(inv => {
    html += `
      <div class="card">
        <b>فاتورة #${inv.id}</b><br>
        ${inv.date}<br>
        الإجمالي: ${formatMoney(inv.total)}
      </div>
    `;
  });

  document.getElementById("reportBox").innerHTML = html;
}

/* ===== USERS ===== */
function listUsers() {
  let html = "";
  users.forEach(u => {
    html += `<div class="card">${u.username} - ${u.role}</div>`;
  });
  return html;
}

/* ===== DAILY CLOSE ===== */
function dailyClose() {
  const today = new Date().toLocaleDateString("ar-EG");
  localStorage.setItem("closedDay", today);
  alert("تم القفل اليومي بنجاح");
}

function isDayClosed() {
  const today = new Date().toLocaleDateString("ar-EG");
  return localStorage.getItem("closedDay") === today;
}
