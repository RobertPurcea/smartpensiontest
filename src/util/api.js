import { turnModeEnum } from "./constants";
import axios from "axios";

const root = "https://swapi.co/api/";

const getRandomPeople = () => {
  const totalNumberOfPeople = 87;
  const randomPersonIndex = Math.floor(Math.random() * totalNumberOfPeople) + 1;

  return axios.get(`${root}people/${randomPersonIndex}/`);
};

// the api for fetching starships sends a valid response only if called with the ship indexes in possibleShipIndexes
const getRandomStarship = () => {
  const possibleShipIndexes = [5, 15, 9, 10, 11, 12, 13, 21, 22, 23];

  const randomStarshipIndex = Math.floor(
    Math.random() * possibleShipIndexes.length
  );

  return axios.get(
    `${root}starships/${possibleShipIndexes[randomStarshipIndex]}/`
  );
};

export function getResources(turnMode) {
  if (turnMode === turnModeEnum.PEOPLE) {
    return getRandomPeople();
  } else if (turnMode === turnModeEnum.STARSHIPS) {
    return getRandomStarship();
  }
}

export default root;
