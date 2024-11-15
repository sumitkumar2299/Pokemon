import { Routes, Route } from "react-router-dom";
import Pokedex from "../Components/Pokedex/pokedex";
import PokemonDetails from "../Components/PokemonDetails/PokemonDetails";

function CustomRoutes() {

    return(
        <Routes>
            <Route>
                <Route path="/" element={<Pokedex/>} />
                <Route path="/pokemon/:id" element={<PokemonDetails/>}/>
            </Route>

        </Routes>

    );

}

export default CustomRoutes;