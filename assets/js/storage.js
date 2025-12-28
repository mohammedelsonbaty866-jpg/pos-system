/* ================= STORAGE ================= */

const Storage = {

  get(key){
    return JSON.parse(localStorage.getItem(key) || "[]");
  },

  set(key, value){
    localStorage.setItem(key, JSON.stringify(value));
  },

  add(key, item){
    const data = this.get(key);
    data.push(item);
    this.set(key, data);
  },

  update(key, index, item){
    const data = this.get(key);
    data[index] = item;
    this.set(key, data);
  },

  remove(key, index){
    const data = this.get(key);
    data.splice(index, 1);
    this.set(key, data);
  }

};

/* ===== DATA KEYS ===== */
const DB = {
  products: "pos_products",
  invoices: "pos_invoices"
};
