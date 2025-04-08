import { garageArea, winnersContent } from "src/components/areas/createNewCarArea";
import chooseModesContainer from "src/components/areas/modesArea";
import prevNextButtonsContainer from "src/components/areas/prevNextButtonsArea";
import showGaragePage from "src/pages/garage";
import createElement from "src/utils/createElement";
import createRouter from "src/router/router";
import state from "src/store/state";
import createWinnersTable from "../winners";

const router = createRouter();

export const chooseRoomContainer = createElement({
  tagName: "div",
  classNames: ["choose-room-container"],
});

export const toGarage = createElement({
  tagName: "button",
  classNames: ["garage-button", "garage-button_disabled"],
  textContent: "To garage",
  attributes: {
    id: "garage",
    name: "garage",
  },
});

export const toWinners = createElement({
  tagName: "button",
  classNames: ["winners-button"],
  textContent: "To winners",
  attributes: {
    id: "winners",
    name: "winners",
  },
});

const renderGarage = async () => {
  toGarage.classList.add("garage-button_disabled");
  toWinners.classList.remove("winners-button_disabled");
  garageArea.innerHTML = "";
  const garagePage = await showGaragePage();
  garageArea.append(garagePage);

  document.body.innerHTML = "";
  document.body.append(
    chooseRoomContainer,
    chooseModesContainer,
    garageArea,
    prevNextButtonsContainer,
  );
};

const renderWinners = async (): Promise<void> => {
  try {
    toWinners.classList.add("winners-button_disabled");
    toGarage.classList.remove("garage-button_disabled");

    const winnersText = createElement({
      tagName: "p",
      classNames: ["winners-text"],
      textContent: `Winners (${state.winners.length})`,
    });

    const pagesWinnersText = createElement({
      tagName: "p",
      classNames: ["pages"],
      textContent: `Page #${state.winnersPage}`,
    });

    winnersContent.innerHTML = "";
    winnersContent.append(winnersText, pagesWinnersText);

    const winnersTable = await createWinnersTable();
    winnersContent.appendChild(winnersTable);

    document.body.innerHTML = "";
    document.body.append(chooseRoomContainer, winnersContent, prevNextButtonsContainer);
  } catch (error) {
    const errorElement = createElement({
      tagName: "div",
      classNames: ["error-message"],
      textContent: `Error rendering winners: ${error}`,
    });
    document.body.innerHTML = "";
    document.body.append(chooseRoomContainer, errorElement, prevNextButtonsContainer);
  }
};

router.addRoute("/garage", renderGarage);
router.addRoute("/winners", renderWinners);

toGarage.addEventListener("click", () => router.navigate("/garage"));
toWinners.addEventListener("click", () => router.navigate("/winners"));

chooseRoomContainer.append(toGarage, toWinners);

router.init();

router.navigate("/garage");
