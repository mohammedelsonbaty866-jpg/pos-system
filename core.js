/*************************************************
 * Accounting POS Core Engine (Strict Reference)
 * Version: 1.0
 * Authoritative Business Logic Only
 *************************************************/

/* ========= Utilities ========= */
const Utils = {
  uuid() {
    return crypto.randomUUID();
  },
  now() {
    return new Date().toISOString();
  },
  assert(cond, msg) {
    if (!cond) throw new Error(msg);
  }
};

/* ========= Storage Layer ========= */
const Storage = {
  key: "ACCOUNTING_CORE_V1",

  load() {
    const raw = localStorage.getItem(this.key);
    if (!raw) return this.defaultData();
    const data = JSON.parse(raw);
    this.validate(data);
    return data;
  },

  save(data) {
    this.validate(data);
    localStorage.setItem(this.key, JSON.stringify(data));
  },

  backup() {
    return JSON.stringify(this.load());
  },

  restore(json) {
    const data = JSON.parse(json);
    this.validate(data);
    this.save(data);
  },

  defaultData() {
    return {
      meta: { version: 1, createdAt: Utils.now() },
      products: [],
      customers: [],
      invoices: [],
      payments: []
    };
  },

  validate(db) {
    Utils.assert(db.products && db.customers && db.invoices && db.payments,
      "Corrupted storage structure");
  }
};

/* ========= Database ========= */
let DB = Storage.load();

/* ========= Product Module ========= */
const Inventory = {
  addProduct({ name, sellPrice, buyPrice, stock, barcode = "", minStock = 0 }) {
    Utils.assert(name && name.trim(), "Product name required");
    Utils.assert(sellPrice > 0, "Sell price must be > 0");
    Utils.assert(buyPrice >= 0, "Buy price invalid");
    Utils.assert(stock >= 0, "Stock cannot be negative");

    DB.products.push({
      id: Utils.uuid(),
      name: name.trim(),
      sellPrice,
      buyPrice,
      stock,
      barcode,
      minStock,
      active: true,
      createdAt: Utils.now()
    });

    Storage.save(DB);
  },

  getById(id) {
    return DB.products.find(p => p.id === id && p.active);
  },

  reduceStock(id, qty) {
    const p = this.getById(id);
    Utils.assert(p, "Product not found");
    Utils.assert(p.stock >= qty, "Insufficient stock");
    p.stock -= qty;
  }
};

/* ========= Customer Module ========= */
const Customers = {
  addCustomer(name) {
    Utils.assert(name && name.trim(), "Customer name required");

    DB.customers.push({
      id: Utils.uuid(),
      name: name.trim(),
      balance: 0,
      locked: false,
      createdAt: Utils.now()
    });

    Storage.save(DB);
  },

  get(id) {
    return DB.customers.find(c => c.id === id);
  },

  lock(id) {
    const c = this.get(id);
    Utils.assert(c, "Customer not found");
    c.locked = true;
    Storage.save(DB);
  },

  addBalance(id, amount) {
    const c = this.get(id);
    Utils.assert(c, "Customer not found");
    Utils.assert(!c.locked, "Customer account locked");
    c.balance += amount;
  }
};

/* ========= Sales / Invoices ========= */
const Sales = {
  createInvoice({ type, customerId = null, items }) {
    Utils.assert(items && items.length > 0, "Invoice has no items");
    Utils.assert(type === "cash" || type === "credit", "Invalid payment type");

    let customer = null;
    if (type === "credit") {
      Utils.assert(customerId, "Customer required for credit");
      customer = Customers.get(customerId);
      Utils.assert(customer, "Customer not found");
      Utils.assert(!customer.locked, "Customer is locked");
    }

    let total = 0;
    let profit = 0;

    items.forEach(it => {
      const p = Inventory.getById(it.productId);
      Utils.assert(p, "Invalid product");
      Utils.assert(it.qty > 0, "Invalid quantity");
      Inventory.reduceStock(p.id, it.qty);

      total += p.sellPrice * it.qty;
      profit += (p.sellPrice - p.buyPrice) * it.qty;
    });

    const invoice = {
      id: Utils.uuid(),
      number: Date.now(),
      date: Utils.now(),
      type,
      customerId,
      items,
      total,
      profit,
      status: "posted"
    };

    if (type === "credit") {
      Customers.addBalance(customerId, total);
    }

    DB.invoices.push(invoice);
    Storage.save(DB);

    return invoice;
  }
};

/* ========= Payments ========= */
const Payments = {
  addPayment({ customerId, amount, note = "" }) {
    Utils.assert(amount > 0, "Invalid payment amount");
    const c = Customers.get(customerId);
    Utils.assert(c, "Customer not found");

    c.balance -= amount;
    if (c.balance < 0) c.balance = 0;

    DB.payments.push({
      id: Utils.uuid(),
      customerId,
      amount,
      date: Utils.now(),
      note
    });

    Storage.save(DB);
  }
};

/* ========= Reports ========= */
const Reports = {
  daily(dateISO) {
    return DB.invoices.filter(i => i.date.startsWith(dateISO));
  },

  totalProfit() {
    return DB.invoices.reduce((a, i) => a + i.profit, 0);
  }
};

/* ========= END OF CORE ========= */
