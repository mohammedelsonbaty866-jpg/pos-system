const storeNameInput = document.getElementById("storeName");
const storePhoneInput = document.getElementById("storePhone");
const cashiersList = document.getElementById("cashiersList");

let store = JSON.parse(localStorage.getItem("store")) || {};
let cashiers = JSON.parse(localStorage.getItem("cashiers")) || [];

storeNameInput.value = store.name || "";
storePhoneInput.value = store.phone || "";

function saveStore() {
  store = {
    name: storeNameInput.value,
    phone: storePhoneInput.value
  };
  localStorage.setItem("store", JSON.stringify(store));
  alert("تم حفظ بيانات المتجر");
}

function addCashier() {
  const name = document.getElementById("cashierName").value;
  const phone = document.getElementById("cashierPhone").value;

  if (!name || !phone) {
    alert("أدخل البيانات كاملة");
    return;
  }

  cashiers.push({ name, phone });
  localStorage.setItem("cashiers", JSON.stringify(cashiers));

  document.getElementById("cashierName").value = "";
  document.getElementById("cashierPhone").value = "";

  renderCashiers();
}

function renderCashiers() {
  cashiersList.innerHTML = "";
  cashiers.forEach((c, i) => {
    cashiersList.innerHTML += `
      <li>
        ${c.name} - ${c.phone}
        <button onclick="removeCashier(${i})">✖</button>
      </li>
    `;
  });
}

function removeCashier(index) {
  cashiers.splice(index, 1);
  localStorage.setItem("cashiers", JSON.stringify(cashiers));
  renderCashiers();
}

renderCashiers();
