// ===== SETTINGS =====

// تحميل البيانات
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("storeName").value =
    localStorage.getItem("storeName") || "";

  document.getElementById("storePhone").value =
    localStorage.getItem("storePhone") || "";

  document.getElementById("barcodeSound").checked =
    localStorage.getItem("barcodeSound") !== "off";

  renderCashiers();
});

// حفظ بيانات المحل
function saveStore() {
  localStorage.setItem("storeName", storeName.value);
  localStorage.setItem("storePhone", storePhone.value);
  alert("تم الحفظ");
}

// ===== CASHIERS =====
function addCashier() {
  const name = cashierName.value.trim();
  const phone = cashierPhone.value.trim();
  if (!name || !phone) return alert("أكمل البيانات");

  const cashiers = JSON.parse(localStorage.getItem("cashiers")) || [];
  cashiers.push({ name, phone });
  localStorage.setItem("cashiers", JSON.stringify(cashiers));

  cashierName.value = "";
  cashierPhone.value = "";
  renderCashiers();
}

function renderCashiers() {
  const list = document.getElementById("cashiersList");
  const cashiers = JSON.parse(localStorage.getItem("cashiers")) || [];
  list.innerHTML = "";

  cashiers.forEach(c =>
    list.innerHTML += `<li>${c.name} - ${c.phone}</li>`
  );
}

// ===== BARCODE SOUND =====
document.getElementById("barcodeSound").addEventListener("change", e => {
  localStorage.setItem("barcodeSound", e.target.checked ? "on" : "off");
});
