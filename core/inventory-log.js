const InventoryLog = {
  key: "pos_inventory_log",

  add(type, name, qty) {
    const log = Storage.get(this.key) || [];
    log.push({
      type,
      name,
      qty,
      date: new Date().toLocaleString()
    });
    Storage.set(this.key, log);
  },

  getAll() {
    return Storage.get(this.key) || [];
  }
};
