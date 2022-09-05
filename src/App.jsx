import {Route, Routes} from 'react-router-dom'
import React from 'react';
import Pokedex from './Pokedex';
import Pokemon from './Pokemon';


function App() {


  return (


      //se crean las rutas
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/:pokemonId" element={<Pokemon />} />
      </Routes>

    );
  }
  
  export default App;

