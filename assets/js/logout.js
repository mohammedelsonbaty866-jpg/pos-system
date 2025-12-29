function logout(){
  localStorage.removeItem("pos_current_user");
  window.location.href = "login.html";
}
