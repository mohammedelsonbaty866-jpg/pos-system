const invoices = JSON.parse(localStorage.getItem("invoices")) || [];
let currentInvoice = null;

function loadInvoice() {
  const no = document.getElementById("invoiceNo").value;
  currentInvoice = invoices.find(i => i.no == no);

  if (!currentInvoice) return alert("الفاتورة غير موجودة");

  let html = `<h3>إجمالي: ${currentInvoice.total} ج</h3><ul>`;
  currentInvoice.items.forEach((it, idx) => {
    html += `
      <li>
        ${it.name} - ${it.qty}
        <input type="number" min="0" max="${it.qty}" value="${it.qty}" id="r${idx}">
      </li>`;
  });
  html += `</ul>`;
  document.getElementById("invoiceDetails").innerHTML = html;
}

function processReturn() {
  if (!currentInvoice) return;

  let refund = 0;
  currentInvoice.items.forEach((it, idx) => {
    const qty = +document.getElementById("r"+idx).value;
    refund += qty * it.price;
    it.qty -= qty;
  });

  currentInvoice.total -= refund;
  localStorage.setItem("invoices", JSON.stringify(invoices));
  alert("تم المرتجع بقيمة " + refund + " ج");
}
