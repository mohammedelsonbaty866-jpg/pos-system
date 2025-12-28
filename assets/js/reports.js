let invoices = JSON.parse(localStorage.getItem("invoices") || "[]");

function dailyReport() {
  const today = new Date().toLocaleDateString("ar-EG");
  const list = invoices.filter(i =>
    i.date.includes(today)
  );
  renderReport(list, "تقرير اليوم");
}

function monthlyReport() {
  const month = new Date().toLocaleDateString("ar-EG").slice(3, 5);
  const list = invoices.filter(i =>
    i.date.slice(3, 5) === month
  );
  renderReport(list, "تقرير الشهر");
}

function allReport() {
  renderReport(invoices, "تقرير إجمالي");
}

function renderReport(list, title) {
  const box = document.getElementById("reportResult");
  let total = 0;

  box.innerHTML = `<h3>${title}</h3>`;

  if (list.length === 0) {
    box.innerHTML += "<p>لا توجد بيانات</p>";
    return;
  }

  list.forEach((i, index) => {
    total += i.total;
    box.innerHTML += `
      <div style="border:1px solid #ccc;padding:6px;margin:4px">
        فاتورة #${index + 1} — ${i.date}<br>
        الإجمالي: ${i.total} ج
      </div>
    `;
  });

  box.innerHTML += `<h4>الإجمالي الكلي: ${total} ج</h4>`;
}
