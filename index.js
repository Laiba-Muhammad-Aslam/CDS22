// FAQ 
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
});

// product slider 

document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector(".carousel");
    const arrowBtns = document.querySelectorAll(".wrapper i");
    const wrapper = document.querySelector(".wrapper");

    const firstCard = carousel.querySelector(".card");
    const firstCardWidth = firstCard.offsetWidth;

    let isDragging = false,
        startX,
        startScrollLeft,
        timeoutId;

    const dragStart = (e) => { 
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
        if (!isDragging) return;
    
        // Calculate the new scroll position
        const newScrollLeft = startScrollLeft - (e.pageX - startX);
    
        // Check if the new scroll position exceeds 
        // the carousel boundaries
        if (newScrollLeft <= 0 || newScrollLeft >= 
            carousel.scrollWidth - carousel.offsetWidth) {
            
            // prevent further dragging
            isDragging = false;
            return;
        }
    
        // update the scroll position of the carousel
        carousel.scrollLeft = newScrollLeft;
    };

    const dragStop = () => {
        isDragging = false; 
        carousel.classList.remove("dragging");
    };

    const autoPlay = () => {
    
        // Return if window is smaller than 800
        if (window.innerWidth < 800) return; 
        
        // Calculate the total width of all cards
        const totalCardWidth = carousel.scrollWidth;
        
        // Calculate the maximum scroll position
        const maxScrollLeft = totalCardWidth - carousel.offsetWidth;
        
        // If the carousel is at the end, stop autoplay
        if (carousel.scrollLeft >= maxScrollLeft) return;
        
        // Autoplay the carousel after every 2500ms
        timeoutId = setTimeout(() => 
            carousel.scrollLeft += firstCardWidth, 2500);
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    wrapper.addEventListener("mouseenter", () => 
        clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);

    // Add event listeners for the arrow buttons to 
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id === "left" ? 
                -firstCardWidth : firstCardWidth;
        });
    });
});

// Cart section 

document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelectorAll('.basket-icon');
    console.log(cartIcon)
    const cartSection = document.getElementById('cartSection');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    let cart = [];

    // Show/Hide Cart Section when clicking on basket icon
    // cartIcon.addEventListener('click', () => {
    //     cartSection.classList.toggle('active');
    //     console.log("cart opening")
    // });

    cartIcon.forEach(button =>{
        button.addEventListener('click', () => {
            cartSection.classList.toggle('active');
            console.log("cart opening")
        });
    })

    // Add to Cart Button Functionality
    const addToCartButtons = document.querySelectorAll('.shopNowBtn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.card');
            const productName = productCard.querySelector('h2').innerText;
            const productPrice = parseFloat(productCard.querySelector('h4').innerText.replace('$', ''));
            const productImage = productCard.querySelector('img').src;
            addToCart(productName, productPrice, productImage);
        });
    });

    function addToCart(name, price, image) {
        const existingProduct = cart.find(item => item.name === name);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ name, price, quantity: 1, image });
        }
        updateCartUI();
    }

    function updateCartUI() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `
                <img src="${item.image}" alt="${item.name}" />
                <div class="cart-item-details">
                    <span>${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="increaseBtn">+</button>
                    <button class="decreaseBtn">-</button>
                    <button class="removeBtn">Remove</button>
                </div>
            `;
            cartItems.appendChild(li);
            total += item.price * item.quantity;

            // Add event listeners for buttons
            li.querySelector('.increaseBtn').addEventListener('click', () => {
                item.quantity++;
                updateCartUI();
            });
            li.querySelector('.decreaseBtn').addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    removeFromCart(item.name);
                }
                updateCartUI();
            });
            li.querySelector('.removeBtn').addEventListener('click', () => {
                removeFromCart(item.name);
            });
        });

        cartTotal.textContent = total.toFixed(2);
    }

    function removeFromCart(name) {
        cart = cart.filter(item => item.name !== name);
        updateCartUI();
    }
});

let purchaseBtn = document.getElementById("purchaseBtn");
let closeBtn = document.getElementById("closeBtn");

purchaseBtn.addEventListener("click", function(){
    alert("Thanks for shopping");
})

closeBtn.addEventListener("click", function(){
    cartSection.classList.remove('active');
})