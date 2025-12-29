const Invoices = {
  key: "pos_invoices",

  getAll() {
    return Storage.get(this.key) || [];
  },

  add(invoice) {
    const invoices = this.getAll();
    invoices.push(invoice);
    Storage.set(this.key, invoices);
  },

  byDate(date) {
    return this.getAll().filter(i =>
      i.date.startsWith(date)
    );
  }
};
