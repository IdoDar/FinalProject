let cart_icon = document.querySelector('.cart-icon');
let close_cart = document.querySelector('.close');
let payment_cart = document.querySelector('.pay')
let show_cart = document.querySelector('body');
let list_cart_html = document.querySelector('.cart-list');
let total_price = document.querySelector('.sum-all')
let cart_icon_span = document.querySelector('.cart-icon span');
let cart = [];
let final_cart_json = [];

let total_quantity = get_cart_len();
let total_sum = 0;


//Shows cart
function show() { show_cart.classList.toggle('show-cart'); }

//shows number of items in cart on the top of the page
async function get_cart_len() {
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
    } get_user_info()
  })
}

//function to see how many times each item is in array and puts it in itemsObject like this <id> : <number of times in array>
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

// gets cart and put it in the html 
async function get_cart() {
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
      //get user cart - current basket
      var dburl = `http://localhost/API/users/${user_email}`;
      list_cart_html.innerHTML = '';
      await fetch(dburl, {
        method: "GET"
      }).then(function (response) {
        return response.json()
      }).then(function (data) {
        let my_usr = data[0];
        my_cart = my_usr.currentBasket;
        // gets each item how many times
        let times = times_in_array(my_cart);
        final_cart_json = [];
        total_sum = 0;
        if (my_cart.length > 0) {
          for (const my_id in times) {
            //gets info on each item in cart
            let sdburl = `http://localhost/API/products/${my_id}`;
            fetch(sdburl, {
              method: "GET"
            }).then(function (response) {
              return response.json()
            }).then(function (my_data) {
              var obj = JSON.stringify(my_data.data);
              var my_item = JSON.parse(obj);
              total_quantity = get_cart_len();
              //creates cart items
              let new_cart_item = document.createElement('div');
              new_cart_item.classList.add('item');
              // sets the id of the item in html to id of the item(in db)
              new_cart_item.dataset.id = my_id;
              total_sum = total_sum + my_item.price * times[my_id];
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
              // final_cart_json to put final cart in memory and before payment sends it to payment so we can show it in payment page
              final_cart_json.push({ 'id': my_id, 'product_name': my_item.product_name, 'quantity': times[my_id], 'price': my_item.price, 'picture': my_item.picture_link });
            })
          }
        }
      })
    } get_user_info();
  })
}


//goes to pay page and upload before final cart to use
function pay_page() {
  $.ajax({
    url: '/cart/payment',
    method: 'GET',
    success: function () {
      sessionStorage.setItem('final_cart', JSON.stringify(final_cart_json));
      window.location.href = `${url}`;

    },
    error: function (xhr, status, error) {
      console.error('Error fetching product page:', error);
    }
  });
}


//Gets and set cart len for icon count
get_cart_len();
document.body.addEventListener('click', () => { get_cart_len(); });

get_cart();

cart_icon.addEventListener('click', show);
close_cart.addEventListener('click', show);

//opens payment and sends final cart
payment_cart.addEventListener('click', function () {
  sessionStorage.setItem('final_cart', JSON.stringify(final_cart_json));
  //sessionStorage.setItem('final_cart_id', JSON.stringify(my_cart_id));
  window.location.href = "./payment";

})


//checks if you press on + or - button in cart and update db and html
list_cart_html.addEventListener('click', async (event) => {
  let clicked_position = event.target;
  if (clicked_position.classList.contains('less')) {
    let product_id = clicked_position.parentElement.parentElement.dataset.id;
    $.ajax({
      url: `http://localhost/API/Basket/MyBasket/Remove/${product_id}`,
      method: 'POST',
      withCredentials: true,
      success: function () {
      },
      error: function (xhr, status, error) {
        console.error('Error fetching product page:', error);
        if (xhr.status == 401 || xhr.status == 403)
          alert("You need login first");
        else
          alert(`error ${xhr.status}: ${error}`)
      }
    });
  }
  else if (clicked_position.classList.contains('more')) {
    let product_id = clicked_position.parentElement.parentElement.dataset.id;
    $.ajax({
      url: `http://localhost/API/Basket/MyBasket/Add/${product_id}`,
      method: 'POST',
      withCredentials: true,
      success: function () {
      },
      error: function (xhr, status, error) {
        console.error('Error fetching product page:', error);
        if (xhr.status == 401 || xhr.status == 403)
          alert("You need login first");
        else
          alert(`error ${xhr.status}: ${error}`)
      }
    });
    
  }
  get_cart();
})

