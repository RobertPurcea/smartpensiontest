import React, { useState } from "react";

import Card from "./components/Card";
import CardBack from "./components/CardBack";
import Button from "./components/Button";
import AiContainer from "./components/AiContainer";
import GameSettings from "./components/GameSettings";
import Score from "./components/Score";
import {
  areAllCardsTurned,
  getInitialGameState,
  getResetGameStateKeepingScores,
  getStandardCardAttributes,
  getWinnerIndex
} from "./util/utility";
import { getResources } from "./util/api";

const App = () => {
  const [gameState, setgameState] = useState(
    getInitialGameState({ numberOfAI: 0, numberOfPlayers: 0 })
  );

  const { error, numberOfPlayers, data, turnMode, numberOfAI } = gameState;

  if (error) {
    return <h1>We should handle errors better...</h1>;
  }

  const cardAction = index => {
    getResources(gameState.turnMode)
      .then(response => {
        const card = response.data;

        setgameState({
          ...gameState,
          data: gameState.data.map((playerData, currIndex) => {
            return {
              ...playerData,
              card: currIndex === index ? card : playerData.card
            };
          })
        });
      })
      .catch(err => setgameState({ ...gameState, error: true }));
  };

  const onDropdownChange = e =>
    setgameState({
      ...getInitialGameState({
        numberOfPlayers: gameState.numberOfPlayers,
        numberOfAI: gameState.numberOfAI,
        [e.target.name]: parseInt(e.target.value)
      })
    });

  const finishTurn = () => {
    if (areAllCardsTurned(data, numberOfPlayers, numberOfAI)) {
      const winnerIndex = getWinnerIndex(data, turnMode);

      setgameState({
        ...gameState,
        data: data.map((singlePlayerData, index) => {
          return {
            ...singlePlayerData,
            score:
              index === winnerIndex
                ? singlePlayerData.score + 1
                : singlePlayerData.score
          };
        })
      });
    }
  };

  const nextTurnHandler = () => {
    setgameState(getResetGameStateKeepingScores(gameState));
  };

  return (
    <div>
      <div className="cardContainer">
        {data.map(({ card, ai, score }, index) => {
          if (!card) {
            return ai ? (
              <div>
                <AiContainer action={() => cardAction(index)}>
                  <CardBack />
                  <Score score={score} />
                </AiContainer>
              </div>
            ) : (
              <div>
                <CardBack onClick={() => cardAction(index)} />
                <Score score={score} />
              </div>
            );
          }

          return (
            <div>
              <Card {...getStandardCardAttributes(card, turnMode)} />
              <Score score={score} />
            </div>
          );
        })}
      </div>

      <div className="dashboardContainer">
        <Button onClick={finishTurn}>Finish turn</Button>
        <Button onClick={nextTurnHandler}>Next Turn</Button>
        <GameSettings
          onChange={onDropdownChange}
          numberOfAI={gameState.numberOfAI}
          numberOfPlayers={gameState.numberOfPlayers}
        />
      </div>
    </div>
  );
};

export default App;
