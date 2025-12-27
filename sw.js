self.addEventListener("install",e=>{
e.waitUntil(
caches.open("pos-cache").then(c=>{
return c.addAll([
"./",
"./index.html",
"./admin.html",
"./core.js",
"./manifest.json"
]);
})
);
});
