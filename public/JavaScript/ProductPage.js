$(document).ready(function () {
    // Function to get product name from URL path
    function getProductFromPath() {
        const pathArray = window.location.pathname.split('/');
        return pathArray[pathArray.length - 1];
    }

    // Use the function to get the product name
    const product = getProductFromPath();

    function fetchProductData() {
        $.ajax({
            url: `/API/products/${product}`, // Use the parsed URL parameter
            method: 'GET',
            success: function (product) {
                console.log("Response:", product); // Log the response to check its content
                $('#product-image').attr('src', product.picture_link);
                const detailsContainer = $('#product-details');
                detailsContainer.empty();
                $.each(product, function (key, value) {
                    if (key !== 'picture_link') {
                        const detail = $('<p></p>').html(`<strong>${key.replace(/_/g, ' ')}:</strong> ${value}`);
                        detailsContainer.append(detail);
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
        // Add your function logic here
        alert('Product added to cart!');
    }

    // Set up the add-to-cart button click handler
    $('#add-to-cart-button').click(addToCart);

    if (product) {
        fetchProductData();
    } else {
        console.error('Product parameter not found in URL');
    }
});