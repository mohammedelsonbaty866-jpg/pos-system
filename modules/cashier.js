/* ===============================
   CASHIER MODULE
   =============================== */

/* ===== DATA ===== */
let products = JSON.parse(localStorage.getItem("products") || "[]");
let invoices = JSON.parse(localStorage.getItem("invoices") || "[]");
let cart = [];

/* ===== ADD TO CART ===== */
function addToCart(productId) {
  const product = products.find(p => p.id === productId);

  if (!product) return;
  if (product.stock <= 0) {
    alert("❌ نفاد المخزون");
    return;
  }

  const item = cart.find(i => i.id === productId);

  if (item) {
    item.qty++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1
    });
  }

  product.stock--;
  saveProducts();
  renderInvoice();
}

/* ===== REMOVE ITEM ===== */
function removeFromCart(productId) {
  const index = cart.findIndex(i => i.id === productId);
  if (index === -1) return;

  const item = cart[index];
  const product = products.find(p => p.id === productId);

  if (product) product.stock += item.qty;

  cart.splice(index, 1);
  saveProducts();
  renderInvoice();
}

/* ===== RENDER INVOICE ===== */
function renderInvoice() {
  const container = document.getElementById("invoiceItems");
  const totalBox = document.getElementById("total");

  if (!container || !totalBox) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const lineTotal = item.qty * item.price;
    total += lineTotal;

    container.innerHTML += `
      <div class="invoice-item">
        <b>${item.name}</b>
        <div>${item.qty} × ${item.price}</div>
        <div>${lineTotal} جنيه</div>
        <button onclick="removeFromCart(${item.id})">✖</button>
      </div>
    `;
  });

  totalBox.innerText = "الإجمالي: " + total + " جنيه";
}

/* ===== SAVE INVOICE ===== */
function saveInvoice(paymentType = "cash") {
  if (cart.length === 0) {
    alert("⚠️ الفاتورة فارغة");
    return;
  }

  const invoice = {
    id: invoices.length + 1,
    date: new Date().toLocaleString(),
    items: cart,
    total: cart.reduce((s, i) => s + i.price * i.qty, 0),
    payment: paymentType,
    user: JSON.parse(localStorage.getItem("loggedUser")).username
  };

  invoices.push(invoice);
  localStorage.setItem("invoices", JSON.stringify(invoices));

  cart = [];
  renderInvoice();
  alert("✅ تم حفظ الفاتورة");
}

/* ===== HELPERS ===== */
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}
