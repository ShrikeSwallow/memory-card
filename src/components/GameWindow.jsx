import { useState, useEffect } from "react";

console.log("GameWindow loaded");

const GameWindow = () => {
  const [curr, setCurr] = useState(0);
  const [best, setBest] = useState(0);
  const [pokeArr, setPokeArr] = useState([]);
  const [cardsList, setCardsList] = useState([]);
  const [game, setGame] = useState("pre");

  useEffect(() => {
    /* get data from external API */
    let ignore = false;

    if (!ignore) {
      const fetchOgPokemon = async () => {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151",
        );
        const ogPokemon = await response.json();
        setPokeArr(
          ogPokemon.results.map((pokemon, index) => {
            const id = index + 1;
            const name = pokemon.name;
            const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
            return { id, name, img };
          }),
        );
      };
      fetchOgPokemon();
    }

    return () => {
      ignore = true;
    };
  }, []);

  const newGame = () => {
    setCurr(0);
    setGame("active");
    const cardsSet = new Set();
    const limit = 4;
    while (cardsSet.size !== limit) {
      cardsSet.add(Math.floor(Math.random() * pokeArr.length + 1));
    }
    const tempList = [];
    pokeArr.forEach((pokemon) => {
      if (cardsSet.has(pokemon.id)) tempList.push(pokemon);
    });
    console.log(tempList);
    setCardsList([...tempList]);
  };

  return (
    <main className="self-center">
      <p>Best Score: {curr}</p>
      <p>Current Score: {best}</p>
      <p>Possible pokemon: {pokeArr.length}</p>
      <p>Current game size: {cardsList.length}</p>
      <button onClick={newGame} className="rounded bg-slate-400 p-2">
        Start new game
      </button>
      {game === "active" && (
        <ul className="flex flex-wrap justify-between">
          {cardsList.map((card) => (
            <li key={card.id} className="">
              <div
                onClick={newGame}
                className="pokeCard flex flex-col items-center rounded-2xl bg-slate-600 p-4 hover:bg-slate-500"
              >
                <img src={card.img} alt={card.name} className="min-w-[10vw]" />
                <p className="select-none capitalize">{card.name}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default GameWindow;
