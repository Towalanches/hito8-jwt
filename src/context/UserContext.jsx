import React, { createContext, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [email, setEmail] = useState(null)

    /* Método para hacer login */
    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || 'Error al iniciar sesión. Verifique sus credenciales.')
            }
            setToken(data.token)
            setEmail(data.email)
        } catch (error) {
            console.error('Error al hacer login:', error)
            throw error /* Lanza un error para manejarlo en el componente login en caso de ingresar credenciales incorrectas */
        }
    }

    /* Método para hacer registro */
    const register = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
            const data = await response.json()
            if (response.ok) {
                setToken(data.token)
                setEmail(data.email)
            } else {
                console.error(data.message)
            }
        } catch (error) {
            console.error('Error al hacer register:', error)
        }
    }

    /* Método para hacer logout */
    const logout = () => {
        setToken(null)
        setEmail(null)
    }

    /* Método para obtener perfil del usuario */
    const getProfile = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/me', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const data = await response.json()
            if (response.ok) {
                setEmail(data.email)
            } else {
                console.error(data.message)
            }
        } catch (error) {
            console.error('Error al obtener perfil:', error)
        }
    }

    return (
        <UserContext.Provider value={{ token, email, login, register, logout, getProfile }}>
            {children}
        </UserContext.Provider>
    )
}
