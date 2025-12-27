/************** البيانات **************/
let products = JSON.parse(localStorage.getItem("products") || "[]");
let invoices = JSON.parse(localStorage.getItem("invoices") || "[]");
let cart = [];

/************** عناصر **************/
const productsBox = document.getElementById("productsBox");
const invoiceBody = document.getElementById("invoiceBody");
const totalBox = document.getElementById("totalBox");

/************** تحميل **************/
renderProducts();
renderInvoice();

/************** الأصناف **************/
function renderProducts(){
  if(!productsBox) return;
  productsBox.innerHTML = "";
  products.forEach((p,i)=>{
    const div = document.createElement("div");
    div.className = "product";
    div.onclick = ()=> addToCart(i);
    div.innerHTML = `
      <h4>${p.name}</h4>
      <span>${p.price} ج</span>
    `;
    productsBox.appendChild(div);
  });
}

function addToCart(index){
  let p = products[index];
  let item = cart.find(i=>i.name===p.name);
  if(item){
    item.qty++;
  }else{
    cart.push({
      name:p.name,
      price:p.price,
      qty:1
    });
  }
  renderInvoice();
}

/************** الفاتورة **************/
function renderInvoice(){
  if(!invoiceBody) return;
  invoiceBody.innerHTML = "";
  let total = 0;

  cart.forEach((i,idx)=>{
    total += i.price * i.qty;
    invoiceBody.innerHTML += `
      <tr>
        <td>${i.name}</td>
        <td>${i.qty}</td>
        <td>${i.price}</td>
        <td>${i.qty * i.price}</td>
        <td><button onclick="removeItem(${idx})">✖</button></td>
      </tr>
    `;
  });

  totalBox.innerText = total + " ج";
}

/************** حذف عنصر **************/
function removeItem(index){
  cart.splice(index,1);
  renderInvoice();
}

/************** حفظ الفاتورة **************/
function saveInvoice(){
  if(cart.length === 0){
    alert("الفاتورة فارغة");
    return;
  }

  let total = cart.reduce((a,i)=>a+i.price*i.qty,0);
  let invoice = {
    id: invoices.length + 1,
    date: new Date().toLocaleString(),
    items: cart,
    total: total
  };

  invoices.push(invoice);
  localStorage.setItem("invoices", JSON.stringify(invoices));

  printInvoice(invoice);
  clearInvoice();
}

/************** مسح **************/
function clearInvoice(){
  cart = [];
  renderInvoice();
}

/************** طباعة **************/
function printInvoice(inv){
  let win = window.open("", "", "width=300");
  win.document.write(`
    <html>
    <head>
      <title>فاتورة</title>
      <style>
        body{font-family:Tahoma;font-size:12px}
        h3{text-align:center}
        table{width:100%;border-collapse:collapse}
        td,th{border-bottom:1px dashed #000;padding:4px;text-align:center}
      </style>
    </head>
    <body>
      <h3>فاتورة بيع</h3>
      <p>رقم: ${inv.id}</p>
      <p>${inv.date}</p>
      <table>
        <tr><th>الصنف</th><th>ك</th><th>س</th><th>ج</th></tr>
        ${inv.items.map(i=>`
          <tr>
            <td>${i.name}</td>
            <td>${i.qty}</td>
            <td>${i.price}</td>
            <td>${i.qty*i.price}</td>
          </tr>
        `).join("")}
      </table>
      <h3>الإجمالي: ${inv.total} ج</h3>
      <script>window.print();</script>
    </body>
    </html>
  `);
  win.document.close();
}

/************** إضافة أصناف افتراضية **************/
if(products.length === 0){
  products = [
    {name:"سكر",price:10},
    {name:"زيت",price:25},
    {name:"رز",price:15},
    {name:"مكرونة",price:7},
    {name:"شاي",price:30}
  ];
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}
