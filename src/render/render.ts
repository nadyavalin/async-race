import { garageArea, garageContent } from "src/components/areas/createNewCarArea";
import showGaragePage from "src/pages/garage";
import state from "src/store/state";

async function renderGarageContent() {
  garageContent.innerHTML = "";
  garageArea.innerHTML = "";
  await showGaragePage();

  const totalPages = Math.ceil(state.totalCars / state.carsPerPage);
  if (state.totalCars <= 7 || state.page === totalPages) {
    state.components.nextButton?.classList.add("next-button_disabled");
  }

  garageArea.append(garageContent);
}

export default renderGarageContent;
