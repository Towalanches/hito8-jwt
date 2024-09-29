import React from 'react'
import { Container } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer className="footer bg-dark text-white fixed-bottom">
            <Container className="text-center">
                <p className="mb-0">© 2024 Pizzería Mamma Mia! Todos los derechos reservados.</p>
            </Container>
        </footer>
    )
}

export default Footer
