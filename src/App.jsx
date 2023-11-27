import { useEffect, useState } from "react";
import "./App.css";
import FabricCanvas from "./FabricCanvas";
import Sentnece from "./Sentnece";
import StartMenu from "./StartMenu";

function App() {
  const [sentenceToType, setSentenceToType] = useState(
    "this is the sentence to type, and it's ending now. this is the sentence to type, and it's ending now. this is the sentence to type, and it's ending now. this is the sentence to type, and it's ending now."
  );
  const [typeIndex, setTypeIndex] = useState(0);
  const [gameInProgress, setGameInProgress] = useState(true);
  const [nextLetterToType, setNextLetterToType] = useState(
    sentenceToType[typeIndex]
  );
  console.log(nextLetterToType);
  console.log(typeIndex);
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === nextLetterToType) {
        setTypeIndex((prev) => prev + 1);
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [nextLetterToType]);

  useEffect(() => {
    setNextLetterToType(sentenceToType[typeIndex]);
  }, [typeIndex]);

  const changeGameStatus = () => {
    setGameInProgress((prev) => !prev);
  };

  return (
    <div>
      {gameInProgress ? (
        <StartMenu changeGameStatus={changeGameStatus} />
      ) : (
        <div>
          <FabricCanvas typeIndex={typeIndex} sentenceToType={sentenceToType} />
          <Sentnece sentenceToType={sentenceToType} typeIndex={typeIndex} />
        </div>
      )}
    </div>
  );
}

export default App;
