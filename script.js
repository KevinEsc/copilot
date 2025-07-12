// HarinaPlus - JavaScript Functionality

// Products Database
const products = [
    {
        id: 1,
        name: "Harina Todo Uso Premium",
        category: "todo-uso",
        price: 25.99,
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Harina de trigo refinada, perfecta para pan, pasteles y repostería en general.",
        weight: "50kg",
        stock: 100
    },
    {
        id: 2,
        name: "Harina Panadera Artesanal",
        category: "panadera",
        price: 28.99,
        image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Harina especial para panadería con alto contenido proteico, ideal para pan artesanal.",
        weight: "50kg",
        stock: 85
    },
    {
        id: 3,
        name: "Harina Integral Orgánica",
        category: "integral",
        price: 32.99,
        image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Harina integral orgánica, rica en fibra y nutrientes, perfecta para pan integral.",
        weight: "50kg",
        stock: 65
    },
    {
        id: 4,
        name: "Harina de Fuerza",
        category: "especial",
        price: 35.99,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80",
        description: "Harina de alta calidad con mayor contenido proteico para masas que requieren fuerza.",
        weight: "50kg",
        stock: 45
    },
    {
        id: 5,
        name: "Harina Todo Uso Económica",
        category: "todo-uso",
        price: 22.99,
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Harina de buena calidad a precio accesible, ideal para uso doméstico.",
        weight: "50kg",
        stock: 120
    },
    {
        id: 6,
        name: "Harina Panadera Clásica",
        category: "panadera",
        price: 26.99,
        image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Harina tradicional para panadería, excelente relación calidad-precio.",
        weight: "50kg",
        stock: 90
    },
    {
        id: 7,
        name: "Harina Integral de Centeno",
        category: "integral",
        price: 36.99,
        image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Harina integral de centeno, perfecta para panes especiales y saludables.",
        weight: "50kg",
        stock: 35
    },
    {
        id: 8,
        name: "Harina Premium para Pastelería",
        category: "especial",
        price: 38.99,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80",
        description: "Harina especial para pastelería fina, textura suave y resultados profesionales.",
        weight: "50kg",
        stock: 40
    }
];

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('harinaplus-cart')) || [];

// DOM Elements
const productsContainer = document.getElementById('productsContainer');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const cartCountElement = document.getElementById('cartCount');
const categoryFilter = document.getElementById('categoryFilter');
const sortBy = document.getElementById('sortBy');
const contactForm = document.getElementById('contactForm');

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize based on current page
    if (window.location.pathname.includes('tienda.html') || window.location.pathname.endsWith('/tienda.html')) {
        initializeStore();
    }
    
    if (window.location.pathname.includes('contacto.html') || window.location.pathname.endsWith('/contacto.html')) {
        initializeContact();
    }
    
    // Common initialization for all pages
    initializeCommon();
    updateCartUI();
    initializeAnimations();
});

// Store Page Functions
function initializeStore() {
    if (productsContainer) {
        displayProducts(products);
        
        // Event listeners for filters
        if (categoryFilter) {
            categoryFilter.addEventListener('change', filterAndSortProducts);
        }
        
        if (sortBy) {
            sortBy.addEventListener('change', filterAndSortProducts);
        }
    }
}

function displayProducts(productsToShow) {
    if (!productsContainer) return;
    
    productsContainer.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
}

function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-lg-3 mb-4';
    
    col.innerHTML = `
        <div class="card product-card h-100">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text text-muted">${product.description}</p>
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="h5 text-primary mb-0">$${product.price}</span>
                    <span class="badge bg-secondary">${product.weight}</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">Stock: ${product.stock}</small>
                    <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})">
                        <i class="bi bi-cart-plus me-1"></i>Agregar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

function filterAndSortProducts() {
    if (!categoryFilter || !sortBy) return;
    
    let filteredProducts = products;
    
    // Filter by category
    const selectedCategory = categoryFilter.value;
    if (selectedCategory !== 'all') {
        filteredProducts = products.filter(product => product.category === selectedCategory);
    }
    
    // Sort products
    const sortOption = sortBy.value;
    switch (sortOption) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
        default:
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    displayProducts(filteredProducts);
}

// Shopping Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartUI();
    saveCartToStorage();
    showNotification('Producto agregado al carrito', 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCartToStorage();
    showNotification('Producto eliminado del carrito', 'info');
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartUI();
        saveCartToStorage();
    }
}

function updateCartUI() {
    updateCartCount();
    updateCartTotal();
    updateCartItems();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotalElement) {
        cartTotalElement.textContent = total.toFixed(2);
    }
}

function updateCartItems() {
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-muted text-center">El carrito está vacío</p>';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item d-flex align-items-center';
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price}</div>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="btn btn-sm btn-outline-danger ms-2" onclick="removeFromCart(${item.id})">
                <i class="bi bi-trash"></i>
            </button>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
}

function saveCartToStorage() {
    localStorage.setItem('harinaplus-cart', JSON.stringify(cart));
}

// Contact Form Functions
function initializeContact() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

function handleContactSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(contactForm);
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const company = document.getElementById('company').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validate form
    if (!firstName || !lastName || !email || !subject || !message) {
        showNotification('Por favor complete todos los campos obligatorios', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Enviando mensaje...', 'info');
    
    setTimeout(() => {
        showNotification('¡Mensaje enviado exitosamente! Te contactaremos pronto.', 'success');
        contactForm.reset();
    }, 2000);
}

// Common Functions
function initializeCommon() {
    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
    
    // Smooth scrolling for anchor links
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
}

function handleCheckout() {
    if (cart.length === 0) {
        showNotification('El carrito está vacío', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (confirm(`¿Confirmar pedido?\n\nTotal de productos: ${itemCount}\nTotal a pagar: $${total.toFixed(2)}`)) {
        // Simulate checkout process
        showNotification('Procesando pedido...', 'info');
        
        setTimeout(() => {
            cart = [];
            updateCartUI();
            saveCartToStorage();
            showNotification('¡Pedido realizado exitosamente! Te contactaremos para confirmar la entrega.', 'success');
            
            // Close cart offcanvas
            const cartOffcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('shoppingCart'));
            if (cartOffcanvas) {
                cartOffcanvas.hide();
            }
        }, 2000);
    }
}

// Animation Functions
function initializeAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
    
    // Add animation classes to elements
    document.querySelectorAll('.card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Search functionality (if needed)
function searchProducts(searchTerm) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    displayProducts(filteredProducts);
}

// Export functions for global access
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.handleCheckout = handleCheckout;
window.searchProducts = searchProducts;