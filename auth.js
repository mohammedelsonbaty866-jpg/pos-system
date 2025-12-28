function login(){
  if(username.value==="admin" && password.value==="1234"){
    loginScreen.classList.remove("active");
    app.classList.add("active");
    renderProducts();
  }else{
    alert("بيانات غير صحيحة");
  }
}
