import React from "react";
import "./App.css";
import { RecoilRoot } from "recoil";
import GameBoard from "./components/GameBoard";

function App() {
  return (
    <RecoilRoot>
      <GameBoard />
    </RecoilRoot>
  );
}

export default App;
