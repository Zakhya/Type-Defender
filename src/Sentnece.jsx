import React from "react";
import "./sentence.css";

const Sentnece = ({ sentenceToType, typeIndex }) => {
  return (
    <div className="sentence-container">
      {sentenceToType.split("").map((letter, index) => {
        let className;

        if (typeIndex > index) {
          className = "guessedLetter";
        } else {
          className = "letter";
        }
        return (
          <div key={index} className={className}>
            {letter}
          </div>
        );
      })}
    </div>
  );
};

export default Sentnece;
