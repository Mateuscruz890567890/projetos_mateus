document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
        });
    });

    // Shopping Cart
    const cartButton = document.querySelector('.cart-button');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCart = document.querySelector('.close-cart');
    const cartItems = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const subtotalAmount = document.querySelector('.subtotal-amount');
    const serviceTax = document.querySelector('.service-tax');
    const totalAmount = document.querySelector('.total-amount');
    const checkoutButton = document.querySelector('.checkout-button');

    let cart = [];

    // Open cart
    cartButton.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
    });

    // Close cart
    function closeCartSidebar() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    }

    closeCart.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);

    // Add to cart function
    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: name,
                price: price,
                quantity: 1
            });
        }
        
        updateCart();
    }

    // Update cart display
    function updateCart() {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="empty-cart">Seu carrinho está vazio</div>';
            cartCount.textContent = '0';
            subtotalAmount.textContent = 'R$ 0,00';
            serviceTax.textContent = 'R$ 0,00';
            totalAmount.textContent = 'R$ 0,00';
            return;
        }
        
        let subtotal = 0;
        let totalItems = 0;
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            totalItems += item.quantity;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="item-quantity">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                    </div>
                    <span class="item-price">R$ ${itemTotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <button class="remove-item" data-index="${index}">×</button>
            `;
            cartItems.appendChild(cartItem);
        });
        
        const serviceTaxValue = subtotal * 0.10; // 10% service tax
        const total = subtotal + serviceTaxValue;
        
        cartCount.textContent = totalItems;
        subtotalAmount.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
        serviceTax.textContent = `R$ ${serviceTaxValue.toFixed(2).replace('.', ',')}`;
        totalAmount.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    // Handle quantity buttons and remove item
    cartItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('quantity-btn')) {
            const index = e.target.dataset.index;
            const item = cart[index];
            
            if (e.target.classList.contains('plus')) {
                item.quantity += 1;
            } else if (e.target.classList.contains('minus')) {
                item.quantity -= 1;
                if (item.quantity <= 0) {
                    cart.splice(index, 1);
                }
            }
            
            updateCart();
        } else if (e.target.classList.contains('remove-item')) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            updateCart();
        }
    });

    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            addToCart(name, price);
            
            // Show cart sidebar when adding first item
            if (cart.length === 1) {
                cartSidebar.classList.add('active');
                cartOverlay.classList.add('active');
            }
        });
    });

    // Checkout
    checkoutButton.addEventListener('click', () => {
        if (cart.length > 0) {
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const serviceTaxValue = total * 0.10;
            const finalTotal = total + serviceTaxValue;
            
            alert(`Pedido finalizado com sucesso!\nTotal: R$ ${finalTotal.toFixed(2).replace('.', ',')}`);
            cart = [];
            updateCart();
            closeCartSidebar();
        } else {
            alert('Adicione itens ao carrinho primeiro!');
        }
    });

    // Banner Slider
    const banner = document.querySelector('.banner');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // Function to update banner position
    function updateBanner() {
        banner.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    // Function to go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateBanner();
    }
    
    // Function to go to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateBanner();
    }
    
    // Add click event listeners to buttons
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
        
        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}); 