/* =========================
   CORE DATABASE
========================= */
const DB = {
  products: JSON.parse(localStorage.products || "[]"),
  customers: JSON.parse(localStorage.customers || "[]"),
  sales: JSON.parse(localStorage.sales || "[]"),
  save(){
    localStorage.products = JSON.stringify(this.products);
    localStorage.customers = JSON.stringify(this.customers);
    localStorage.sales = JSON.stringify(this.sales);
  }
};

/* =========================
   PRODUCTS
========================= */
function addProduct(name, price, cost, stock){
  if(!name || price<=0 || stock<0){
    alert("بيانات الصنف غير صحيحة");
    return false;
  }
  DB.products.push({
    id: Date.now(),
    name,
    price:+price,
    cost:+cost,
    stock:+stock
  });
  DB.save();
  return true;
}

/* =========================
   CUSTOMERS
========================= */
function addCustomer(name){
  if(!name) return alert("اسم العميل مطلوب");
  DB.customers.push({
    id: Date.now(),
    name,
    balance:0,
    locked:false
  });
  DB.save();
}

/* =========================
   SALES
========================= */
function saveSale(items, type, customerId=null){
  if(items.length===0) return alert("لا توجد أصناف");

  let total = 0;
  items.forEach(i=>{
    total += i.price * i.qty;
  });

  // خصم المخزون بعد التأكد
  for(let i of items){
    let p = DB.products.find(x=>x.id===i.id);
    if(!p || p.stock < i.qty){
      alert("مشكلة في المخزون");
      return;
    }
  }

  items.forEach(i=>{
    DB.products.find(x=>x.id===i.id).stock -= i.qty;
  });

  if(type==="credit"){
    let c = DB.customers.find(x=>x.id==customerId);
    if(!c || c.locked) return alert("العميل غير صالح");
    c.balance += total;
  }

  DB.sales.push({
    id: Date.now(),
    date: new Date().toISOString(),
    items,
    total,
    type
  });

  DB.save();
  return true;
}
