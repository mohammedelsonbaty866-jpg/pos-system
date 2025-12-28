/*********************************
 * PRODUCTS.JS
 * إدارة الأصناف
 *********************************/

/* ====== عناصر الصفحة ====== */
const pName   = document.getElementById("productName");
const pPrice  = document.getElementById("productPrice");
const pStock  = document.getElementById("productStock");
const table   = document.getElementById("productsTable");

/* ====== إضافة صنف ====== */
function addProduct() {
  const name  = pName.value.trim();
  const price = Number(pPrice.value);
  const stock = Number(pStock.value);

  if (!name || price <= 0 || stock < 0) {
    alert("أدخل بيانات صحيحة");
    return;
  }

  products.push({
    name,
    price,
    stock
  });

  saveProducts();
  renderProductsTable();

  pName.value  = "";
  pPrice.value = "";
  pStock.value = "";
}

/* ====== حذف صنف ====== */
function deleteProduct(index) {
  if (!confirm("حذف الصنف؟")) return;

  products.splice(index, 1);
  saveProducts();
  renderProductsTable();
}

/* ====== عرض الأصناف ====== */
function renderProductsTable() {
  table.innerHTML = "";

  if (products.length === 0) {
    table.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center">لا توجد أصناف</td>
      </tr>
    `;
    return;
  }

  products.forEach((p, i) => {
    table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${p.name}</td>
        <td>${p.price} ج</td>
        <td>${p.stock}</td>
        <td>
          <button onclick="deleteProduct(${i})">❌</button>
        </td>
      </tr>
    `;
  });
}

/* ====== تشغيل أولي ====== */
if (table) {
  renderProductsTable();
}
