// ===== BARCODE SYSTEM =====

let barcodeBuffer = "";
let barcodeTimeout = null;

// صوت الباركود
const barcodeSound = new Audio("assets/sounds/beep.mp3");

document.addEventListener("keydown", (e) => {
  if (barcodeTimeout) clearTimeout(barcodeTimeout);

  if (e.key === "Enter") {
    if (barcodeBuffer.length >= 3) {
      handleBarcode(barcodeBuffer);
      barcodeBuffer = "";
    }
    return;
  }

  if (e.key.length === 1) {
    barcodeBuffer += e.key;
  }

  barcodeTimeout = setTimeout(() => {
    barcodeBuffer = "";
  }, 200);
});

function handleBarcode(code) {
  const product = products.find(p => p.barcode === code);

  if (product) {
    addToInvoice(product.id);
    barcodeSound.play();
  } else {
    alert("❌ باركود غير موجود");
  }
}
