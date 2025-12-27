/* ===============================
   إدارة البيانات – POS SYSTEM
   =============================== */

/* تحميل البيانات من التخزين */
let products = JSON.parse(localStorage.getItem("products")) || [
    { id: 1, name: "سكر", price: 10 },
    { id: 2, name: "أرز", price: 15 },
    { id: 3, name: "زيت", price: 25 },
    { id: 4, name: "شاي", price: 20 }
];

let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

/* حفظ البيانات */
function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

function saveInvoices() {
    localStorage.setItem("invoices", JSON.stringify(invoices));
}

/* إنشاء ID جديد */
function generateId(list) {
    return list.length ? Math.max(...list.map(i => i.id)) + 1 : 1;
}
