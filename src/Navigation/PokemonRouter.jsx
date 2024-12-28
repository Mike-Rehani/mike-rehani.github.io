import { HashRouter, Route, Routes } from "react-router-dom";
import React from 'react';
import PokemonSets from "../../src/Pages/PokemonSets.jsx";
import PokemonIndividualSet from "../../src/Pages/PokemonIndividualSet.jsx";
import Homepage from "../../src/Pages/Homepage.jsx";
import PokemonIndividualCard from "../Pages/PokemonIndividualCard.jsx";

export default function PokemonRouter() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/sets" element={<PokemonSets />} />
                <Route path="/sets/*" element={<PokemonIndividualSet />} />
                <Route path="/cards/*" element={<PokemonIndividualCard />} />
                <Route path="*" element={<Homepage />} />
            </Routes>
        </HashRouter>
    );
}
