const name_pattern = /^[\u0590-\u05FFa-z\sA-Z ,.'-]+$/;
const phone_pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const city_pattern = /^[a-z\sA-Z]+$/;
const zip_pattern = /\b\d{5,10}\b/;
const card_pattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
const id_pattern = /\b\d{9}\b/;
const cvv_pattern = /\b\d{3}\b/;
var user_email = 'yarden@lol';

let list_cart_html = document.querySelector('.cart-list');
let total_price = document.querySelector('.sum-all')

function check_input() {
    console.log("clicked");
    let my_message = '';
    let problem = false;
    let f_name = document.getElementById("first_name").value;
    let l_name = document.getElementById("last_name").value;
    let n_phone = document.getElementById("phone").value;
    let a_email = document.getElementById("email").value;
    let a_city = document.getElementById("city").value;
    let c_zip = document.getElementById("zip").value;
    let n_card = document.getElementById("cardN").value;
    let n_id = document.getElementById("id").value;
    let n_cvv = document.getElementById("cvv").value;

    if (!name_pattern.test(f_name)) {
        problem = true;
        my_message = my_message + "First Name is Invalid\n";
    }
    if (!name_pattern.test(l_name)) {
        problem = true;
        my_message = my_message + "Last Name is Invalid\n";
    }
    if (!phone_pattern.test(n_phone)) {
        problem = true;
        my_message = my_message + "Phone Number is Invalid\n";
    }
    if (!email_pattern.test(a_email)) {
        problem = true;
        my_message = my_message + "Email Address is Invalid\n";
    }
    if (!name_pattern.test(a_city)) {
        problem = true;
        my_message = my_message + "City is Invalid\n";
    }
    if (!zip_pattern.test(c_zip)) {
        problem = true;
        my_message = my_message + "Zip Code is Invalid\n";
    }
    if (!card_pattern.test(n_card)) {
        problem = true;
        my_message = my_message + "Cradit Card Number is Invalid\n";
    }
    if (!id_pattern.test(n_id)) {
        problem = true;
        my_message = my_message + "ID is Invalid\n";
    }
    if (!cvv_pattern.test(n_cvv)) {
        problem = true;
        my_message = my_message + "CVV is Invalid\n";
    }
    if (problem) {
        alert(my_message);
    }
    else {
        alert("Thank you for your purchase! It will arrive soon :)")
    }
}

let json_cart = sessionStorage.getItem('final_cart');
let cart = JSON.parse(json_cart);
console.log(cart);

function cart_html() {
    list_cart_html.innerHTML = '';
    //quantity for cart
    let total_sum = 0;
    cart.forEach(my_item_info => {
        console.log("my item " + my_item_info.product_name);

        let new_cart_item = document.createElement('div');
        new_cart_item.classList.add('item');
        new_cart_item.dataset.id = my_item_info.id;
        new_cart_item.innerHTML =
            `
                <div class="my_image">
                        <img class="images" src=${my_item_info.picture} />
                    </div>
                    <div class="name"><b>Item Name:</b> <small>${my_item_info.product_name}</small></div>
                    <div class="quantity">
                        <span id="number_of_items"><b>Item Quantity:</b> <small>${my_item_info.quantity}</small></span>
                    </div>
                    <div class="price"><b>Total Item Price:</b> <small>${my_item_info.price * my_item_info.quantity}</small></div>
                 <hr>   
                `;
        list_cart_html.appendChild(new_cart_item);
        total_sum = total_sum + my_item_info.quantity * my_item_info.price;

    })
    total_price.innerHTML = '';
    let final_sum = document.createElement('div');
    final_sum.classList.add('sum_all');
    final_sum.innerHTML = `<b>Total: </b>${total_sum}`;
    total_price.appendChild(final_sum);

}
cart_html();



