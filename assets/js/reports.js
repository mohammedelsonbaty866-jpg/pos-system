// ===== DATA =====
const invoices = JSON.parse(localStorage.getItem("invoices")) || [];

// ===== DAILY =====
function dailyReport() {
  const today = new Date().toLocaleDateString();
  const todayInvoices = invoices.filter(i =>
    new Date(i.date).toLocaleDateString() === today
  );

  let total = 0;
  todayInvoices.forEach(i => total += i.total);

  document.getElementById("dailyResult").innerHTML = `
    عدد الفواتير: ${todayInvoices.length}<br>
    إجمالي المبيعات: ${total} ج
  `;
}

// ===== MONTHLY =====
function monthlyReport() {
  const month = document.getElementById("monthInput").value;
  if (!month) return alert("اختر شهر");

  let total = 0;
  let count = 0;

  invoices.forEach(i => {
    if (i.date.startsWith(month)) {
      total += i.total;
      count++;
    }
  });

  document.getElementById("monthlyResult").innerHTML = `
    عدد الفواتير: ${count}<br>
    إجمالي المبيعات: ${total} ج
  `;
}

// ===== TOP PRODUCTS =====
function topProducts() {
  const map = {};

  invoices.forEach(inv => {
    inv.items.forEach(it => {
      map[it.name] = (map[it.name] || 0) + it.qty;
    });
  });

  const sorted = Object.entries(map)
    .sort((a,b)=>b[1]-a[1])
    .slice(0,5);

  const list = document.getElementById("topProductsList");
  list.innerHTML = "";

  sorted.forEach(p =>
    list.innerHTML += `<li>${p[0]} - ${p[1]}</li>`
  );
}
let invoices = JSON.parse(localStorage.getItem("invoices")) || [];
let user = JSON.parse(localStorage.getItem("loggedUser"));

function renderReport() {
  const box = document.getElementById("reportBox");
  box.innerHTML = "";

  let data =
    user.role === "admin"
      ? invoices
      : invoices.filter(i => i.user === user.name);

  let total = 0;

  data.forEach(inv => {
    total += inv.total;
    box.innerHTML += `
      <div class="card">
        👤 ${inv.user}<br>
        💰 ${inv.total} ج<br>
        🕒 ${inv.date}
      </div>
    `;
  });

  box.innerHTML += `<h3>الإجمالي: ${total} ج</h3>`;
}
