// ===== AUTH GUARD =====

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  location.href = "login.html";
}
if (!localStorage.getItem("loggedUser")) {
  location.href = "login.html";
}

function logout() {
  localStorage.removeItem("loggedUser");
}
let currentUser = JSON.parse(localStorage.getItem("loggedUser"));

if (!currentUser) {
  window.location.href = "login.html";
}
