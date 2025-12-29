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
let barcodeTimer = null;

function handleBarcodeInput(e) {
  clearTimeout(barcodeTimer);

  barcodeTimer = setTimeout(() => {
    const val = e.target.value.trim();
    if (!val) return;

    // حاول بالباركود
    let product = products.find(p => p.barcode === val);

    // لو مش لاقي، ابحث بالاسم
    if (!product) {
      product = products.find(p =>
        p.name.toLowerCase().includes(val.toLowerCase())
      );
    }

    if (product) {
      addToCart(product);
      playBeep();
      e.target.value = "";
    }
  }, 150);
}

function playBeep() {
  const sound = document.getElementById("beepSound");
  if (sound) sound.play();
}
