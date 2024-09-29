// Cart.jsx
import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { UserContext } from '../context/UserContext'
import { Button, Alert } from 'react-bootstrap'

const Cart = () => {
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart, totalPrice } = useContext(CartContext)
    const { token } = useContext(UserContext)
    const [successMessage, setSuccessMessage] = useState('')

    const handleCheckout = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/checkouts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ cart }),
            })

            if (response.ok) {
                setSuccessMessage('Compra realizada con éxito')
            } else {
                const data = await response.json()
                console.error(data.message)
            }
        } catch (error) {
            console.error('Error al realizar la compra:', error)
        }
    }

    return (
        <div className="container mt-4">
            <h2>Carrito de Compras</h2>
            <ul className="list-group">
                {cart.map((pizza) => (
                    <li key={pizza.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <img src={pizza.img} alt={pizza.name} width="50" />
                        <span>{pizza.name}</span>
                        <span>${pizza.price}</span>
                        <div>
                            <Button onClick={() => decreaseQuantity(pizza.id)} variant="danger">-</Button>
                            <span className="mx-2">{pizza.count}</span>
                            <Button onClick={() => increaseQuantity(pizza.id)} variant="success">+</Button>
                            <Button onClick={() => removeFromCart(pizza.id)} variant="danger" className="mx-2">
                                Eliminar
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
            <h3 className="mt-4">Total: ${totalPrice.toLocaleString()}</h3>
            <Button className="btn btn-primary mt-2" onClick={handleCheckout} disabled={!token}>
                Pagar
            </Button>
            {!token && <p className="text-danger mt-2">Debes iniciar sesión para realizar el pago.</p>}
            {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
        </div>
    )
}

export default Cart
