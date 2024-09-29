import React, { useContext } from 'react'
import { PizzaContext } from '../context/PizzaContext'
import CardPizza from '../components/CardPizza'
import { CartContext } from '../context/CartContext'

const Home = () => {
    const { pizzas, loading, error } = useContext(PizzaContext)
    const { addToCart } = useContext(CartContext)

    if (loading) return <p>Cargando pizzas...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="container mt-4">
            <div className="row">
                {pizzas.map(pizza => (
                    <div key={pizza.id} className="col-md-4 mb-3">
                        <CardPizza pizza={pizza} addToCart={addToCart} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home
