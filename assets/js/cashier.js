// ===== CASHIER =====

let invoice = [];
const beep = new Audio("assets/sounds/beep.mp3");

function playBeep() {
  if (localStorage.getItem("barcodeSound") !== "off") {
    beep.play();
  }
}

  invoice.push(product);
  beep.play();
  renderInvoice();
}

function renderInvoice() {
  const box = document.getElementById("invoiceItems");
  const totalBox = document.getElementById("total");

  box.innerHTML = "";
  let total = 0;

  invoice.forEach((item, i) => {
    total += item.price;
    box.innerHTML += `
      <div class="invoice-item">
        ${item.name} - ${item.price} ج
      </div>
    `;
  });

  totalBox.textContent = total + " ج";
}

// 🔍 بحث بالاسم أو الباركود
function searchProduct(value) {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = "";

  products
    .filter(p =>
      p.name.includes(value) || p.barcode === value
    )
    .forEach(p => {
      grid.innerHTML += `
        <div class="product-card" onclick="addToInvoice(${p.id})">
          <strong>${p.name}</strong>
          <span>${p.price} ج</span>
        </div>
      `;
    });
}

// 📷 مسح باركود (كأنه كيبورد)
let barcodeBuffer = "";
document.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const product = products.find(p => p.barcode === barcodeBuffer);
    if (product) addToInvoice(product.id);
    barcodeBuffer = "";
  } else {
    barcodeBuffer += e.key;
  }
});
