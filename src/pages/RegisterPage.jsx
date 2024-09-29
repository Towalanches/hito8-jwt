import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'

const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const { register } = useContext(UserContext)
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()

        /* Validaciones */
        if (!email || !password || !confirmPassword) {
            setError('Todos los campos son obligatorios.')
            return
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.')
            return
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.')
            return
        }

        try {
            await register(email, password)
            navigate('/')  /* Navegar a la página de inicio después del registro exitoso */
        } catch (err) {
            setError('Error al registrar. Por favor, intenta de nuevo.')
        }
    }

    return (
        <div className="container mt-4">
            <h2>Registro de Usuario</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleRegister}>
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
                <Form.Group controlId="formConfirmPassword" className="mt-3">
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirma tu contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-3">
                    Registrarse
                </Button>
            </Form>
        </div>
    )
}

export default RegisterPage
