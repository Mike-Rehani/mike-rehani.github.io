import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import PokemonRouter from './Navigation/PokemonRouter.jsx'

createRoot(document.getElementById('root')).render(
  <PokemonRouter />
)
