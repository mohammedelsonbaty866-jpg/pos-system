let settings = JSON.parse(localStorage.getItem("settings")) || {};
let cashiers = JSON.parse(localStorage.getItem("cashiers")) || [];

function saveSettings() {
  settings.shopName = document.getElementById("shopName").value;
  settings.shopPhone = document.getElementById("shopPhone").value;

  localStorage.setItem("settings", JSON.stringify(settings));
  alert("تم حفظ الإعدادات");
}

function addCashier() {
  const name = document.getElementById("cashierName").value;
  const phone = document.getElementById("cashierPhone").value;

  if (!name || !phone) return alert("أكمل البيانات");

  cashiers.push({ name, phone });
  localStorage.setItem("cashiers", JSON.stringify(cashiers));
  renderCashiers();
}

function renderCashiers() {
  const box = document.getElementById("cashiersList");
  box.innerHTML = "";
  cashiers.forEach(c => {
    box.innerHTML += `<div>👤 ${c.name} - ${c.phone}</div>`;
  });
}

renderCashiers();
