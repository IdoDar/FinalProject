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



    function addToCart() {
        console.log('Add to Cart button clicked');

        const product = getProductFromPath();

        $.ajax({
            url: `http://localhost/API/Basket/MyBasket/Add/${product}`,
            method: 'POST',
            withCredentials: true,
            success: function () {
                alert('Product added to cart!');
            },
            error: function (xhr, status, error) {
                console.error('Error fetching product page:', error);
            }
        });

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

