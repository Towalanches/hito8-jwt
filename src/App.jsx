import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Cart from './pages/Cart'
import Pizza from './pages/Pizza'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import Footer from './components/Footer'
import { PizzaProvider } from './context/PizzaContext'
import { CartProvider } from './context/CartContext'
import { UserProvider, UserContext } from './context/UserContext'


const ProtectedRoute = ({ children }) => {
  const { token } = useContext(UserContext)
  return token ? children : <Navigate to="/login" />
}


const PublicRoute = ({ children }) => {
  const { token } = useContext(UserContext)
  return token ? <Navigate to="/" /> : children
}

function App() {
  return (
    <UserProvider>
      <PizzaProvider>
        <CartProvider>
          <Router>
            <Navbar />
            <Routes>
              {/* Ruta principal */}
              <Route path="/" element={<Home />} />

              {/* Rutas públicas */}
              <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
              <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />

              {/* Carrito - accesible a todos */}
              <Route path="/cart" element={<Cart />} />

              {/* Detalle de pizza */}
              <Route path="/pizza/:id" element={<Pizza />} />

              {/* Ruta protegida - solo accesible si hay token */}
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

              {/* Página de error */}
              <Route path="/404" element={<NotFound />} />

              {/* Ruta por defecto para redirigir a NotFound */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </Router>
        </CartProvider>
      </PizzaProvider>
    </UserProvider>
  )
}

export default App
