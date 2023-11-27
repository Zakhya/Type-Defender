import React from "react";
import "./startMenu.css";

const StartMenu = ({ changeGameStatus }) => {
  return (
    <div className="contentContainer">
      <h1 className="title">Type Defender</h1>
      <div className="buttonContainer">
        <button onClick={changeGameStatus}>New Game</button>
        <button onClick={changeGameStatus}>Continue</button>
        <button onClick={changeGameStatus}>Settings</button>
      </div>
    </div>
  );
};

export default StartMenu;
