// Функция меню
function toggleMenu() {
    const menu = document.getElementById('menu');
    if(menu) menu.classList.toggle('active');
}

// Корзина
let cart = [];

function addToCart(name, price, quantity) {
    quantity = parseInt(quantity);
    if(quantity <= 0) return;

    let existing = cart.find(item => item.name === name);
    if(existing) {
        existing.quantity += quantity;
    } else {
        cart.push({name, price, quantity});
    }
    updateCart();
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cart');
    const totalElem = document.getElementById('total');

    if(!cartList || !totalElem) return; // защита, если корзины нет на странице

    cartList.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        let li = document.createElement('li');
        li.textContent = `${item.name} - ${item.quantity} шт. - ${item.price * item.quantity}₽`;
        let btn = document.createElement('button');
        btn.textContent = 'Удалить';
        btn.onclick = () => removeFromCart(item.name);
        li.appendChild(btn);
        cartList.appendChild(li);
    });
    totalElem.textContent = total;
}
