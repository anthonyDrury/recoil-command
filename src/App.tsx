import React, { useState } from "react";
import "./App.css";
import { RecoilRoot } from "recoil";
import GameBoard from "./components/GameBoard";
import PreGame from "./components/PreGame";

function App() {
  const [preGame, setPreGame] = useState(true);

  return (
    <RecoilRoot>
      {preGame ? <PreGame onStart={() => setPreGame(false)} /> : <GameBoard />}
    </RecoilRoot>
  );
}

export default App;
