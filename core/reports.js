const Reports = {

  daily(date) {
    const invoices = Invoices.byDate(date);
    return this.summary(invoices);
  },

  monthly(year, month) {
    const invoices = Invoices.getAll().filter(i =>
      i.date.startsWith(`${year}-${month}`)
    );
    return this.summary(invoices);
  },

  yearly(year) {
    const invoices = Invoices.getAll().filter(i =>
      i.date.startsWith(year)
    );
    return this.summary(invoices);
  },

  summary(invoices) {
    let total = 0;
    let items = {};
    
    invoices.forEach(inv => {
      total += inv.total;
      inv.items.forEach(it => {
        items[it.name] = (items[it.name] || 0) + it.qty;
      });
    });

    const bestItem = Object.keys(items).sort(
      (a,b)=>items[b]-items[a]
    )[0] || "-";

    return {
      count: invoices.length,
      total,
      bestItem
    };
  }
};
