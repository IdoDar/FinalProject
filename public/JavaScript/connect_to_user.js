//calls a page
function call_the_page(page_name){
    $.ajax({
        url: `${page_name}`, 
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
