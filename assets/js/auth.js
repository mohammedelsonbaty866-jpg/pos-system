/*************************************************
 * AUTH SYSTEM
 * تسجيل دخول + إنشاء حساب
 * ربط برقم الهاتف
 *************************************************/

// عناصر الصفحة
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const msg = document.getElementById("msg");

// جلب المستخدمين
let users = JSON.parse(localStorage.getItem("users")) || [];

// =====================
// تسجيل الدخول
// =====================
function login() {
  const phone = phoneInput.value.trim();
  const password = passwordInput.value.trim();

  if (!phone || !password) {
    showMsg("❌ أدخل رقم الهاتف وكلمة المرور");
    return;
  }

  const user = users.find(
    u => u.phone === phone && u.password === password
  );

  if (!user) {
    showMsg("❌ بيانات الدخول غير صحيحة");
    return;
  }

  // حفظ المستخدم الحالي
  localStorage.setItem("currentUser", JSON.stringify(user));

  showMsg("✅ تم تسجيل الدخول");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 800);
}

// =====================
// إنشاء حساب جديد
// =====================
function register() {
  const phone = phoneInput.value.trim();
  const password = passwordInput.value.trim();

  if (!phone || !password) {
    showMsg("❌ أدخل رقم الهاتف وكلمة المرور");
    return;
  }

  const exists = users.find(u => u.phone === phone);
  if (exists) {
    showMsg("❌ هذا الرقم مسجل بالفعل");
    return;
  }

  const newUser = {
    id: Date.now(),
    phone: phone,
    password: password,
    role: "owner",       // صاحب الحساب
    createdAt: new Date().toLocaleString()
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // تسجيل دخول تلقائي
  localStorage.setItem("currentUser", JSON.stringify(newUser));

  showMsg("✅ تم إنشاء الحساب");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 800);
}

// =====================
// رسائل
// =====================
function showMsg(text) {
  msg.innerText = text;
}
