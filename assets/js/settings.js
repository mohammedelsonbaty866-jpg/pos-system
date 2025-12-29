// ===== SETTINGS PAGE =====

const owner = JSON.parse(localStorage.getItem("currentUser"));
const cashiers = JSON.parse(localStorage.getItem("cashiers")) || [];

document.getElementById("ownerPhone").innerText = owner.phone;

function renderCashiers() {
  const list = document.getElementById("cashiersList");
  list.innerHTML = "";

  cashiers.forEach((c, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${c}
      <button onclick="removeCashier(${index})">❌</button>
    `;
    list.appendChild(li);
  });
}

function addCashier() {
  const phone = document.getElementById("cashierPhone").value.trim();
  if (!phone) return alert("أدخل رقم الهاتف");

  cashiers.push(phone);
  localStorage.setItem("cashiers", JSON.stringify(cashiers));
  document.getElementById("cashierPhone").value = "";
  renderCashiers();
}

function removeCashier(index) {
  cashiers.splice(index, 1);
  localStorage.setItem("cashiers", JSON.stringify(cashiers));
  renderCashiers();
}

function logout() {
  localStorage.removeItem("currentUser");
  location.href = "login.html";
}

renderCashiers();
