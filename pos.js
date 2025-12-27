/* ===============================
   منطق الكاشير – POS SYSTEM
   =============================== */

let cart = [];

/* تحميل الأصناف على الشاشة */
function loadProducts() {
    const list = document.getElementById("productsList");
    if (!list) return;

    list.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.onclick = () => addToCart(product.id);

        card.innerHTML = `
            <h3>${product.name}</h3>
            <span>${product.price} ج</span>
        `;

        list.appendChild(card);
    });
}

/* إضافة صنف للفاتورة */
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const item = cart.find(i => i.id === id);

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

/* عرض الفاتورة */
function renderInvoice() {
    const body = document.getElementById("invoiceBody");
    body.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        const rowTotal = item.qty * item.price;
        total += rowTotal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>${item.price}</td>
            <td>${rowTotal}</td>
            <td class="remove" onclick="removeItem(${index})">✖</td>
        `;

        body.appendChild(row);
    });

    document.getElementById("totalAmount").innerText = total;
}

/* حذف صنف */
function removeItem(index) {
    cart.splice(index, 1);
    renderInvoice();
}

/* تشغيل عند الفتح */
document.addEventListener("DOMContentLoaded", loadProducts);
