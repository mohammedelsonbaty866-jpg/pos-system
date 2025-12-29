function register() {
  const u = registerUsername.value.trim();
  const p = registerPassword.value.trim();
  const msg = authMsg;

  if (!u || !p) {
    msg.innerText = "❌ أكمل البيانات";
    return;
  }

  const users = getUsers();
  if (users.find(x => x.username === u)) {
    msg.innerText = "❌ المستخدم موجود";
    return;
  }

  users.push({ username: u, password: p });
  saveUsers(users);
  msg.innerText = "✅ تم إنشاء الحساب";
}

function login() {
  const u = loginUsername.value.trim();
  const p = loginPassword.value.trim();
  const msg = authMsg;

  const users = getUsers();
  const user = users.find(x => x.username === u && x.password === p);

  if (!user) {
    msg.innerText = "❌ بيانات خاطئة";
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  location.href = "index.html";
}
