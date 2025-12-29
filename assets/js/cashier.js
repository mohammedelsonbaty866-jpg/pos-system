/* =====================================
   CASHIER / INVOICE LOGIC
   Add items - Barcode - Total - Save
   ===================================== */

let invoice = [];

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderProductsGrid();
  setupBarcodeScanner();
  renderInvoice();
});

/* ---------- ADD TO INVOICE ---------- */
function addToInvoice(productId) {
  const products = getProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existing = invoice.find(item => item.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    invoice.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1
    });
  }

  playBeep();
  renderInvoice();
}

/* ---------- REMOVE ITEM ---------- */
function removeFromInvoice(id) {
  invoice = invoice.filter(item => item.id !== id);
  renderInvoice();
}

/* ---------- CHANGE QTY ---------- */
function changeQty(id, delta) {
  const item = invoice.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromInvoice(id);
    return;
  }

  renderInvoice();
}

/* ---------- RENDER INVOICE ---------- */
function renderInvoice() {
  const container = document.getElementById("invoiceItems");
  const totalEl = document.getElementById("total");

  if (!container || !totalEl) return;

  container.innerHTML = "";
  let total = 0;

  invoice.forEach(item => {
    const row = document.createElement("div");
    row.className = "invoice-row";

    const lineTotal = item.price * item.qty;
    total += lineTotal;

    row.innerHTML = `
      <span>${item.name}</span>
      <div class="qty-controls">
        <button onclick="changeQty('${item.id}', -1)">-</button>
        <strong>${item.qty}</strong>
        <button onclick="changeQty('${item.id}', 1)">+</button>
      </div>
      <span>${lineTotal} ج</span>
      <button onclick="removeFromInvoice('${item.id}')">✕</button>
    `;

    container.appendChild(row);
  });

  totalEl.textContent = total + " ج";
}

/* ---------- CLEAR ---------- */
function clearInvoice() {
  if (!invoice.length) return;
  if (!confirm("تفريغ الفاتورة؟")) return;
  invoice = [];
  renderInvoice();
}

/* ---------- SAVE INVOICE ---------- */
function saveInvoice() {
  if (!invoice.length) {
    alert("الفاتورة فارغة");
    return;
  }

  const invoices = getInvoices();
  invoices.push({
    id: generateID("INV"),
    date: new Date().toISOString(),
    items: invoice,
    total: invoice.reduce((s, i) => s + i.price * i.qty, 0)
  });

  saveInvoices(invoices);
  invoice = [];
  renderInvoice();
  alert("تم حفظ الفاتورة");
}

/* ---------- BARCODE SUPPORT ---------- */
let barcodeBuffer = "";
let barcodeTimer = null;

function setupBarcodeScanner() {
  document.addEventListener("keydown", e => {
    if (barcodeTimer) clearTimeout(barcodeTimer);

    if (e.key === "Enter") {
      handleBarcode(barcodeBuffer);
      barcodeBuffer = "";
      return;
    }

    if (e.key.length === 1) {
      barcodeBuffer += e.key;
    }

    barcodeTimer = setTimeout(() => {
      barcodeBuffer = "";
    }, 300);
  });
}

function handleBarcode(code) {
  const product = findProductByBarcode(code);
  if (product) {
    addToInvoice(product.id);
  }
}

/* ---------- SOUND ---------- */
function playBeep() {
  const audio = new Audio("assets/sounds/beep.mp3");
  audio.play();
}
