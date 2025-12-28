/***********************
 * POS PRO - core.js
 ***********************/

/* ====== DATA ====== */
let cart = [];
let total = 0;

/* ====== SELECTORS ====== */
const products = document.querySelectorAll('.product');
const invoiceItems = document.querySelector('.invoice-items');
const totalElement = document.querySelector('.summary-row span:last-child');

const btnSave = document.querySelector('.save');
const btnPrint = document.querySelector('.print');
const btnClear = document.querySelector('.clear');

/* ====== ADD PRODUCT ====== */
products.forEach(product => {
  product.addEventListener('click', () => {
    const name = product.querySelector('h4').innerText;
    const price = parseFloat(
      product.querySelector('span').innerText.replace(' ج', '')
    );

    addToCart(name, price);
  });
});

/* ====== CART FUNCTIONS ====== */
function addToCart(name, price) {
  const item = cart.find(p => p.name === name);

  if (item) {
    item.qty++;
    item.total = item.qty * item.price;
  } else {
    cart.push({
      name,
      price,
      qty: 1,
      total: price
    });
  }

  renderInvoice();
}

function renderInvoice() {
  invoiceItems.innerHTML = '';
  total = 0;

  cart.forEach(item => {
    total += item.total;

    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <span>${item.name} × ${item.qty}</span>
      <span>${item.total} ج</span>
    `;

    invoiceItems.appendChild(div);
  });

  totalElement.innerText = `${total} ج`;
}

/* ====== SAVE INVOICE ====== */
btnSave.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('الفاتورة فاضية');
    return;
  }

  const invoice = {
    id: Date.now(),
    date: new Date().toLocaleString('ar-EG'),
    items: cart,
    total
  };

  const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
  invoices.push(invoice);
  localStorage.setItem('invoices', JSON.stringify(invoices));

  alert('تم حفظ الفاتورة بنجاح ✅');
  clearInvoice();
});

/* ====== PRINT ====== */
btnPrint.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('لا توجد فاتورة للطباعة');
    return;
  }

  window.print();
});

/* ====== CLEAR ====== */
btnClear.addEventListener('click', clearInvoice);

function clearInvoice() {
  cart = [];
  total = 0;
  invoiceItems.innerHTML = '';
  totalElement.innerText = '0 ج';
}

/* ====== AUTO UPDATE (PWA READY) ====== */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload();
  });
}
