// Cart array
let cart = [];

// DOM elements
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const totalPrice = document.getElementById('total-price');
const navbar = document.querySelector('.navbar');

// Add to cart function
function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id,
            name,
            price,
            image,
            quantity: 1
        });
    }
    
    updateCart();
}
// Initialize Swiper
var swiper = new Swiper(".mySwiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });
  

// Update cart
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    let itemCount = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
        
        total += item.price * item.quantity;
        itemCount += item.quantity;
    });
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 2rem;">Your cart is empty</p>';
    }
    
    totalPrice.textContent = total.toFixed(2);
    cartCount.textContent = itemCount;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add to cart buttons
    document.body.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart') || e.target.classList.contains('add-to-cart-featured')) {
            const id = e.target.getAttribute('data-id');
            const name = e.target.getAttribute('data-name');
            const price = parseFloat(e.target.getAttribute('data-price'));
            const image = e.target.getAttribute('data-image');
            
            addToCart(id, name, price, image);
            
            // Show cart
            cartSidebar.classList.add('open');
            overlay.style.display = 'block';
        }
        
        if (e.target.classList.contains('quantity-btn')) {
            const id = e.target.getAttribute('data-id');
            const item = cart.find(item => item.id === id);
            
            if (e.target.classList.contains('plus')) {
                item.quantity++;
            } else if (e.target.classList.contains('minus')) {
                item.quantity--;
                if (item.quantity === 0) {
                    cart = cart.filter(cartItem => cartItem.id !== id);
                }
            }
            
            updateCart();
        }
        
        if (e.target.classList.contains('remove-item')) {
            const id = e.target.getAttribute('data-id');
            cart = cart.filter(item => item.id !== id);
            updateCart();
        }
    });
    
    // Cart toggle
    cartIcon.addEventListener('click', function() {
        cartSidebar.classList.add('open');
        overlay.style.display = 'block';
    });
    
    closeCart.addEventListener('click', function() {
        cartSidebar.classList.remove('open');
        overlay.style.display = 'none';
    });
    
    overlay.addEventListener('click', function() {
        cartSidebar.classList.remove('open');
        overlay.style.display = 'none';
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});