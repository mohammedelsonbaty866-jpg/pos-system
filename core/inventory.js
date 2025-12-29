const Inventory = {

  sell(productName, qty) {
    const products = Products.getAll();
    const index = products.findIndex(p => p.name === productName);

    if (index === -1) return false;
    if (products[index].stock < qty) {
      alert("❌ مخزون غير كافي");
      return false;
    }

    products[index].stock -= qty;
    Products.save(products);

    InventoryLog.add("بيع", productName, qty);
    return true;
  },

  restock(index, qty) {
    const products = Products.getAll();
    products[index].stock += qty;
    Products.save(products);

    InventoryLog.add("توريد", products[index].name, qty);
  }
};
