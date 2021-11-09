import './BoughtProduct.css';
function BoughtProduct({ id, quantity, title, image, price,addToList,removeFromList }) {
   
    return (

        <div className="product-row">
            <div className="bought-product-image">
                <img
                    src={image} alt=''
                />
            </div>
            <div className="product-title">{title}</div>

            <div className="product-price">{price}</div>
            <button onClick={() => removeFromList(id)}>-</button>{quantity}<button onClick={() => addToList(id)}>+</button>
        </div>
    )
}
export default BoughtProduct;