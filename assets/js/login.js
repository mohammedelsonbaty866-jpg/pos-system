function login() {
  const phone = phoneInput.value;

  let admin = JSON.parse(localStorage.getItem("admin"));
  let cashiers = JSON.parse(localStorage.getItem("cashiers")) || [];

  if (admin && admin.phone === phone) {
    localStorage.setItem("loggedUser", JSON.stringify({
      name: admin.name,
      role: "admin"
    }));
    location.href = "index.html";
    return;
  }

  const cashier = cashiers.find(c => c.phone === phone);
  if (cashier) {
    localStorage.setItem("loggedUser", JSON.stringify({
      name: cashier.name,
      role: "cashier"
    }));
    location.href = "index.html";
    return;
  }

  alert("رقم غير مسجل");
}
