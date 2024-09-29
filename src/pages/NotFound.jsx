import { Link } from 'react-router-dom'

const NotFound = () => (
    <div className='not-found-section'>
        <div>
            <h1>Página no encontrada</h1>
            <Link to="/"><button>Volver al inicio</button></Link>
        </div>
    </div>
)

export default NotFound
