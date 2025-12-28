function login(){
  const u = username.value;
  const p = password.value;

  if(u==="admin" && p==="1234"){
    loginScreen.classList.remove("active");
    app.classList.add("active");
    renderProducts();
  }else{
    alert("بيانات غير صحيحة");
  }
}
