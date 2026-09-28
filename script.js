// Daftar produk dengan gambar
const products = [
    { id: 1, name: 'BENG-BENG', price: 2000, img: 'img/bb.jpg' },
    { id: 2, name: 'BONCABE', price: 1000, img: 'img/bon.jpg' },
    { id: 3, name: 'CHOCOPIE', price: 2000, img: 'img/cc.jpg' },
    { id: 4, name: 'MAXICORN', price: 2000, img: 'img/max.jpg' },
    { id: 5, name: 'QTELA', price: 2000, img: 'img/minuman.jpeg' },
    { id: 6, name: 'QTELA', price: 2000, img: 'img/qt.jpg' },
];

let cart = [];

function displayProducts() {
    const productContainer = document.getElementById('products');
    if (!productContainer) return;

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}" width="150">
            <h3>${product.name}</h3>
            <p>Rp ${product.price}</p>
            <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
        `;
        productContainer.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} x ${item.quantity} - Rp ${item.price * item.quantity}`;
        cartItemsContainer.appendChild(listItem);
        totalPrice += item.price * item.quantity;
    });
    if (totalPriceElement) {
        totalPriceElement.textContent = totalPrice;
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong.');
        return;
    }
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const payment = prompt(`Total belanja Anda Rp ${total}. Masukkan jumlah pembayaran:`);
    if (payment >= total) {
        alert(`Pembayaran berhasil! Kembalian Anda: Rp ${payment - total}`);
        cart = [];
        updateCart();
    } else {
        alert('Uang Anda tidak mencukupi.');
    }
}

const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', checkout);
}

displayProducts();