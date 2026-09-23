const API_URL = import.meta.env.VITE_API_URL;

async function throwValidationError(response) {
    const errorData = await response.json();

    const messages = Object.values(errorData.errors)
        .flat()
        .join(" ");

    throw new Error(messages);
}

export async function getProducts() {
    const response = await fetch(`${API_URL}/api/products`);

    if (!response.ok) {
        throw new Error("Failed to load products.");
    }

    return response.json();
}

export async function createProduct(productData) {
    const response = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
    });

    if (!response.ok) {
        await throwValidationError(response);
    }

    return response.json();
}

export async function updateProduct(id, productData) {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
    });

    if (!response.ok) {
        await throwValidationError(response);
    }
}

export async function deleteProduct(id) {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete product.");
    }
}