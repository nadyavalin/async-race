import "./index.css";
import { garageArea } from "./components/areas/createNewCarArea";
import { state } from "./store/state";
import { chooseModesContainer } from "./components/areas/modesArea";
import prevNextButtonsContainer from "./components/areas/prevNextButtonsArea";
import showGaragePage from "./pages/garage";
import { chooseRoomContainer } from "./pages/app";
import { nextButton, prevButton } from "./components/buttons/nextNextButtons";

async function loadGaragePage() {
  const totalPages = Math.ceil(state.totalCars / state.carsPerPage);
  const garagePage = await showGaragePage();
  garageArea.append(garagePage);
  document.body.append(
    chooseRoomContainer,
    chooseModesContainer,
    garageArea,
    prevNextButtonsContainer,
  );

  if (state.page === 1) {
    prevButton.classList.add("prev-button_disabled");
  }

  if (state.page === totalPages || state.totalCars <= 7) {
    nextButton.classList.add("next-button_disabled");
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadGaragePage);
} else {
  loadGaragePage();
}
