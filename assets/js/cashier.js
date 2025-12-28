let products = JSON.parse(localStorage.getItem("products")) || [];
let invoice = [];

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});

function loadProducts() {
  const select = document.getElementById("productSelect");
  select.innerHTML = "";

  products.forEach(p => {
    const option = document.createElement("option");
    option.value = p.id;
    option.textContent = `${p.name} - ${p.price}ج`;
    select.appendChild(option);
  });
}

function addToInvoice() {
  const productId = document.getElementById("productSelect").value;
  const qty = Number(document.getElementById("qty").value);

  if (qty <= 0) {
    alert("أدخل كمية صحيحة");
    return;
  }

  const product = products.find(p => p.id == productId);
  const existing = invoice.find(i => i.id == productId);

  if (existing) {
    existing.qty += qty;
  } else {
    invoice.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty
    });
  }

  renderInvoice();
}

function renderInvoice() {
  const table = document.getElementById("invoiceTable");
  table.innerHTML = "";
  let total = 0;

  invoice.forEach((item, i) => {
    const rowTotal = item.price * item.qty;
    total += rowTotal;

    table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.qty}</td>
        <td>${rowTotal}</td>
        <td>
          <button onclick="removeItem(${item.id})">🗑</button>
        </td>
      </tr>
    `;
  });

  document.getElementById("total").textContent = total;
}

function removeItem(id) {
  invoice = invoice.filter(i => i.id !== id);
  renderInvoice();
}

function saveInvoice() {
  if (invoice.length === 0) {
    alert("الفاتورة فارغة");
    return;
  }

  let invoices = JSON.parse(localStorage.getItem("invoices")) || [];
  invoices.push({
    id: Date.now(),
    date: new Date().toLocaleString("ar-EG"),
    items: invoice
  });

  localStorage.setItem("invoices", JSON.stringify(invoices));
  alert("تم حفظ الفاتورة ✅");

  invoice = [];
  renderInvoice();
}

function printInvoice() {
  window.print();
}
