let products = JSON.parse(localStorage.products || "[]");
let invoices = JSON.parse(localStorage.invoices || "[]");

function saveData(){
  localStorage.products = JSON.stringify(products);
  localStorage.invoices = JSON.stringify(invoices);
}
