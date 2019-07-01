import React from "react";

const GameSettings = ({ numberOfAI, numberOfPlayers, onChange }) => {
  return (
    <React.Fragment>
      <label htmlFor="playerNumberDropdown"> Select number of players </label>
      <select
        id="playerNumberDropdown"
        name="numberOfPlayers"
        value={numberOfPlayers}
        onChange={onChange}
      >
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
      </select>
      <label htmlFor="aiNumberDropdown"> Select number of bots </label>
      <select
        id="aiNumberDropdown"
        name="numberOfAI"
        value={numberOfAI}
        onChange={onChange}
      >
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
      </select>
    </React.Fragment>
  );
};

export default GameSettings;
