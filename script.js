const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 1999,
        rating: 4.5,
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600"
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 2999,
        rating: 4.4,
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
    },

    {
        id: 3,
        name: "Gaming Mouse",
        category: "electronics",
        price: 999,
        rating: 4.6,
        image:
            "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600"
    },

    {
        id: 4,
        name: "Running Shoes",
        category: "fashion",
        price: 2499,
        rating: 4.7,
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
    },

    {
        id: 5,
        name: "Classic T-Shirt",
        category: "fashion",
        price: 699,
        rating: 4.2,
        image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"
    },

    {
        id: 6,
        name: "Denim Jacket",
        category: "fashion",
        price: 1899,
        rating: 4.5,
        image:
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600"
    },

    {
        id: 7,
        name: "Travel Backpack",
        category: "accessories",
        price: 1299,
        rating: 4.3,
        image:
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"
    },

    {
        id: 8,
        name: "Sunglasses",
        category: "accessories",
        price: 899,
        rating: 4.1,
        image:
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600"
    }

];


/* =====================================
   CART
===================================== */

// Get cart from localStorage

let cart = JSON.parse(
    localStorage.getItem("shoppingCart")
) || [];


/* =====================================
   DISPLAY PRODUCTS
===================================== */

function displayProducts(productList) {

    const container =
        document.getElementById("product-container");


    // If no products

    if (productList.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <h3>No Products Found</h3>

                <p>
                    Try searching for another product.
                </p>

            </div>

        `;

        return;
    }


    // Create product cards

    container.innerHTML =
        productList.map(product => `

            <div class="product-card">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <div class="product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p class="category">
                        ${capitalize(product.category)}
                    </p>

                    <p class="rating">
                        ⭐ ${product.rating}
                    </p>

                    <p class="price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </p>

                    <button
                        class="add-cart-btn"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        `).join("");
}


/* =====================================
   SEARCH & FILTER
===================================== */

function filterProducts() {

    const searchInput =
        document
            .getElementById("search-input")
            .value
            .toLowerCase()
            .trim();


    const category =
        document
            .getElementById("category-filter")
            .value;


    const filteredProducts =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchInput);


            const matchesCategory =
                category === "all" ||
                product.category === category;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    displayProducts(filteredProducts);
}


/* =====================================
   ADD TO CART
===================================== */

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) {
        return;
    }


    // Check if product already exists

    const existingProduct =
        cart.find(
            item => item.id === productId
        );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveCart();

    updateCartCount();

    alert(
        `${product.name} added to your cart!`
    );
}


/* =====================================
   SAVE CART
===================================== */

function saveCart() {

    localStorage.setItem(
        "shoppingCart",
        JSON.stringify(cart)
    );
}


/* =====================================
   UPDATE CART COUNT
===================================== */

function updateCartCount() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    document.getElementById(
        "cart-count"
    ).textContent = count;
}


/* =====================================
   OPEN CART
===================================== */

function openCart() {

    const modal =
        document.getElementById("cart-modal");


    modal.style.display = "flex";


    displayCart();
}


/* =====================================
   CLOSE CART
===================================== */

function closeCart() {

    document.getElementById(
        "cart-modal"
    ).style.display = "none";
}


/* =====================================
   DISPLAY CART
===================================== */

function displayCart() {

    const cartItems =
        document.getElementById("cart-items");


    const totalElement =
        document.getElementById("cart-total");


    // Empty cart

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <h3>Your Cart is Empty 🛒</h3>

                <p>
                    Add some products to get started.
                </p>

            </div>

        `;

        totalElement.textContent = "0";

        return;
    }


    let total = 0;


    cartItems.innerHTML =
        cart.map(item => {

            const itemTotal =
                item.price * item.quantity;


            total += itemTotal;


            return `

                <div class="cart-item">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >


                    <div class="cart-item-info">

                        <h4>
                            ${item.name}
                        </h4>

                        <p class="cart-price">
                            ₹${item.price.toLocaleString("en-IN")}
                        </p>


                        <div class="quantity-controls">

                            <button
                                onclick="decreaseQuantity(${item.id})"
                            >
                                -
                            </button>

                            <span>
                                ${item.quantity}
                            </span>

                            <button
                                onclick="increaseQuantity(${item.id})"
                            >
                                +
                            </button>

                        </div>


                        <button
                            class="remove-btn"
                            onclick="removeFromCart(${item.id})"
                        >
                            Remove
                        </button>

                    </div>

                </div>

            `;

        }).join("");


    totalElement.textContent =
        total.toLocaleString("en-IN");
}


/* =====================================
   INCREASE QUANTITY
===================================== */

function increaseQuantity(productId) {

    const item =
        cart.find(
            product => product.id === productId
        );


    if (item) {

        item.quantity++;

        saveCart();

        updateCartCount();

        displayCart();
    }
}


/* =====================================
   DECREASE QUANTITY
===================================== */

function decreaseQuantity(productId) {

    const item =
        cart.find(
            product => product.id === productId
        );


    if (!item) {
        return;
    }


    if (item.quantity > 1) {

        item.quantity--;

    } else {

        cart =
            cart.filter(
                product =>
                    product.id !== productId
            );
    }


    saveCart();

    updateCartCount();

    displayCart();
}


/* =====================================
   REMOVE FROM CART
===================================== */

function removeFromCart(productId) {

    cart =
        cart.filter(
            product =>
                product.id !== productId
        );


    saveCart();

    updateCartCount();

    displayCart();
}


/* =====================================
   CHECKOUT
===================================== */

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    alert(
        "Thank you for shopping with ShopHub! " +
        "Checkout functionality will be added later."
    );
}


/* =====================================
   CONTACT FORM
===================================== */

function submitContactForm(event) {

    event.preventDefault();


    const name =
        document.getElementById("name").value;


    alert(
        `Thank you, ${name}! Your message has been received.`
    );


    document
        .getElementById("contact-form")
        .reset();
}


/* =====================================
   CAPITALIZE TEXT
===================================== */

function capitalize(text) {

    return text.charAt(0).toUpperCase()
        + text.slice(1);
}


/* =====================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
===================================== */

window.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById("cart-modal");


        if (event.target === modal) {

            closeCart();
        }

    }
);


/* =====================================
   INITIALIZE WEBSITE
===================================== */

displayProducts(products);

updateCartCount();
