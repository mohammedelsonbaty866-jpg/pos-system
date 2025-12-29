// ===== DATA STORAGE =====

let products = JSON.parse(localStorage.getItem("products")) || [
  { id: 1, name: "كوكاكولا", price: 10, barcode: "6221234567890" },
  { id: 2, name: "بيبسي", price: 10, barcode: "6229876543210" }
];

function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}
let currentUser = JSON.parse(localStorage.getItem("loggedUser"));

if (!currentUser) {
  window.location.href = "login.html";
}
