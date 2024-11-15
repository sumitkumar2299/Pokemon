import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
function PokemonList() {

    const [pokemonList,setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [pokedexUrl, setpokedexUrl ] = useState('https://pokeapi.co/api/v2/pokemon' );

    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl,setPrevUrl] = useState('');

    const [pokemonListState, setpokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevUrl:'',

    })
    async function downloadpokemons() {
        setIsLoading(true);
        const response = await axios.get(pokedexUrl); // this downloads list of 20 pokemons

        const pokemonResults = response.data.results; // we get the array of pokemon from result

        console.log(response.data);

        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);
        // iterating over the array of pokemons and using their url, to create an array of promises
        // that will download those 20 pokemons.
        const pokemonResultPromise = pokemonResults.map((pokemon)=>axios.get(pokemon.url));

        // passing that promise array to axios.all 

        console.log(pokemonResultPromise); // array of 20 pokemon detailed data 
        const  pokemonData = await axios.all(pokemonResultPromise);
        console.log(pokemonData);

        // Now iterate the data of each pokemon, and extract id,name, image, types
        const PokieListResult = pokemonData.map((pokeData)=>{
            const pokemon = pokeData.data;
            return{name: pokemon.name,
                id: pokemon.id,
                 image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default: pokemon.sprites.front_shiny,
                 types:pokemon.types
                }

        })
        console.log(PokieListResult);
      
        setPokemonList(PokieListResult);
        

        setIsLoading(false);
    }


    useEffect(()=>{
        downloadpokemons();
    }, [pokedexUrl]);


    return(
        <>

       <div className="Pokemon-list-wrapper">
        
        <div className="pokemon-wrapper">
        {(isLoading)? 'Loading...': 
        pokemonList.map((p)=> <Pokemon name = {p.name} image = {p.image} key = {p.id} id ={p.id}/>)
        }
        </div>
        <div className="controls">
            <button disabled ={prevUrl === null} onClick={() => setpokedexUrl(prevUrl)}>Prev</button>
            <button disabled ={nextUrl === null} onClick={()=> setpokedexUrl(nextUrl)}>Next</button>
        </div>
       
       </div>

        </>
    )




    

}

export default PokemonList;