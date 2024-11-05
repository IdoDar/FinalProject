$(document).ready(function () {
    // Function to get product name from URL path


    // Use the function to get the product name
    let product = getProductFromPath();

    function fetchProductData() {
        $.ajax({
            url: `/API/products/${product}`,
            method: 'GET',
            success: function (productinfo) {
                product = productinfo.data;
                console.log("Response:", product); // Log the response to check its content
                $('#product-image').attr('src', product.picture_link);
                const detailsContainer = $('#product-details');
                detailsContainer.empty();
                $.each(product, function (key, value) {
                    if (key !== 'picture_link') {
                        if (key == 'company_name') {
                            const detail = $('<p></p>').html(`<strong>${key.replace(/_/g, ' ')}:</strong> ${productinfo.conpanyName}`);
                            detailsContainer.append(detail);
                        }
                        else {
                            const detail = $('<p></p>').html(`<strong>${key.replace(/_/g, ' ')}:</strong> ${value}`);
                            detailsContainer.append(detail);
                        }
                    }

                });
            },
            error: function (xhr, status, error) {
                console.error('Error fetching product data:', error);
            }
        });
    }

    // Function to get the value of a cookie by name
    function getCookie(name) {
        let x = document.cookie;
        console.log(x);
        const value = `; ${document.cookie}`;
        console.log(document.cookie)
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }


    function addToCart() {
        console.log('Add to Cart button clicked');
        const accessToken = getCookie('accessToken'); // Replace 'yourCookieName' with your actual cookie name
        if (!accessToken) {
            alert("you need to log in first");
            console.error('Session cookie not found');
            return;
        }
        const product = getProductFromPath();
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `http://localhost/API/Basket/MyBasket/Add/${product}`);
        xhr.withCredentials = true
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);

        xhr.onload = function () {
            console.log('XHR loaded:', xhr.status, xhr.responseText);
            if (xhr.status >= 200 && xhr.status < 300) {
                const response = JSON.parse(xhr.responseText);
                console.log('Parsed Response:', response);
                // Save the accessToken and email
                console.log('User logged in successfully:', response);
            } else {
                if (xhr.status == 401 || xhr.status == 403)
                    alert("you need to log in first");
                console.error('Request failed with status:', xhr.status);
            }
        };

        xhr.onerror = function () {
            console.error('Network error');
        };

        xhr.send();
        alert('Product added to cart!');
    }

    // Set up the add-to-cart button click handler
    $('#add-to-cart-button').click(addToCart);

    function getProductFromPath() {
        const pathArray = window.location.pathname.split('/');
        return pathArray[pathArray.length - 1];
    }

    if (product) {
        fetchProductData();
    } else {
        console.error('Product parameter not found in URL');
    }
});

