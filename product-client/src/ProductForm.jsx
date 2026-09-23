function ProductForm({
    name,
    setName,
    price,
    setPrice,
    quantity,
    setQuantity,
    handleSubmit,
    editingId,
    resetForm
}) {
    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Product name"
            />

            <input
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="Price"
            />

            <input
                type="number"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                placeholder="Quantity"
            />

            <button type="submit">
                {editingId === null ? "Add Product" : "Update Product"}
            </button>

            {editingId !== null && (
                <button type="button" onClick={resetForm}>
                    Cancel
                </button>
            )}
        </form>
    );
}

export default ProductForm;