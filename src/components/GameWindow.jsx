import { useState, useEffect } from "react";

console.log("GameWindow loaded");

const GameWindow = () => {
  const [curr, setCurr] = useState(0);
  const [best, setBest] = useState(0);
  const [pokeArr, setPokeArr] = useState([]);

  useEffect(() => {
    let ignore = false;

    const fetchOgPokemon = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151",
      );
      const ogPokemon = await response.json();
      //console.log(ogPokemon);
      setPokeArr(
        ogPokemon.results.map((pokemon, index) => {
          const id = index + 1;
          const name = pokemon.name;
          const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
          return { id, name, img };
          // console.log(index + 1, pokemon);
        }),
      );
    };

    fetchOgPokemon();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <main>
      <p>Best Score: {curr}</p>
      <p>Current Score: {best}</p>
      <p>Possible pokemon: {pokeArr.length}</p>
    </main>
  );
};

export default GameWindow;
