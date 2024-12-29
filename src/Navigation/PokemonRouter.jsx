import { HashRouter, Route, Routes } from "react-router-dom";
import React from 'react';
import AvailableSets from "../Pages/AvailableSets.jsx";
import CardsForSpecificSet from "../Pages/CardsForSpecificSet.jsx";
import Homepage from "../../src/Pages/Homepage.jsx";
import PokemonIndividualCard from "../Pages/PokemonIndividualCard.jsx";
import AvailablePokemon from "../Pages/AvailablePokemon.jsx";
import CardForSpecificPokemon from "../Pages/CardsForSpecificPokemon.jsx";

export default function PokemonRouter() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/sets" element={<AvailableSets />} />
                <Route path="/sets/*" element={<CardsForSpecificSet />} />
                <Route path="/cards/*" element={<PokemonIndividualCard />} />
                <Route path="/pokemon" element={<AvailablePokemon/>}/>
                <Route path="/pokemon/*" element={<CardForSpecificPokemon/>}/>
                <Route path="*" element={<Homepage />} />
            </Routes>
        </HashRouter>
    );
}
