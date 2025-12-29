const user = Storage.get("currentUser");

if (!user) {
  location.href = "login.html";
}
