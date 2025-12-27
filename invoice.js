/* ===============================
   حفظ + طباعة الفاتورة
   =============================== */

/* حفظ الفاتورة ثم الطباعة */
function saveAndPrint() {
    if (!cart || cart.length === 0) {
        alert("الفاتورة فارغة");
        return;
    }

    const total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);

    const invoice = {
        id: generateId(invoices),
        date: new Date().toLocaleString("ar-EG"),
        items: JSON.parse(JSON.stringify(cart)),
        total: total
    };

    invoices.push(invoice);
    saveInvoices();

    // طباعة
    printInvoice(invoice);

    // تفريغ السلة
    cart = [];
    renderInvoice();
}

/* نافذة الطباعة */
function printInvoice(invoice) {
    let printWindow = window.open("", "", "width=300,height=600");

    let rows = invoice.items.map(i => `
        <tr>
            <td>${i.name}</td>
            <td>${i.qty}</td>
            <td>${i.price}</td>
            <td>${i.qty * i.price}</td>
        </tr>
    `).join("");

    printWindow.document.write(`
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
            <title>فاتورة</title>
            <style>
                body {
                    font-family: Tahoma;
                    font-size: 12px;
                    margin: 0;
                    padding: 10px;
                }
                h3 {
                    text-align: center;
                    margin-bottom: 10px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    border-bottom: 1px dashed #000;
                    padding: 4px;
                    text-align: center;
                }
                .total {
                    font-weight: bold;
                    margin-top: 10px;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <h3>فاتورة بيع</h3>
            <div>رقم: ${invoice.id}</div>
            <div>تاريخ: ${invoice.date}</div>

            <table>
                <thead>
                    <tr>
                        <th>الصنف</th>
                        <th>كمية</th>
                        <th>سعر</th>
                        <th>إجمالي</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>

            <div class="total">الإجمالي: ${invoice.total} ج</div>
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
}
