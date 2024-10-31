document.addEventListener('DOMContentLoaded', async () => {
    const productsUrl = 'http://localhost/API/Products';
    const filtersUrl = 'http://localhost/API/ProductsFields';

    const productContainer = document.getElementById('productContainer');
    const filterPanel = document.getElementById('filterPanel');
    const filterBtn = document.getElementById('filterBtn');

    /**
     * Fetch JSON data from a specified URL using AJAX (POST request with JSON body)
     * @param {string} url - The URL to fetch data from
     * @param {Object|null} body - The body of the request to send as JSON
     * @returns {Promise<Object>} - The JSON data from the response
     */
    function fetchJson(url, body) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(new Error(`Request failed with status ${xhr.status}`));
                }
            };
            xhr.onerror = function () {
                reject(new Error('Network error'));
            };
            xhr.send(JSON.stringify(body));
        });
    }

    /**
     * Load products into the product container
     * @param {Array} products - The array of products to display
     */
    function loadProducts(products) {
        productContainer.innerHTML = '';
        products.forEach(product => {
            const productEl = document.createElement('div');
            productEl.className = 'product';
            productEl.innerHTML = `
          <img src="${product.picture_link}" alt="${product.product_name}">
          <h2>${product.product_name}</h2>
          <p>Price: $${product.price}</p>
          <p>${product.description}</p>
        `;
            productContainer.appendChild(productEl);
        });
    }

    /**
     * Load filter options into the filter panel
     * @param {Object} filters - The filters object containing filter categories and values
     */
    function loadFilters(filters) {
        filterPanel.innerHTML = '';
        for (const [key, values] of Object.entries(filters)) {
            const filterSection = document.createElement('div');
            filterSection.innerHTML = `<h3>${key}</h3>`;

            values.forEach(value => {
                let displayValue = value;
                let valueToSend = value;

                // If key is 'company_name', use companyName for display and _id for value to send
                if (key === 'company_name') {
                    displayValue = value.companyName;
                    valueToSend = value._id;
                }

                const filterValue = document.createElement('div');
                filterValue.innerHTML = `<input type="checkbox" data-key="${key}" data-value="${valueToSend}"> ${displayValue}`;
                filterSection.appendChild(filterValue);
            });

            filterPanel.appendChild(filterSection);
        }
    }

    // Event listener to toggle the display of the filter panel
    filterBtn.addEventListener('click', () => {
        filterPanel.style.display = filterPanel.style.display === 'none' ? 'block' : 'none';
    });

    /**
     * Event listener for filter changes to update the product display based on selected filters
     */
    filterPanel.addEventListener('change', async (event) => {
        const checkboxes = filterPanel.querySelectorAll('input[type="checkbox"]:checked');
        const filtersToSend = {};
        checkboxes.forEach(checkbox => {
            const key = checkbox.getAttribute('data-key');
            const value = checkbox.getAttribute('data-value');
            if (!filtersToSend[key]) {
                filtersToSend[key] = [];
            }
            filtersToSend[key].push(value);
        });

        console.log(filtersToSend);
        const filteredProducts = await fetchJson(productsUrl, filtersToSend);
        loadProducts(filteredProducts);
    });

    // Fetch initial products and filters data
    const initialProducts = await fetchJson(productsUrl);
    const filters = await fetchJson(filtersUrl);

    // Load initial data
    loadProducts(initialProducts);
    loadFilters(filters);
});