let cart_icon = document.querySelector('.cart-icon');
let close_cart = document.querySelector('.close');
let show_cart = document.querySelector('body');

cart_icon.addEventListener('click', show);
close_cart.addEventListener('click', show);





function show() { show_cart.classList.toggle('show-cart'); }