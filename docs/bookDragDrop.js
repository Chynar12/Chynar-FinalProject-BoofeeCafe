document.querySelectorAll('.draggable').forEach(item => {
    item.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', item.outerHTML);
    });
});

const cart = document.querySelector('.sidebar2');
cart.addEventListener('dragover', e => {
    e.preventDefault(); // Allow the drop event
});

cart.addEventListener('drop', e => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');
    const original = document.createElement('div');
    original.innerHTML = data;
    const product = original.firstChild;

    addProductToCart(product);
});

function addProductToCart(product) {
    const price = parseFloat(product.getAttribute('data-price'));
    const cartItems = document.querySelector('.cart-items');
    const clone = product.cloneNode(true);
    const removeButton = clone.querySelector('.remove-item');
    removeButton.style.display = 'block'; // Show remove button

    removeButton.addEventListener('click', () => removeItem(clone, price));

    if (cartItems.innerText === 'Your cart is empty') {
        cartItems.innerText = ''; 
    }
    cartItems.appendChild(clone);

    updateTotal(price);
}

function removeItem(item, price) {
    const cartItems = document.querySelector('.cart-items');
    cartItems.removeChild(item);
    updateTotal(-price); // Subtract item price from total
}

function updateTotal(addPrice) {
    const totalElement = document.getElementById('total');
    let currentTotal = parseFloat(totalElement.innerText.substring(1)) + addPrice;
    totalElement.innerText = `$${currentTotal.toFixed(2)}`;
}

function submitOrder() {
    alert('Order submitted!');
    // Reset cart and total
    document.querySelector('.cart-items').innerHTML = 'Your cart is empty';
    document.getElementById('total').innerText = '$0.00';
}

function filterBooks() {
    const searchInput = document.getElementById('searchBar');
    const filter = searchInput.value.toUpperCase();
    const booksContainer = document.querySelector('.container2');
    const books = booksContainer.querySelectorAll('.polaroid');

    books.forEach(book => {
        const title = book.querySelector('p').textContent.toUpperCase();
        if (title.includes(filter)) {
            book.style.display = '';
        } else {
            book.style.display = 'none';
        }
    });
}
