const Auth = {
  login(username, password) {
    const user = Users.login(username, password);
    if (!user) return false;

    Storage.set("currentUser", user);
    return true;
  },

  register(username, password, role = "cashier") {
    if (Users.exists(username)) return false;

    Users.register({ username, password, role });
    return true;
  },

  logout() {
    Storage.remove("currentUser");
    location.href = "login.html";
  },

  user() {
    return Storage.get("currentUser");
  }
};
