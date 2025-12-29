const Products = {
  key: "pos_products",

  getAll() {
    return Storage.get(this.key) || [];
  },

  save(list) {
    Storage.set(this.key, list);
  },

  add(p) {
    const products = this.getAll();
    products.push(p);
    this.save(products);
  },

  update(index, data) {
    const products = this.getAll();
    products[index] = {...products[index], ...data};
    this.save(products);
  }
};
