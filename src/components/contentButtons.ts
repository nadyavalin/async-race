import createElement from "../utils/createElement";
import {
  createWinnersTable,
  garageArea,
  renderGarageContent,
  showGaragePage,
  winnersContent,
} from "./functions";
import { state } from "../store/state";
import { chooseModesContainer } from "./modesArea";

export const chooseRoomContainer = createElement({
  tagName: "div",
  classNames: ["choose-room-container"],
});

const toGarage = createElement({
  tagName: "button",
  classNames: ["garage-button", "garage-button_disabled"],
  textContent: "To garage",
  attributes: {
    id: "garage",
    name: "garage",
  },
});
const toWinners = createElement({
  tagName: "button",
  classNames: ["winners-button"],
  textContent: "To winners",
  attributes: {
    id: "winners",
    name: "winners",
  },
});
export const prevNextButtons = createElement({ tagName: "div", classNames: ["prev-next-buttons"] });
export const prevButton = createElement({
  tagName: "button",
  classNames: ["prev-button"],
  textContent: "prev",
  attributes: { id: "prev", name: "prev" },
});
export const nextButton = createElement({
  tagName: "button",
  classNames: ["next-button"],
  textContent: "next",
  attributes: { id: "next", name: "next" },
});
state.components.nextButton = nextButton;

chooseRoomContainer.append(toGarage, toWinners);
prevNextButtons.append(prevButton, nextButton);

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
  document.body.append(winnersTable, prevNextButtons);
});

toGarage.addEventListener("click", async () => {
  toGarage.classList.add("garage-button_disabled");
  toWinners.classList.remove("winners-button_disabled");
  garageArea.innerHTML = "";
  const garagePage = await showGaragePage();
  garageArea.append(garagePage);
  document.body.removeChild(winnersContent);
  document.body.append(chooseModesContainer, garageArea, prevNextButtons);
});

prevButton.addEventListener("click", async () => {
  if (state.page > 1) {
    prevButton.classList.add("prev-button_disabled");
    nextButton.classList.add("next-button_disabled");
    state.page -= 1;
    nextButton.classList.remove("next-button_disabled");
    await renderGarageContent();
    if (state.page !== 1) {
      prevButton.classList.remove("prev-button_disabled");
    }
  }
});

nextButton.addEventListener("click", async () => {
  const totalPages = Math.ceil(state.totalCars / state.carsPerPage);
  if (state.page < totalPages) {
    prevButton.classList.add("prev-button_disabled");
    nextButton.classList.add("next-button_disabled");
    state.page += 1;
    prevButton.classList.remove("prev-button_disabled");
    await renderGarageContent();
    if (state.page !== totalPages) {
      nextButton.classList.remove("next-button_disabled");
    }
  }
});
