import './ProductDetails.css';
import { useEffect, useState } from 'react';
import { Link, Route, Switch, useParams } from 'react-router-dom';
function ProductDetails({addToList}) {
    const [selectedProduct, setSelectedProduct] = useState({});
    const { id } = useParams();
    const productId=parseInt(id)
    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((response) => response.json())
            .then((data) => setSelectedProduct(data));
    }, [id]);
    return (
        <div className="selected-product">
            <h3>{selectedProduct.title}</h3>
            <img src={selectedProduct.image} alt='' />
            <h5>{selectedProduct.description}</h5>
            <h6>{selectedProduct.price}</h6>
            <button onClick={() => addToList( productId )}>+</button>
            <Link to='/'>back</Link>


        </div >

    )
}
export default ProductDetails