function renderProducts(){
  const box = document.getElementById("products");
  box.innerHTML = "";
  products.forEach(p=>{
    const d = document.createElement("div");
    d.className="product";
    d.innerHTML=`<b>${p.name}</b><br>${p.price} ج`;
    d.onclick=()=>addToCart(p);
    box.appendChild(d);
  });
}

function renderInvoice(cart){
  const box = document.getElementById("invoiceItems");
  box.innerHTML="";
  cart.forEach(i=>{
    box.innerHTML+=`
      <div class="item">
        ${i.name} × ${i.qty}
      </div>`;
  });
}
