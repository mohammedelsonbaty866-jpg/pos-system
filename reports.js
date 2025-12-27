/* ===============================
   التقارير – POS SYSTEM
   =============================== */

/* إجمالي المبيعات */
function getTotalSales() {
    return invoices.reduce((sum, inv) => sum + inv.total, 0);
}

/* عدد الفواتير */
function getInvoicesCount() {
    return invoices.length;
}

/* مبيعات اليوم */
function getTodaySales() {
    const today = new Date().toLocaleDateString("ar-EG");

    return invoices
        .filter(inv => inv.date.includes(today))
        .reduce((sum, inv) => sum + inv.total, 0);
}

/* عرض تقرير بسيط (للاستخدام لاحقًا) */
function showReport() {
    alert(
        "📊 تقرير المبيعات\n\n" +
        "عدد الفواتير: " + getInvoicesCount() + "\n" +
        "مبيعات اليوم: " + getTodaySales() + " ج\n" +
        "إجمالي المبيعات: " + getTotalSales() + " ج"
    );
}
