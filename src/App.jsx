// import { useState } from "react";
import { Fragment } from "react";
import GameWindow from "./components/GameWindow";

function App() {
  return (
    <Fragment>
      <header>
        <h1 className="text-4xl font-black">Pokemon Memory Game</h1>
        <h2 className="font text-2xl font-semibold">
          Get points by clicking on an image but don&apos;t click on any more
          than once!
        </h2>
      </header>
      <GameWindow></GameWindow>
    </Fragment>
  );
}

export default App;
