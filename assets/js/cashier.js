/************************
 * CASHIER MODULE
 * الفاتورة والكاشير
 ************************/

let cart = [];

/*
  شكل عنصر الفاتورة:
  {
    id,
    name,
    price,
    qty
  }
*/

/* ===== إضافة صنف للفاتورة ===== */
function addToCart(productId) {
  const product = getProductById(productId);
  if (!product) return;

  // صوت الباركود
  playBeep();

  const item = cart.find(i => i.id === productId);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1
    });
  }

  renderInvoice();
}

/* ===== عرض الفاتورة ===== */
function renderInvoice() {
  const box = document.getElementById("invoiceItems");
  const totalBox = document.getElementById("total");

  if (!box || !totalBox) return;

  box.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const row = document.createElement("div");
    row.className = "invoice-item";
    row.innerHTML = `
      <span>${item.name}</span>
      <span>${item.qty} × ${item.price}</span>
      <span>${item.qty * item.price} ج</span>
      <button onclick="removeItem(${index})">✖</button>
    `;
    box.appendChild(row);
  });

  totalBox.innerText = total + " ج";
}

/* ===== حذف صنف ===== */
function removeItem(index) {
  cart.splice(index, 1);
  renderInvoice();
}

/* ===== تفريغ الفاتورة ===== */
function clearInvoice() {
  if (!confirm("تفريغ الفاتورة؟")) return;
  cart = [];
  renderInvoice();
}

/* ===== حفظ الفاتورة ===== */
function saveInvoice() {
  if (cart.length === 0) {
    alert("الفاتورة فارغة");
    return;
  }

  const invoices = JSON.parse(localStorage.getItem("invoices")) || [];

  const invoice = {
    id: Date.now(),
    date: new Date().toLocaleString(),
    items: cart,
    total: cart.reduce((s, i) => s + i.price * i.qty, 0)
  };

  invoices.push(invoice);
  localStorage.setItem("invoices", JSON.stringify(invoices));

  // خصم من المخزون
  cart.forEach(i => updateStock(i.id, i.qty));

  cart = [];
  renderInvoice();

  alert("تم حفظ الفاتورة بنجاح");
}

/* ===== صوت الباركود ===== */
function playBeep() {
  const audio = new Audio(
    "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQgAAAAA"
  );
  audio.play();
}
