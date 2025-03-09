document.addEventListener('DOMContentLoaded', () => {
    console.log('Cart script loaded');
    const cartContainer = document.getElementById('cart-items');
    console.log('Cart container:', cartContainer);

    if (!cartContainer) {
        console.error('Cart container not found!');
        return;
    }

    const storedProducts = JSON.parse(localStorage.getItem('cartItems')) || [];
    console.log('Products in Cart:', storedProducts);

    function renderCartItems() {
        cartContainer.innerHTML = '';

        storedProducts.forEach((product, index) => {
            const cartRow = document.createElement('tr');
            cartRow.innerHTML = `
                <td>${index + 1}</td>
                <td><img src="${product.image}" alt="${product.name}" width="50"></td>
                <td>${product.name}</td>
                <td>₹${product.price}</td>
                <td><input type="number" min="1" value="${product.quantity}" class="quantity-input" data-index="${index}"></td>
                <td>₹${(product.price * product.quantity).toFixed(2)}</td>
                <td><button class="remove-btn" data-index="${index}">Remove</button></td>
            `;
            cartContainer.appendChild(cartRow);
        });

        updateCartTotal();
    }

    function updateCartTotal() {
        const totalElement = document.getElementById('total-price');
        const total = storedProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        totalElement.textContent = '₹' + total.toFixed(2);
    }

    cartContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const index = e.target.getAttribute('data-index');
            storedProducts.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(storedProducts));
            renderCartItems();
        }
    });

    cartContainer.addEventListener('input', (e) => {
        if (e.target.classList.contains('quantity-input')) {
            const index = e.target.getAttribute('data-index');
            const newQuantity = parseInt(e.target.value);
            if (newQuantity > 0) {
                storedProducts[index].quantity = newQuantity;
                localStorage.setItem('cartItems', JSON.stringify(storedProducts));
                renderCartItems();
            }
        }
    });

    renderCartItems();
});
