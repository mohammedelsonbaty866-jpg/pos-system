/* ===============================
   PRODUCTS.JS
   إدارة الأصناف – نسخة احترافية
================================ */

/* عرض الأصناف */
function renderProductsTable(){
  const box = document.getElementById("productsTable");
  if(!box) return;

  box.innerHTML = `
    <table style="width:100%;border-collapse:collapse">
      <thead>
        <tr>
          <th>الصنف</th>
          <th>بيع</th>
          <th>شراء</th>
          <th>مخزون</th>
          <th>تحكم</th>
        </tr>
      </thead>
      <tbody>
        ${products.map((p,i)=>`
          <tr>
            <td>${p.n}</td>
            <td>${p.p}</td>
            <td>${p.c}</td>
            <td>${p.s}</td>
            <td>
              <button onclick="editProduct(${i})">✏️</button>
              <button onclick="deleteProduct(${i})">🗑️</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

/* تعديل صنف */
function editProduct(index){
  const p = products[index];
  const name = prompt("اسم الصنف", p.n);
  if(name === null) return;

  const price = prompt("سعر البيع", p.p);
  const cost  = prompt("سعر الشراء", p.c);
  const stock = prompt("المخزون", p.s);

  products[index] = {
    n: name,
    p: Number(price),
    c: Number(cost),
    s: Number(stock)
  };

  saveAll();
  renderProducts();
  renderProductsTable();
}

/* حذف صنف */
function deleteProduct(index){
  if(!confirm("حذف الصنف نهائيًا؟")) return;
  products.splice(index,1);
  saveAll();
  renderProducts();
  renderProductsTable();
}

/* تشغيل تلقائي عند فتح شاشة الأصناف */
document.addEventListener("DOMContentLoaded",()=>{
  const productsScreen = document.getElementById("products");
  if(productsScreen){
    const observer = new MutationObserver(()=>{
      if(productsScreen.classList.contains("active")){
        renderProductsTable();
      }
    });
    observer.observe(productsScreen,{attributes:true});
  }
});
