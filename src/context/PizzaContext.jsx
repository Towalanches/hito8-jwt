import React, { createContext, useState, useEffect } from 'react'

export const PizzaContext = createContext()

export const PizzaProvider = ({ children }) => {
    const [pizzas, setPizzas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/pizzas')
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`)
                }
                const data = await response.json()
                setPizzas(data)
                setLoading(false)
            } catch (error) {
                setError('Error al cargar las pizzas.')
                setLoading(false)
            }
        }

        fetchPizzas()
    }, [])

    return (
        <PizzaContext.Provider value={{ pizzas, loading, error }}>
            {children}
        </PizzaContext.Provider>
    )
}
