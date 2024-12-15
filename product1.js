function showProductBox(productId) {
    const boxes = document.querySelectorAll('.category-box');
    boxes.forEach(box => box.classList.add('hidden'));

    const productBoxes = document.querySelectorAll('.product-box');
    productBoxes.forEach(box => box.classList.remove('active'));

    const productBox = document.getElementById(productId);
    productBox.classList.add('active');
}

function closeProductBox() {
    const activeProductBox = document.querySelector('.product-box.active');
    if (activeProductBox) {
        activeProductBox.classList.remove('active');
    }

    const boxes = document.querySelectorAll('.category-box');
    boxes.forEach(box => box.classList.remove('hidden'));
}

function toggleCart() {
    const cartBox = document.getElementById('cartBox');
    cartBox.classList.toggle('active');
}

document.getElementById('cartLink').addEventListener('click', toggleCart);

function addToCart(event) {
    const button = event.target.closest('.add-to-cart');
    if (!button) return;

    const name = button.getAttribute('data-name');
    const price = button.getAttribute('data-price');
    const image = button.getAttribute('data-image');

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
        <img src="${image}" alt="${name}" class="cart-item-image">
        <p class="cart-item-name">${name}</p>
        <p class="cart-item-price">$${price}</p>
    `;

    const cartBox = document.getElementById('cartBox');
    if (cartBox.querySelector('p') && cartBox.querySelector('p').textContent === 'Your cart is currently empty.') {
        cartBox.querySelector('p').remove();
    }
    cartBox.appendChild(cartItem);

    alert(`${name} has been added to your cart!`);
}

document.addEventListener("DOMContentLoaded", function () {
    const cart = [];
    const cartCountElement = document.getElementById("cartCount");
    const cartBox = document.getElementById("cartBox");
    const cartItemsContainer = document.getElementById("cartItems");

    function updateCartUI() {
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartBox.querySelector("p").textContent = "Your cart is currently empty.";
            cartCountElement.style.display = "none";
        } else {
            cartBox.querySelector("p").textContent = "";
            cartCountElement.style.display = "inline-block";
            cartCountElement.textContent = cart.length;

            cart.forEach((item, index) => {
                const cartItem = document.createElement("div");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image" style="width: 50px; height: 50px;">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price">$${item.price}</p>
                    <button class="remove-cart-btn" data-index="${index}">X</button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartUI();
    }

    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = this.getAttribute("data-price");
            const image = this.getAttribute("data-image");

            cart.push({ name, price, image });
            updateCartUI();
            alert(`${name} has been added to your cart!`);
        });
    });

    cartItemsContainer.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-cart-btn")) {
            const index = parseInt(e.target.getAttribute("data-index"));
            removeFromCart(index);
        }
    });

    document.getElementById("cartLink").addEventListener("click", function (e) {
        e.preventDefault();
        cartBox.style.display = cartBox.style.display === "block" ? "none" : "block";
    });

    document.querySelector(".close-cart-btn").addEventListener("click", function () {
        cartBox.style.display = "none";
    });

    document.getElementById("shipNow").addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty. Add products to ship.");
            return;
        }

        const shippedProducts = cart.map(item => `${item.name} - $${item.price}`).join('\n');
        cart.length = 0;
        updateCartUI();
        alert(`The following products have been shipped:\n\n${shippedProducts}`);
    });

    updateCartUI();
});
