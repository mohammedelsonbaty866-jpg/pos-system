// auth/auth.service.js

import { ROLES } from "./roles.js";

const USERS_KEY = "pos_users";
const SESSION_KEY = "pos_session";

// مستخدمين افتراضيين (أول مرة)
const defaultUsers = [
  { username: "admin", password: "1234", role: ROLES.ADMIN },
  { username: "cashier", password: "1234", role: ROLES.CASHIER }
];

// تجهيز المستخدمين أول مرة
function initUsers() {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
}

// تسجيل دخول
export function login(username, password) {
  initUsers();

  const users = JSON.parse(localStorage.getItem(USERS_KEY));
  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) return false;

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({
      username: user.username,
      role: user.role,
      time: Date.now()
    })
  );

  return true;
}

// تسجيل خروج
export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

// المستخدم الحالي
export function getCurrentUser() {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
}

// هل مسجل دخول؟
export function isLoggedIn() {
  return !!getCurrentUser();
}
