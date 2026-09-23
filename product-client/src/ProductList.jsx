function ProductList({ products, handleEdit, handleDelete }) {
    return (
        <div className="product-list">
            {products.map((product) => (
                <div className="product-card" key={product.id}>
                    <h2>{product.name}</h2>

                    <p>Price: ${product.price}</p>
                    <p>Quantity: {product.quantity}</p>

                    <div className="button-row">
                        <button
                            className="edit-button"
                            onClick={() => handleEdit(product)}
                        >
                            Edit
                        </button>

                        <button
                            className="delete-button"
                            onClick={() => handleDelete(product.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductList;