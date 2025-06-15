const products = [
  { id:1, name:"Speedster GT", type:"Car", price:35000, desc:"High-performance sports car.", image:"https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg" },
  { id:2, name:"Offroad Beast", type:"Car", price:28000, desc:"All-terrain SUV ready for adventure.", image:"https://cdn.pixabay.com/photo/2017/09/07/10/29/suv-2724431_1280.jpg" },
  { id:3, name:"Roadster ZX", type:"Bike", price:12000, desc:"Stylish two‑wheeler for city rides.", image:"https://cdn.pixabay.com/photo/2015/03/26/10/02/bike-690507_1280.jpg" },
  { id:4, name:"Cruiser LX", type:"Bike", price:15000, desc:"Comfortable cruiser for long trips.", image:"https://cdn.pixabay.com/photo/2014/10/22/17/22/motorcycle-498244_1280.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart"))||[];

const grid = document.getElementById("product-grid");
const cartToggle = document.getElementById("cart-toggle");
const cartSidebar = document.getElementById("cart-sidebar");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

products.forEach(p=>{
  const div=document.createElement("div");
  div.className="product";
  div.innerHTML=`
    <img src="${p.image}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p class="desc">${p.desc}</p>
    <p class="price">$${p.price}</p>
    <button data-id="${p.id}">Add to Cart</button>
  `;
  grid.appendChild(div);
});

grid.addEventListener("click",e=>{
  if(e.target.tagName==="BUTTON"){
    const id=+e.target.dataset.id;
    cart.push(id);
    saveCart();
    updateCartUI();
  }
});

cartToggle.addEventListener("click",()=>
  cartSidebar.classList.toggle("hidden")
);

function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartUI(){
  cartItems.innerHTML="";
  let total=0;
  cart.forEach(id=>{
    const p=products.find(x=>x.id===id);
    total+=p.price;
    const li=document.createElement("li");
    li.textContent=`${p.name} – $${p.price}`;
    cartItems.append(li);
  });
  cartCount.textContent=cart.length;
  cartTotal.textContent=`Total: $${total}`;
}

updateCartUI();
