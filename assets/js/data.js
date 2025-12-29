/* ===============================
   DATA.JS
   إدارة البيانات والتخزين
================================ */

/* ===== المنتجات =====
   id   : رقم فريد
   name : اسم الصنف
   price: سعر البيع
*/
let products = JSON.parse(localStorage.getItem("products")) || [
  { id: 1, name: "سكر", price: 20 },
  { id: 2, name: "أرز", price: 25 },
  { id: 3, name: "زيت", price: 60 }
];

/* ===== الفواتير ===== */
let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

/* ===== حفظ البيانات ===== */
function saveData() {
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("invoices", JSON.stringify(invoices));
}
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}
/* ===== توليد ID جديد ===== */

// مستخدم افتراضي (أول مرة بس)
if (!localStorage.users) {
  localStorage.users = JSON.stringify([
    {
      username: "admin",
      password: "1234",
      role: "admin"
    },
    {
      username: "cashier",
      password: "1234",
      role: "cashier"
    }
  ]);
}

let users = JSON.parse(localStorage.users);

