const Users = {
  key: "pos_users",

  getAll() {
    return Storage.get(this.key) || [];
  },

  save(users) {
    Storage.set(this.key, users);
  },

  exists(username) {
    return this.getAll().some(u => u.username === username);
  },

  register(user) {
    const users = this.getAll();
    users.push(user);
    this.save(users);
  },

  login(username, password) {
    return this.getAll().find(
      u => u.username === username && u.password === password
    );
  }
};
