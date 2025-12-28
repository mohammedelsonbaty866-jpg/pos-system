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

/* ===== توليد ID جديد ===== */
function generateId(list) {
  if (list.length === 0) return 1;
  return Math.max(...list.map(i => i.id)) + 1;
}
