// مصفوفة لتخزين المرتجعات
let returns = JSON.parse(localStorage.getItem("returns")) || [];

// عند فتح الصفحة
document.addEventListener("DOMContentLoaded", renderReturns);

// إضافة مرتجع جديد
function addReturn() {
  const name = document.getElementById("returnName").value.trim();
  const qty = document.getElementById("returnQty").value;
  const reason = document.getElementById("returnReason").value.trim();

  if (name === "" || qty === "" || reason === "") {
    alert("من فضلك اكمل كل البيانات");
    return;
  }

  const newReturn = {
    id: Date.now(),
    name,
    qty,
    reason,
    date: new Date().toLocaleString("ar-EG")
  };

  returns.push(newReturn);
  localStorage.setItem("returns", JSON.stringify(returns));

  clearInputs();
  renderReturns();
}

// عرض المرتجعات في الجدول
function renderReturns() {
  const table = document.getElementById("returnsTable");
  table.innerHTML = "";

  returns.forEach((item, index) => {
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>${item.reason}</td>
        <td>${item.date}</td>
      </tr>
    `;
  });
}

// مسح الحقول
function clearInputs() {
  document.getElementById("returnName").value = "";
  document.getElementById("returnQty").value = "";
  document.getElementById("returnReason").value = "";
}
