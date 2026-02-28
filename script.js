// let cart = JSON.parse(localStorage.getItem("cart")) || [];

// function addToCart(product, price){
//     cart.push({product, price});
//     localStorage.setItem("cart", JSON.stringify(cart));
//     alert(product + " added to cart");
// }

// function displayCart(){
//     let cartContainer = document.getElementById("cart-items");
//     let total = 0;

//     if(cartContainer){
//         cartContainer.innerHTML = "";
//         cart.forEach(item => {
//             total += item.price;
//             cartContainer.innerHTML += `
//                 <div class="cart-item">
//                     <h3>${item.product}</h3>
//                     <p>₹${item.price}</p>
//                 </div>
//             `;
//         });

//         document.getElementById("total").innerText = "Total: ₹" + total;
//     }
// }

// function clearCart(){
//     localStorage.removeItem("cart");
//     location.reload();
// }

// window.onload = displayCart;

// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add to cart
function addToCart(name, price) {
    const product = cart.find(item => item.name === name);

    if (product) {
        product.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();
    alert("Item added to cart!");
}

// Display cart
function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");

    if (!cartItems) return;

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
                <p>
                    Quantity:
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    ${item.quantity}
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </p>
                <p><strong>Subtotal: ₹${item.price * item.quantity}</strong></p>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    totalElement.innerText = "Total: ₹" + total;
}

// Update quantity
function updateQuantity(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    displayCart();
}

// Remove item
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
}

// Clear cart
function clearCart() {
    cart = [];
    saveCart();
    displayCart();
}

// Run when page loads
document.addEventListener("DOMContentLoaded", displayCart);