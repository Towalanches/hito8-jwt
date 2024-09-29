import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'

const Profile = () => {
    const { email, getProfile, logout } = useContext(UserContext)

    useEffect(() => {
        getProfile() /* Obtener los datos del perfil cuando se cargue la página */
    }, [])

    return (
        <div className='container'>
            <h2>Perfil del Usuario</h2>
            {email ? (
                <>
                    <p>Email: {email}</p>
                    <button onClick={logout}>Cerrar sesión</button>
                </>
            ) : (
                <p>Cargando perfil...</p>
            )}
        </div>
    )
}

export default Profile
