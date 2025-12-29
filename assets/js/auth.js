function login() {
  const phone = document.getElementById("phone").value.trim();
  const error = document.getElementById("error");

  if (!phone) {
    error.innerText = "أدخل رقم الهاتف";
    return;
  }

  const store = JSON.parse(localStorage.getItem("store"));
  const cashiers = JSON.parse(localStorage.getItem("cashiers")) || [];

  // صاحب المتجر
  if (store && store.phone === phone) {
    localStorage.setItem("currentUser", JSON.stringify({
      role: "owner",
      phone
    }));
    window.location.href = "index.html";
    return;
  }

  // كاشير
  const cashier = cashiers.find(c => c.phone === phone);
  if (cashier) {
    localStorage.setItem("currentUser", JSON.stringify({
      role: "cashier",
      name: cashier.name,
      phone
    }));
    window.location.href = "index.html";
    return;
  }

  error.innerText = "رقم الهاتف غير مسجل";
}
