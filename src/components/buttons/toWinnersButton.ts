import createElement from "src/utils/createElement";
import createWinnersTable from "src/pages/winners";
import { garageArea, winnersContent } from "../areas/createNewCarArea";
import toGarage from "./toGarageButton";
import { chooseModesContainer } from "../areas/modesArea";
import prevNextButtonsContainer from "../areas/prevNextButtonsArea";

const toWinners = createElement({
  tagName: "button",
  classNames: ["winners-button"],
  textContent: "To winners",
  attributes: {
    id: "winners",
    name: "winners",
  },
});

toWinners.addEventListener("click", async () => {
  toWinners.classList.add("winners-button_disabled");

  const winnersText = createElement({
    tagName: "p",
    classNames: ["winners-text"],
    textContent: "Winners (1)",
  });
  const pagesWinnersText = createElement({
    tagName: "p",
    classNames: ["pages"],
    textContent: "Page #1",
  });
  winnersContent.innerHTML = "";
  winnersContent.append(winnersText, pagesWinnersText);

  const winnersTable = await createWinnersTable();
  toGarage.classList.remove("garage-button_disabled");
  document.body.removeChild(chooseModesContainer);
  document.body.removeChild(garageArea);
  document.body.append(winnersTable, prevNextButtonsContainer);
});

export default toWinners;
