import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import { CartContext } from '../context/CartContext'

function capitalizeWords(string) {
    return string
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
}

const Pizza = () => {
    const { id } = useParams()
    const [pizza, setPizza] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const { addToCart } = useContext(CartContext)

    useEffect(() => {
        const fetchPizza = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/pizzas/${id}`)
                if (!response.ok) throw new Error('Pizza no encontrada')
                const data = await response.json()
                setPizza(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchPizza()
    }, [id])

    if (loading) return <p>Cargando pizza...</p>
    if (error) return <p>{error}</p>

    if (!pizza) return <p>Pizza no encontrada</p>

    return (
        <div className="container mt-4">
            <Card className="mx-auto">
                <Card.Img variant="top" src={pizza.img} alt={pizza.name} />
                <Card.Body>
                    <Card.Title>{capitalizeWords(pizza.name)}</Card.Title>
                    <Card.Text>{pizza.desc}</Card.Text>
                    <h4>Ingredientes:</h4>
                    <ul>
                        {pizza.ingredients.map((ingredient, index) => (
                            <li key={index}>{capitalizeWords(ingredient)}</li>
                        ))}
                    </ul>
                    <h3>Precio: ${pizza.price}</h3>

                    <Button onClick={() => addToCart(pizza)} variant="primary"> {/* Botón para añadir al carrito */}
                        Añadir al carrito
                    </Button>

                    <Link to="/" className="btn btn-secondary ms-2">Volver al Inicio</Link> {/* Botón para volver al inicio */}
                </Card.Body>
            </Card>
        </div>
    )
}

export default Pizza
