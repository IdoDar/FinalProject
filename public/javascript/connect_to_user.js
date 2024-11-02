function call_the_page(page_name){
        // Send an AJAX request (just for the sake of the example)
    $.ajax({
        url: `${page_name}`, // Assuming this is your endpoint
        method: 'GET',
        success: function () {
            // Redirect to the product page
            window.location.href = `${page_name}`;
        },
        error: function (xhr, status, error) {
            console.error('Error fetching product page:', error);
        }
    });
}
