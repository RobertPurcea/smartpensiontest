import { turnModeEnum } from "./constants";

export const getInitialGameState = ({ numberOfPlayers, numberOfAI }) => {
  return {
    numberOfPlayers,
    numberOfAI,
    error: false,
    turnMode: getRandomTurnMode(),
    data: [
      ...Array(numberOfPlayers).fill({
        card: null,
        score: 0
      }),
      ...Array(numberOfAI).fill({
        ai: true,
        card: null,
        score: 0
      })
    ]
  };
};

export const getResetGameStateKeepingScores = oldState => {
  return {
    ...oldState,
    data: oldState.data.map(singlePlayerData => ({
      ...singlePlayerData,
      card: null
    }))
  };
};

export const areAllCardsTurned = (gameData, numberOfPlayers, numberOfAI) => {
  let areAllCardsTurned = true;
  const totalNumberOfPlayers = numberOfPlayers + numberOfAI;

  for (let i = 0; i < totalNumberOfPlayers; i++) {
    if (!gameData[i] || !gameData[i].card) {
      areAllCardsTurned = false;
    }
  }

  return areAllCardsTurned;
};

export const getWinnerIndex = (gameData, turnMode) => {
  let cardPowers = gameData.map(playerData => {
    const power = parseInt(
      getStandardCardAttributes(playerData.card, turnMode).power
    );

    return power || 0;
  });

  const highestPower = Math.max(...cardPowers);
  const occurenceMap = getMapWithArrayElementOccurences(cardPowers);

  // if there are 2 or more cards with the same power, there is no winner
  if (occurenceMap[highestPower] > 1) {
    return -1;
  } else {
    return cardPowers.indexOf(Math.max(...cardPowers));
  }
};

export const getStandardCardAttributes = (card, turnMode) => {
  if (turnMode === turnModeEnum.PEOPLE) {
    return {
      power: card.mass,
      name: card.name,
      type: turnModeEnum.PEOPLE,
      additionalInfo: card.birth_year
    };
  }

  if (turnMode === turnModeEnum.STARSHIPS) {
    return {
      power: card.crew,
      name: card.name,
      type: turnModeEnum.STARSHIPS,
      additionalInfo: card.model
    };
  }

  return {};
};

export function getRandomTurnMode() {
  const randomKey = Object.keys(turnModeEnum)[getRandomInt(0, 1)];

  return turnModeEnum[randomKey];
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getMapWithArrayElementOccurences(arr) {
  var counts = {};

  for (var i = 0; i < arr.length; i++) {
    var num = arr[i];
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  return counts;
}
