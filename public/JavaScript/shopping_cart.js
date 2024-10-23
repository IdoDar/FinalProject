let cart_icon = document.querySelector('.cart-icon');
let close_cart = document.querySelector('.close');
let payment_cart = document.querySelector('.pay')
let show_cart = document.querySelector('body');

cart_icon.addEventListener('click', show);
close_cart.addEventListener('click', show);
payment_cart.addEventListener('click', function () { window.location.href = "./payment.html"});








function show() { show_cart.classList.toggle('show-cart'); }