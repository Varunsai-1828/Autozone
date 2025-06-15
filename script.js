const products = [
  { 
    id: 1, 
    name: "Speedster GT", 
    type: "Car", 
    price: 35000, 
    desc: "High-performance sports car.", 
    image: "https://cdn.pixabay.com/photo/2015/01/19/13/51/car-604019_640.jpg" 
  },
  { 
    id: 2, 
    name: "Offroad Beast", 
    type: "Car", 
    price: 28000, 
    desc: "All-terrain SUV ready for adventure.", 
    image: "https://cdn.pixabay.com/photo/2015/03/26/09/39/jeep-690548_640.jpg" 
  },
  { 
    id: 3, 
    name: "Roadster ZX", 
    type: "Bike", 
    price: 12000, 
    desc: "Stylish two-wheeler for city rides.", 
    image: "https://cdn.pixabay.com/photo/2016/07/07/16/46/motorcycle-1503800_640.jpg" 
  },
  { 
    id: 4, 
    name: "Cruiser LX", 
    type: "Bike", 
    price: 15000, 
    desc: "Comfortable cruiser for long trips.", 
    image: "https://cdn.pixabay.com/photo/2014/10/22/17/22/motorcycle-498244_640.jpg" 
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const grid = document.getElementById("product-grid");
const cartToggle = document.getElementById("cart-toggle");
const cartSidebar = document.getElementById("cart-sidebar");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

products.forEach(p => {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `
    <img src="${p.image}" alt="${p.name}">
    <h3>${p.name}</h3>
    <p>${p.desc}</p>
    <p>$${p.price}</p>
    <button data-id="${p.id}">Add to Cart</button>
  `;
  grid.appendChild(div);
});

grid.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    const id = +e.target.dataset.id;
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id, quantity: 1 });
    }
    saveCart();
    updateCartUI();
  }
});

cartToggle.addEventListener("click", () => {
  cartSidebar.classList.toggle("hidden");
});

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartUI() {
  cartItems.innerHTML = "";
  let total = 0;
  let count = 0;
  cart.forEach(({ id, quantity }) => {
    const p = products.find(x => x.id === id);
    total += p.price * quantity;
    count += quantity;
    const li = document.createElement("li");
    li.textContent = `${p.name} x${quantity} — $${p.price * quantity}`;
    cartItems.appendChild(li);
  });
  cartCount.textContent = count;
  cartTotal.textContent = `Total: $${total}`;
}

updateCartUI();

