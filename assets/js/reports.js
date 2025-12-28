let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

function render(invoicesList) {
  const table = document.getElementById("reportsTable");
  table.innerHTML = "";
  let total = 0;

  invoicesList.forEach((inv, i) => {
    let invoiceTotal = inv.items.reduce((a, b) => a + (b.price * b.qty), 0);
    total += invoiceTotal;

    table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${inv.date}</td>
        <td>${inv.items.length}</td>
        <td>${invoiceTotal}</td>
      </tr>
    `;
  });

  document.getElementById("grandTotal").textContent = total;
}

function loadAll() {
  render(invoices);
}

function loadToday() {
  const today = new Date().toLocaleDateString("ar-EG");
  const todayInvoices = invoices.filter(i =>
    i.date.includes(today)
  );
  render(todayInvoices);
}

function clearReports() {
  if (confirm("متأكد من مسح كل التقارير؟")) {
    localStorage.removeItem("invoices");
    invoices = [];
    render([]);
  }
}

loadAll();
