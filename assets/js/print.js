function printInvoice(invoice) {
  let rows = "";

  invoice.items.forEach(i => {
    rows += `
      <tr>
        <td>${i.name}</td>
        <td>${i.price} ج</td>
      </tr>
    `;
  });

  const w = window.open("", "", "width=400,height=600");

  w.document.write(`
    <html lang="ar" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <title>فاتورة</title>
      <style>
        body{font-family:Arial;padding:10px}
        h3{text-align:center}
        table{width:100%;border-collapse:collapse}
        td,th{border:1px solid #000;padding:6px;text-align:center}
        .total{margin-top:10px;font-weight:bold;text-align:center}
      </style>
    </head>
    <body>
      <h3>فاتورة بيع</h3>
      <p>التاريخ: ${invoice.date}</p>

      <table>
        <tr><th>الصنف</th><th>السعر</th></tr>
        ${rows}
      </table>

      <div class="total">الإجمالي: ${invoice.total} ج</div>

      <p style="text-align:center">شكراً لزيارتكم</p>
    </body>
    </html>
  `);

  w.document.close();
  w.print();
}
