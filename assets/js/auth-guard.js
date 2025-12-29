// ===== AUTH GUARD =====

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  location.href = "login.html";
}
