let invoice = [];

function addToInvoice(product) {
  invoice.push(product);
  renderInvoice();
}

function renderInvoice() {
  invoiceItems.innerHTML = "";
  let total = 0;

  invoice.forEach(p => {
    total += p.price;
    const div = document.createElement("div");
    div.innerText = `${p.name} - ${p.price}ج`;
    invoiceItems.appendChild(div);
  });

  totalEl = document.getElementById("total");
  totalEl.innerText = total;
}

function clearInvoice() {
  invoice = [];
  renderInvoice();
}
