const name_pattern = /^[\u0590-\u05FFa-z\sA-Z ,.'-]+$/;
const phone_pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const city_pattern = /^[a-z\sA-Z]+$/;
const zip_pattern = /\b\d{5,10}\b/;
const card_pattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
const id_pattern = /\b\d{9}\b/;
const cvv_pattern = /\b\d{3}\b/;



let list_cart_html = document.querySelector('.cart-list');
let total_price = document.querySelector('.sum-all')

//checks input woth regex
async function check_input() {
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
        await delete_and_save_cart();
        alert("Thank you for your purchase! It will arrive soon :)")
    }
}

//gets the users cart from memory (put to memory by shopping cart) 
let json_cart = sessionStorage.getItem('final_cart');
let cart = JSON.parse(json_cart);

// delete cart from current cart and saves cart to history cart
async function delete_and_save_cart() {
    $(document).ready(function () {
        async function get_user_info() {
            var user_email = ""
            await $.ajax({
                url: "http://localhost/API/users/CurrentUser",
                method: "GET",
                withCredentials: true,
                success: function (data) {
                    user_email = data[0].email
                }
            })
            var dburl = `http://localhost/API/users/${user_email}`;
            //gets current cart
            await fetch(dburl, {
                method: "GET"
            }).then(function (response) {
                return response.json()
            }).then(function (data) {
                let my_usr = data[0];
                let my_cart = my_usr.currentBasket;
                let my_user_id = my_usr._id;
                let today = new Date();
                let for_post = JSON.stringify({
                    user: my_user_id,
                    date: today,
                    basket: my_cart
                })
                return for_post;
            }).then(async function (for_post) {
                let for_body = JSON.parse(for_post);
                //adds cart to history
                let mdburl = "http://localhost/API/basket";
                $.post(mdburl, for_body, (data, status) => { console.log(data); });
                //delete all items in cart
                for (let i = 0; i < for_body.basket.length; i++) {
                    dburl = `http://localhost/API/basket/MyBasket/Remove/${for_body.basket[i]}`
                    await $.post(dburl, {}, (data, status) => { console.log(data); });
                }
                $.ajax({
                    url: `http://localhost/home`,
                    method: 'GET',
                    success: function () {
                        // Redirect to the product page
                        window.location.href = `http://localhost/home`;
                    },
                    error: function (xhr, status, error) {
                        console.error('Error fetching product page:', error);
                    }
                });
            })
        } get_user_info()
    })

}

// puts cart in html
function cart_html() {
    list_cart_html.innerHTML = '';
    let total_sum = 0;
    cart.forEach(my_item_info => {
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



