let cart_icon = document.querySelector('.cart-icon');
let close_cart = document.querySelector('.close');
let payment_cart = document.querySelector('.pay')
let show_cart = document.querySelector('body');


let list_cart_html = document.querySelector('.cart-list');
let total_price = document.querySelector('.sum-all')
let cart_icon_span = document.querySelector('.cart-icon span');
let cart = [];
let list_my_products = [];
let final_cart_json = [];

var user_email = 'yarden@lol';
function show() { show_cart.classList.toggle('show-cart'); }

let total_quantity = get_cart_len();

get_cart_len();

cart_icon.addEventListener('click', show);
close_cart.addEventListener('click', show);
payment_cart.addEventListener('click', function () {
    sessionStorage.setItem('final_cart', JSON.stringify(final_cart_json));
    sessionStorage.setItem('my_poducts', JSON.stringify(list_my_products));
    window.location.href = "./payment.html";

})


//shows number of items in cart on the top of the page
async function get_cart_len() {
    var dburl = `http://localhost/API/users/${user_email}`;
    await fetch(dburl, {
        method: "GET"
    }).then(function (response) {
        return response.json()
    }).then(function (data) {
        let my_usr = data[0];
        cart = my_usr.currentBasket;
        total_quantity = cart.length;
        cart_icon_span.innerText = total_quantity;

    })
}


function times_in_array(data) {
    let itemsObject = data.reduce((my_cart, item) => {
        if (my_cart[item]) {
            ++my_cart[item];
        } else {
            my_cart[item] = 1;
        }
        return my_cart;
    }, {})
    return itemsObject;

}

let total_sum = 0;


async function get_cart() {
    var dburl = `http://localhost/API/users/${user_email}`;
    list_cart_html.innerHTML = '';
    //quantity for cart



    await fetch(dburl, {
        method: "GET"
    }).then(function (response) {
        return response.json()
    }).then(function (data) {
        let my_usr = data[0];
        my_cart = my_usr.currentBasket;
        let times = times_in_array(my_cart);
        //my_final_cart = times;
        final_cart_json = [];
        for (const key in times) {
            console.log(`${key}: ${times[key]}`);
        }
        if (my_cart.length > 0) {
            let count = 1;
            for (const my_id in times) {
                let sdburl = `http://localhost/API/products/${my_id}`;
                fetch(sdburl, {
                    method: "GET"
                }).then(function (response) {
                    return response.json()
                }).then(function (data) {
                    var obj = JSON.stringify(data);
                    var my_item = JSON.parse(obj);
                    total_quantity = get_cart_len;//+ my_cart.quantity;
                    //creates cart items
                    let new_cart_item = document.createElement('div');
                    new_cart_item.classList.add('item');
                    // sets the id of the item in html to id of the item(in db)
                    new_cart_item.dataset.id = my_id;
                    total_sum = total_sum + my_item.price * times[my_id];//*my_cart.quantity;
                    //create item in html
                    new_cart_item.innerHTML =
                        `
                    <div class="my_image">
                            <img src=${my_item.picture_link} />
                        </div>
                        <div class="name">${my_item.product_name}</div>
                        <div class="price">${my_item.price * times[my_id]}</div>
                        <div class="quantity">
                            <span class="less">-</span>
                            <span id="number_of_items">${times[my_id]}</span>
                            <span class="more">+</span>
                        </div>
                    `;
                    list_cart_html.appendChild(new_cart_item);
                    total_price.innerHTML = '';
                    let final_sum = document.createElement('div');
                    final_sum.classList.add('sum_all');
                    final_sum.innerHTML = `Total: ${total_sum}`;
                    total_price.appendChild(final_sum);
                    final_cart_json.push({ 'id': my_id, 'product_name': my_item.product_name, 'quantity': times[my_id], 'price': my_item.price, 'picture': my_item.picture_link });

                })
            }

        }



        //shows quantity on the top of the cart
        cart_icon_span.innerText = total_quantity;
        //console.log(final_cart_json);
    })
}

get_cart();

function pay_page() {
    // Send an AJAX request (just for the sake of the example)
    $.ajax({
        url: `payment`, // Assuming this is your endpoint
        method: 'GET',
        success: function () {
            // Redirect to the product page
            sessionStorage.setItem('final_cart', JSON.stringify(final_cart_json));
            window.location.href = `${page_name}`;

        },
        error: function (xhr, status, error) {
            console.error('Error fetching product page:', error);
        }
    });
}



//add cart to memory so would not delete in refresh
//const add_cart_to_memory = () =>{
function add_cart_to_memory() {
    localStorage.setItem('cart', JSON.stringify(final_cart_json));

}

//checks if you press on + or - button in cart
list_cart_html.addEventListener('click', (event) => {
    let clicked_position = event.target;
    if (clicked_position.classList.contains('less') || clicked_position.classList.contains('more')) {
        // to get product id we set the product id to be an id to thr item (id like class) and we are going 2 back to get it
        let product_id = clicked_position.parentElement.parentElement.dataset.id;
        //kind is the kind less or more - diffult is less
        let kind = 'less';
        if (clicked_position.classList.contains('more')) {
            kind = 'more';
        }
        change_quantity(product_id, kind);
    }
})

//const initApp = () => {
function initApp() {
    // get data product
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            list_my_products = data;


            // get data cart from memory
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));

            }
        })
}
initApp();
document.body.addEventListener('click', () => {
    get_cart_len();
}
);
