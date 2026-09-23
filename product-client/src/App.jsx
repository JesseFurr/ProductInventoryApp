import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import "./App.css";
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from "./api/productsApi";

function App() {
    const [products, setProducts] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [formError, setFormError] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [sortDirection, setSortDirection] = useState("asc");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    // Initial GET
    useEffect(() => {
        async function loadProducts() {
            try {
                const data = await getProducts();

                setProducts(data);
            }
            catch (error) {
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        const productData = {
            name: name,
            price: Number(price),
            quantity: Number(quantity)
        };

        // POST AND PUT
        if (editingId === null) {
            try {
                const createdProduct = await createProduct(productData);

                setProducts((currentProducts) => [
                    ...currentProducts,
                    createdProduct
                ]);
                resetForm();
            }
            catch (error) {
                setFormError(error.message);
            }


        } else {
            try {
                await updateProduct(editingId, productData);

                setProducts((currentProducts) =>
                    currentProducts.map((product) =>
                        product.id === editingId
                            ? {
                                ...product,
                                name: name,
                                price: Number(price),
                                quantity: Number(quantity)
                            }
                            : product
                    )
                );
                resetForm();
            }
            catch (error) {
                setFormError(error.message);
            }
        }
    }

    // DELETE
    async function handleDelete(id) {
        try {
            await deleteProduct(id);

            setProducts((currentProducts) =>
                currentProducts.filter((product) => product.id !== id)
            );
        }
        catch (error) {
            setFormError(error.message);
        }
    }

    function handleEdit(product) {
        setEditingId(product.id);
        setName(product.name);
        setPrice(product.price);
        setQuantity(product.quantity);
        setFormError("");
    }

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesMinPrice =
            minPrice === "" || product.price >= Number(minPrice);

        const matchesMaxPrice =
            maxPrice === "" || product.price <= Number(maxPrice);

        return matchesSearch && matchesMinPrice && matchesMaxPrice;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        let comparison = 0;

        if (sortBy === "name") {
            comparison = a.name.localeCompare(b.name);
        }

        if (sortBy === "price") {
            comparison = a.price - b.price;
        }

        if (sortBy === "quantity") {
            comparison = a.quantity - b.quantity;
        }

        return sortDirection === "asc"
            ? comparison
            : -comparison;
    });

    function resetForm() {
        setEditingId(null);
        setName("");
        setPrice("");
        setQuantity("");
        setFormError("");
    }

    // RETURN JSX
    return (
        <div className="app-container">
            <h1>Product App</h1>

            <ProductForm
                name={name}
                setName={setName}
                price={price}
                setPrice={setPrice}
                quantity={quantity}
                setQuantity={setQuantity}
                handleSubmit={handleSubmit}
                editingId={editingId}
                resetForm={resetForm}
            />
            {formError && <p className="form-error">{formError}</p>}
            <div className="product-controls">
                <input
                    className="search-box"
                    type="text"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search products"
                />

                <select
                    className="sort-select"
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                >
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="quantity">Quantity</option>
                </select>

                <select
                    className="sort-select"
                    value={sortDirection}
                    onChange={(event) => setSortDirection(event.target.value)}
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                <input
                    className="price-filter"
                    type="number"
                    value={minPrice}
                    onChange={(event) => setMinPrice(event.target.value)}
                    placeholder="Min price"
                />

                <input
                    className="price-filter"
                    type="number"
                    value={maxPrice}
                    onChange={(event) => setMaxPrice(event.target.value)}
                    placeholder="Max price"
                />
            </div>

            {loading && <p>Loading products...</p>}

            {error && <p>{error}</p>}

            {filteredProducts.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <ProductList
                    products={sortedProducts}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            )}
        </div>
    );
}
export default App;
