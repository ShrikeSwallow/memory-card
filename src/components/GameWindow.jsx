import { useState, useEffect } from "react";

console.log("GameWindow loaded");

const GameWindow = () => {
  const [curr, setCurr] = useState(0);
  const [best, setBest] = useState(0);
  const [pokeArr, setPokeArr] = useState([]);
  const [cardsList, setCardsList] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);
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
            let id = index + 1;
            let name = pokemon.name;
            let img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
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
    const limit = 18;
    while (cardsSet.size !== limit) {
      cardsSet.add(Math.floor(Math.random() * pokeArr.length + 1));
    }
    const tempList = [];
    pokeArr.forEach((pokemon) => {
      if (cardsSet.has(pokemon.id)) tempList.push(pokemon);
    });
    setCardsList([...tempList]);
  };

  const shuffleCards = () => {
    const tempList = [...cardsList];
    let currentIndex = cardsList.length;

    while (currentIndex !== 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      [tempList[currentIndex], tempList[randomIndex]] = [
        tempList[randomIndex],
        tempList[currentIndex],
      ];
    }
    setCardsList([...tempList]);
  };

  const handleTurn = (event) => {
    console.log(event.currentTarget.id);
    const clickedId = Number.parseInt(event.currentTarget.id);
    if (!clickedCards.includes(clickedId)) {
      setClickedCards([...clickedCards, clickedId]);
      setCurr(curr + 1);
      shuffleCards();
    } else {
      alert("Game over");
      if (curr > best) setBest(curr);
      setGame("over");
      setClickedCards([]);
      setCurr(0);
    }
  };

  return (
    <main className="mt-8 grid grid-cols-3 pl-32 pr-32">
      <p>Current Score: {curr}</p>
      <p></p>
      <p className="place-self-end">Best Score: {best}</p>
      <p className="content-center">Current game size: {cardsList.length}</p>
      <button
        onClick={newGame}
        className="place-self-stretch rounded bg-slate-500 p-2 transition delay-100 duration-200 ease-in-out hover:bg-slate-400"
      >
        Start new game
      </button>
      <p className="content-center justify-self-end">
        Possible pokemon: {pokeArr.length}
      </p>
      {game !== "pre" && (
        <ul className="col-span-3 mt-8 grid grid-cols-6 items-center gap-6">
          {cardsList.map((card) => (
            <li
              key={card.id}
              id={card.id}
              onClick={handleTurn}
              className={game === "over" ? "pointer-events-none" : ""}
            >
              <div className="pokeCard flex flex-col items-center rounded-2xl bg-slate-800 p-4 transition delay-200 duration-100 ease-in-out hover:bg-slate-600">
                <img src={card.img} alt={card.name} className="min-w-[8vw]" />
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
