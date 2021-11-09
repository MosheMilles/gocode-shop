import { useContext } from 'react';
import ProductsContext from '../../contexts/ProductsContext';
import BoughtProduct from '../BoughtProduct/BoughtProduct';
import './BoughtProducts.css';
function BoughtProducts({ addToList, removeFromList,totalPrice }) {
    const { boughtProducts } = useContext(ProductsContext);
    return (
        <div>
            <h1>cart</h1>
            <h2>total price: {totalPrice}</h2>
            <section className="boughtProducts">
                {boughtProducts.map(product => <BoughtProduct key={product.id} id={product.id}
                    title={product.title} price={product.price} image={product.image} quantity={product.quantity}
                    addToList={addToList} removeFromList={removeFromList} />)
                }

            </section>
        </div>
    )

}
export default BoughtProducts;