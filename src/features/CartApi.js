export const addProductToCartApi = async (userId, product) => {
    try {
        const response = await fetch(`${BASE_URL}/cart/update-cart?userId=${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw error;
    }
};

export const removeProductFromCartApi = async (userId, productId) => {
    try {
        const response = await fetch(`${BASE_URL}/cart/delete-cart?userId=${userId}&productId=${productId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error removing product from cart:', error);
        throw error;
    }
};

export const getCartItemsApi = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/cart/get-cart?userId=${userId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw error;
    }
};

