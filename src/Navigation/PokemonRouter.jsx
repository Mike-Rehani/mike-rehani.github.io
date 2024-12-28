import { BrowserRouter, Route, Routes } from "react-router-dom";
import PokemonSets from "../../src/Pages/PokemonSets.jsx"
import PokemonIndividualSet from "../../src/Pages/PokemonIndividualSet.jsx"
import Homepage from "../../src/Pages/Homepage.jsx"
import PokemonIndividualCard from "../Pages/PokemonIndividualCard.jsx";

export default function PokemonRouter(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage></Homepage>}></Route>
                <Route path="/Sets" element={<PokemonSets></PokemonSets>}></Route>
                <Route path="/Sets/*" element={<PokemonIndividualSet></PokemonIndividualSet>}></Route>
                <Route path="/Cards/*" element={<PokemonIndividualCard></PokemonIndividualCard>}></Route>
                <Route path="*" element={<Homepage></Homepage>}></Route>
            </Routes>
        </BrowserRouter>
    )
}