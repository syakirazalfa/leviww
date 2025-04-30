// logo cart
feather.replace();

// navbar
const navbarNav = document.querySelector('.navbar-nav');
// ketika hamburger menu di-click
document.querySelector('#ham-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};
// klik di luar sidebar menutup navbar
const hamburger = document.querySelector('#ham-menu');
document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
});

// isi keranjang
let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
    showCart();
}

function showCart() {
    const cartBody = document.getElementById('cartBody');
    cartBody.innerHTML = '';
    cart.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>Rp ${item.price.toLocaleString()}</td>
            <td><button onclick="removeFromCart(${index})">Hapus</button></td>
        `;
        cartBody.appendChild(row);
    });
    document.getElementById('cartModal').style.display = 'block';
}

function removeFromCart(index) {
    cart.splice(index, 1);
    showCart();
}

function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

function printReceipt() {
    let receiptContent = 'Hai, berikut pesanan Anda:\n\n';
    cart.forEach(item => {
        receiptContent += `${item.name} - Rp ${item.price.toLocaleString()}\n`;
    });

    const totalAmount = cart.reduce((total, item) => total + item.price, 0);
    receiptContent += `\nTotal: Rp ${totalAmount.toLocaleString()}`;
    
    alert(receiptContent);

    // Kirim ke WhatsApp
    const phoneNumber = '+6285888211986';
    const message = encodeURIComponent(receiptContent);
    const link = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    window.open(link, '_blank');
}
