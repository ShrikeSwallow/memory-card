import { useState } from "react";

console.log("GameWindow loaded");

const fetchOgPokemon = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const ogPokemon = await response.json();
  //console.log(ogPokemon);
  ogPokemon.results.forEach((pokemon, index) => {
    //fetchPokemon(pokemon);
    console.log(index + 1, pokemon);
  });
};

const fetchPokemon = async (pokemon) => {
  let url = pokemon.url;
  const response = await fetch(url);
  const pokemonData = await response.json();
  console.log(pokemonData);
};

const GameWindow = () => {
  const [curr, setCurr] = useState(0);
  const [best, setBest] = useState(0);

  fetchOgPokemon();

  return (
    <main>
      <p>Best Score: {curr}</p>
      <p>Current Score: {best}</p>
    </main>
  );
};

export default GameWindow;
