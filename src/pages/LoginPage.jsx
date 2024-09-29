import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { login } = useContext(UserContext)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')  /* Limpiar el mensaje de error antes de intentar iniciar sesión */

        // Validación básica
        if (!email || !password) {
            setError('Todos los campos son obligatorios.')
            return
        }

        try {
            await login(email, password)
            navigate('/profile') /* Navegar a la página de inicio después del login exitoso */
        } catch (err) {
            setError(err.message) /* Mostrar el error proporcionado por el contexto */
        }
    }

    return (
        <div className="container mt-4">
            <h2>Iniciar Sesión</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Ingresa tu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mt-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-3">
                    Iniciar Sesión
                </Button>
            </Form>
        </div>
    )
}

export default LoginPage
