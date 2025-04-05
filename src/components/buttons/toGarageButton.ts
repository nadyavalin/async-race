import createElement from "src/utils/createElement";
import showGaragePage from "src/pages/garage";
import toWinners from "./toWinnersButton";
import { garageArea, winnersContent } from "../areas/createNewCarArea";
import { chooseModesContainer } from "../areas/modesArea";
import prevNextButtonsContainer from "../areas/prevNextButtonsArea";

const toGarage = createElement({
  tagName: "button",
  classNames: ["garage-button", "garage-button_disabled"],
  textContent: "To garage",
  attributes: {
    id: "garage",
    name: "garage",
  },
});

toGarage.addEventListener("click", async () => {
  toGarage.classList.add("garage-button_disabled");
  toWinners.classList.remove("winners-button_disabled");
  garageArea.innerHTML = "";
  const garagePage = await showGaragePage();
  garageArea.append(garagePage);
  document.body.removeChild(winnersContent);
  document.body.append(chooseModesContainer, garageArea, prevNextButtonsContainer);
});

export default toGarage;
