// auth/login.js

import { ROLES } from "./roles.js";

// مستخدمين افتراضيين (بعد كده نربطها بقاعدة بيانات)
const USERS = [
  {
    username: "admin",
    password: "1234",
    role: ROLES.ADMIN
  },
  {
    username: "cashier",
    password: "1234",
    role: ROLES.CASHIER
  }
];

// تسجيل دخول
export function login(username, password) {
  const user = USERS.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return { success: false, message: "بيانات الدخول غير صحيحة" };
  }

  // حفظ الجلسة
  localStorage.setItem("session", JSON.stringify({
    username: user.username,
    role: user.role,
    loginAt: new Date().toISOString()
  }));

  return { success: true, role: user.role };
}

// جلب الجلسة
export function getSession() {
  return JSON.parse(localStorage.getItem("session"));
}

// تسجيل خروج
export function logout() {
  localStorage.removeItem("session");
  location.reload();
}

// هل المستخدم مسجل؟
export function isLoggedIn() {
  return !!localStorage.getItem("session");
}
