function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  if (!username || !password) {
    error.innerText = "ادخل اسم المستخدم وكلمة المرور";
    return;
  }

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    error.innerText = "بيانات الدخول غير صحيحة";
    return;
  }

  localStorage.session = JSON.stringify({
    username: user.username,
    role: user.role,
    loginAt: Date.now()
  });

  window.location.href = "index.html";
}
