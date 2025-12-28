/* ===============================
   حماية النظام (Auth Guard)
   =============================== */

const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

if (!loggedUser) {
  // مش مسجل دخول
  window.location.href = "auth/login.html";
}

// متاح في كل البرنامج
window.CURRENT_USER = loggedUser;
