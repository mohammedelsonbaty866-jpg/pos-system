let returns = JSON.parse(localStorage.getItem("returns") || "[]");
let products = JSON.parse(localStorage.getItem("products") || "[]");

function addReturn() {
  const name = document.getElementById("returnName").value;
  const qty = Number(document.getElementById("returnQty").value);
  const reason = document.getElementById("returnReason").value;

  if (!name || qty <= 0) {
    alert("بيانات غير صحيحة");
    return;
  }

  const product = products.find(p => p.name === name);
  if (!product) {
    alert("الصنف غير موجود");
    return;
  }

  // رجوع للمخزون
  product.stock += qty;

  returns.push({
    id: Date.now(),
    name,
    qty,
    reason,
    date: new Date().toLocaleString("ar-EG")
  });

  localStorage.setItem("returns", JSON.stringify(returns));
  localStorage.setItem("products", JSON.stringify(products));

  document.getElementById("returnName").value = "";
  document.getElementById("returnQty").value = "";
  document.getElementById("returnReason").value = "";

  renderReturns();
}
function renderReturns() {
  const table = document.getElementById("returnsTable");
  if (!table) return;

  table.innerHTML = "";
  returns.forEach((r, i) => {
    table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${r.name}</td>
        <td>${r.qty}</td>
        <td>${r.reason || "-"}</td>
        <td>${r.date}</td>
      </tr>
    `;
  });
}

renderReturns();
