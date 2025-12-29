/***********************
 * DATA INITIALIZATION
 ***********************/

// إنشاء المتجر (صاحب البرنامج) لو مش موجود
if (!localStorage.getItem("store")) {
  localStorage.setItem(
    "store",
    JSON.stringify({
      name: "متجري",
      phone: "01000000000" // رقم صاحب المتجر
    })
  );
}

// إنشاء الكاشيرين (فارغة مبدئياً)
if (!localStorage.getItem("cashiers")) {
  localStorage.setItem("cashiers", JSON.stringify([]));
}

// إنشاء المنتجات الافتراضية
if (!localStorage.getItem("products")) {
  localStorage.setItem(
    "products",
    JSON.stringify([
      {
        id: 1,
        name: "مياه معدنية",
        price: 5,
        barcode: "111111"
      },
      {
        id: 2,
        name: "بيبسي",
        price: 10,
        barcode: "222222"
      },
      {
        id: 3,
        name: "شيبسي",
        price: 7,
        barcode: "333333"
      }
    ])
  );
}

// إنشاء الفواتير
if (!localStorage.getItem("invoices")) {
  localStorage.setItem("invoices", JSON.stringify([]));
}

/***********************
 * HELPERS
 ***********************/

function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

function getInvoices() {
  return JSON.parse(localStorage.getItem("invoices")) || [];
}

function saveInvoices(invoices) {
  localStorage.setItem("invoices", JSON.stringify(invoices));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}
