const menuItems = [
{
id:1,
name:"Margherita Pizza",
category:"pizza",
price:12.99,
img:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80",
desc:"Classic pizza with tomato sauce, mozzarella, and basil"
},

{
id:2,
name:"Pepperoni Pizza",
category:"pizza",
price:14.99,
img:"https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=80",
desc:"Pizza with tomato sauce, mozzarella, and pepperoni"
},

{
id:3,
name:"Veggie Burger",
category:"burger",
price:9.99,
img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
desc:"Vegetarian burger with fresh vegetables and sauce"
},

{
id:4,
name:"Cheeseburger",
category:"burger",
price:10.99,
img:"https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=500&q=80",
desc:"Classic beef burger with cheese and lettuce"
},

{
id:5,
name:"Spaghetti Carbonara",
category:"pasta",
price:11.99,
img:"https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=500&q=80",
desc:"Pasta with eggs, cheese, pancetta and black pepper"
},

{
id:6,
name:"Penne Arrabiata",
category:"pasta",
price:10.99,
img:"https://images.unsplash.com/photo-1611270629569-8b357cb88da9?auto=format&fit=crop&w=500&q=80",
desc:"Penne pasta with spicy tomato sauce"
},

{
id:7,
name:"Caesar Salad",
category:"salad",
price:8.99,
img:"https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=500&q=80",
desc:"Romaine lettuce with croutons and Caesar dressing"
},

{
id:8,
name:"Greek Salad",
category:"salad",
price:9.99,
img:"https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&w=500&q=80",
desc:"Fresh vegetables with feta cheese and olives"
},

{
id:9,
name:"Tiramisu",
category:"dessert",
price:6.99,
img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80",
desc:"Classic Italian dessert"
},

{
id:10,
name:"Chocolate Lava Cake",
category:"dessert",
price:7.99,
img:"https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=500&q=80",
desc:"Warm chocolate cake with molten center"
}
];

const menuContainer=document.querySelector(".menu-items");
const filterBtns=document.querySelectorAll(".filter-btn");

const cartBtn=document.querySelector(".cart-icon");
const cartModal=document.querySelector(".cart-modal");
const closeCart=document.querySelector(".close-cart");

const cartItemsContainer=document.querySelector(".cart-items");

const cartTotal=document.querySelector(".total-price");
const cartCount=document.querySelector(".cart-count");

const checkoutBtn=document.querySelector(".checkout-btn");

let cart=[];

function displayMenuItems(items){

let display=items.map(item=>{

return `
<div class="menu-item" data-id="${item.id}" data-category="${item.category}">
<img src="${item.img}" alt="${item.name}">
<div class="menu-item-info">
<h3>${item.name}</h3>
<p>${item.desc}</p>
<span class="price">$${item.price}</span>
<button class="add-to-cart">Add to Cart</button>
</div>
</div>
`;

}).join("");

menuContainer.innerHTML=display;

document.querySelectorAll(".add-to-cart").forEach(btn=>{
btn.addEventListener("click",addToCart);
});

}

filterBtns.forEach(btn=>{

btn.addEventListener("click",()=>{

filterBtns.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

let category=btn.dataset.category;

if(category==="all"){

displayMenuItems(menuItems);

}else{

let filtered=menuItems.filter(item=>item.category===category);

displayMenuItems(filtered);

}

});

});

function addToCart(e){

const btn = e.target;

const id=parseInt(btn.closest(".menu-item").dataset.id);

const selectedItem=menuItems.find(item=>item.id===id);

const existingItem=cart.find(item=>item.id===id);

if(existingItem){
existingItem.quantity++;
}else{
cart.push({...selectedItem,quantity:1});
}

updateCart();

}

function updateCart(){

cartCount.textContent=cart.reduce((t,i)=>t+i.quantity,0);

renderCartItems();

updateTotal();

}

function renderCartItems(){

if(cart.length===0){

cartItemsContainer.innerHTML="<p>Your cart is empty 🛒</p>";

return;

}

cartItemsContainer.innerHTML=cart.map(item=>`

<div class="cart-item" data-id="${item.id}">
<img src="${item.img}">
<div class="cart-item-info">
<h4>${item.name}</h4>
<span class="price">$${item.price}</span>
</div>

<div class="cart-item-quantity">
<button class="decrease">-</button>
<span>${item.quantity}</span>
<button class="increase">+</button>
</div>

<i class="fas fa-trash remove"></i>

</div>

`).join("");

document.querySelectorAll(".decrease").forEach(btn=>btn.onclick=decreaseQty);
document.querySelectorAll(".increase").forEach(btn=>btn.onclick=increaseQty);
document.querySelectorAll(".remove").forEach(btn=>btn.onclick=removeItem);

}

function updateTotal(){

let total=cart.reduce((t,i)=>t+i.price*i.quantity,0);

cartTotal.textContent=total.toFixed(2);

}

function decreaseQty(e){

let id=parseInt(e.target.closest(".cart-item").dataset.id);

let item=cart.find(i=>i.id===id);

if(item.quantity>1){
item.quantity--;
}else{
cart=cart.filter(i=>i.id!==id);
}

updateCart();

}

function increaseQty(e){

let id=parseInt(e.target.closest(".cart-item").dataset.id);

let item=cart.find(i=>i.id===id);

item.quantity++;

updateCart();

}

function removeItem(e){

let id=parseInt(e.target.closest(".cart-item").dataset.id);

cart=cart.filter(i=>i.id!==id);

updateCart();

}

checkoutBtn.addEventListener("click",()=>{

if(cart.length===0){
alert("Cart is empty");
return;
}

alert("Order placed successfully!");

cart=[];

updateCart();

});

displayMenuItems(menuItems);