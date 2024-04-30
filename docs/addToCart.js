const product = [
    {
        id: 0,
        image: 'images/pastry-cookies.jpg',
        title: 'Cookies',
        price: 4,
    },
    {
        id: 1,
        image: 'images/pastry-cake.jpg',
        title: 'Cake',
        price: 5,
    },
    {
        id: 2,
        image: 'images/pastry-bulka.jpg',
        title: 'Bulka',
        price: 2,
    },
    {
        id: 3,
        image: 'images/pastry-dounut.jpg',
        title: 'Dounut',
        price: 4,
    },
    {
        id: 4,
        image: 'images/pastry-makaron.jpg',
        title: 'Makaron',
        price: 4,
    },
    {
        id: 5,
        image: 'images/pastry-muffin.jpg',
        title: 'Muffin',
        price: 3,
    },
    {
        id: 6,
        image: 'images/pastry-pancake.jpg',
        title: 'Pancake',
        price: 2,
    },

    {
        id: 7,
        image: 'images/americano.jpg',
        title: 'Americano - medium',
        price: 4,
    },
    {
        id: 8,
        image: 'images/latte.png',
        title: 'Latte - medium',
        price: 4,
    },
    {
        id: 9,
        image: 'images/cappuchino.png',
        title: 'Cappuchino - medium',
        price: 4,
    },
    {
        id: 10,
        image: 'images/espresso.png',
        title: 'Espresso',
        price: 3,
    },
    {
        id: 11,
        image: 'images/pastry-smoothie.jpg',
        title: 'Smoothie',
        price: 4,
    }

];

const categories = [...new Set(product.map((item) => { return item }))]
let i = 0;
document.getElementById('root').innerHTML = categories.map((item) => {
    var { image, title, price } = item;
    return (
        `<div class='bag'>
            <div class='img-bag'>
                <img class='images' src=${image}></img>
            </div>
        <div class='bottom'>
        <p>${title}</p>
        <h2>$ ${price}.00</h2>` +
        "<button onclick='addToCart(" + (i++) + ")'>Add to cart</button>" +
        `</div>
        </div>`
    )
}).join('')


var cart =[];

function addToCart(a) {
    let product = categories[a];
    let found = cart.find(item => item.id === product.id);
    if (found) {
        found.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    displayCart();
}


function delElement(a){
    cart.splice(a, 1);
    displayCart();
}



function displayCart() {
    let total = 0;
    document.getElementById("count").innerHTML = cart.reduce((acc, item) => acc + item.quantity, 0);
    if (cart.length === 0) {
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "$ 0.00";
    } else {
        document.getElementById('cartItem').innerHTML = cart.map((item, index) => {
            total += item.price * item.quantity;
            return (
                `<div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowing' src=${item.image}></img>
                    </div>
                    <p style='font-size:12px;'>${item.title}</p>
                    <input class="cart-quantity" type="number" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
                    <h2 style='font-size: 15px;'>$ ${item.price}.00</h2>
                    <i class='fa-solid fa-trash' onclick='delElement(${index})'></i>
                </div>`
            );
        }).join('');
        document.getElementById("total").innerHTML = "$ " + total.toFixed(2);
    }
}


function updateQuantity(index, newQuantity) {
    newQuantity = parseInt(newQuantity);
    if (newQuantity > 0) {
        cart[index].quantity = newQuantity;
    } else {
        cart[index].quantity = 1;
    }
    displayCart();
}

function submitOrder() {
    if (cart.length > 0) {
        alert("Order submitted!");
        cart = []; // Clear the cart
        displayCart();
    } else {
        alert("Your cart is empty!");
    }
}
