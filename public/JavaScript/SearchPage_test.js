document.addEventListener('DOMContentLoaded', async () => {
    const productsUrl = 'http://localhost/API/AllProducts';
    const filtersUrl = 'http://localhost/API/ProductsFields';

    const productContainer = document.getElementById('productContainer');
    const filterPanel = document.getElementById('filterPanel');
    const filterBtn = document.getElementById('filterBtn');

    async function fetchJson(url) {
        const response = await fetch(url);
        return response.json();
    }

    const products = await fetchJson(productsUrl);
    const filters = await fetchJson(filtersUrl);

    function duplicateProducts(products, times) {
        return products.flatMap(product => Array(times).fill(product));
    }

    const duplicatedProducts = duplicateProducts(products, 10);

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

    function loadFilters(filters) {
        filterPanel.innerHTML = '';
        for (const [key, values] of Object.entries(filters)) {
            const filterSection = document.createElement('div');
            filterSection.innerHTML = `<h3>${key}</h3>`;
            values.forEach(value => {
                const filterValue = document.createElement('div');
                filterValue.innerHTML = `<input type="checkbox" value="${value}"> ${value}`;
                filterSection.appendChild(filterValue);
            });
            filterPanel.appendChild(filterSection);
        }
    }

    filterBtn.addEventListener('click', () => {
        filterPanel.style.display = filterPanel.style.display === 'none' ? 'block' : 'none';
    });

    loadProducts(duplicatedProducts);
    loadFilters(filters);
});