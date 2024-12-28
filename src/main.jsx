import { createRoot } from 'react-dom/client'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import PokemonRouter from './Navigation/PokemonRouter.jsx'

createRoot(document.getElementById('root')).render(
  <PokemonRouter />
)
