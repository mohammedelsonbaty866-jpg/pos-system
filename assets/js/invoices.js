let invoices = JSON.parse(localStorage.getItem("invoices") || "[]");

function saveInvoice(cart) {
  if (cart.length === 0) {
    alert("الفاتورة فاضية");
    return;
  }

  const total = cart.reduce((s, i) => s + i.price, 0);

  const invoice = {
    id: Date.now(),
    date: new Date().toLocaleString("ar-EG"),
    items: cart,
    total
  };

  invoices.push(invoice);
  localStorage.setItem("invoices", JSON.stringify(invoices));

  alert("تم حفظ الفاتورة");
  printInvoice(invoice);
}
