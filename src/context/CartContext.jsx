import React, { createContext, useState } from 'react'


export const CartContext = createContext()


export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])

    const addToCart = (pizza) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === pizza.id)
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === pizza.id ? { ...item, count: item.count + 1 } : item
                )
            } else {
                return [...prevCart, { ...pizza, count: 1 }]
            }
        })
    }

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id))
    }

    const increaseQuantity = (id) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id ? { ...item, count: item.count + 1 } : item
            )
        )
    }

    const decreaseQuantity = (id) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === id && item.count > 1 ? { ...item, count: item.count - 1 } : item
            ).filter(item => item.count > 0)
        )
    }

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.count, 0)

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice }}>
            {children}
        </CartContext.Provider>
    )
}
