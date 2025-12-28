let cart=[];

function addToCart(p){
  let item = cart.find(i=>i.name===p.name);
  if(item){
    item.qty++;
  }else{
    cart.push({name:p.name,price:p.price,qty:1});
  }
  renderInvoice(cart);
}

function saveInvoice(){
  if(cart.length===0)return alert("الفاتورة فارغة");
  invoices.push({
    date:new Date().toLocaleString(),
    items:cart
  });
  cart=[];
  renderInvoice(cart);
  saveData();
  alert("تم الحفظ");
}

function printInvoice(){
  window.print();
}
