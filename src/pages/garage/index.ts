import getCarsPerPage from "src/api/api";
import deleteCar from "src/components/buttons/deleteCarButton";
import selectCar from "src/components/buttons/selectCarButton";
import { createNewCarArea, garageArea, garageContent } from "src/components/areas/createNewCarArea";
import renderGarageContent from "src/render/render";
import state from "src/store/state";
import createElement from "src/utils/createElement";

const createGarageHeader = (total: number, page: number) => {
  garageArea.innerHTML = "";

  const garageText = createElement({
    tagName: "p",
    classNames: ["garage-text"],
    textContent: `Garage (${total})`,
  });

  const pagesGarageText = createElement({
    tagName: "p",
    classNames: ["pages"],
    textContent: `Page #${page}`,
  });

  garageArea.append(garageText, pagesGarageText);
};

async function showGaragePage(): Promise<HTMLDivElement> {
  try {
    const carsResponse = await getCarsPerPage(state.page);

    state.totalCars = Number(carsResponse.total);
    state.cars = carsResponse.cars;

    createGarageHeader(state.totalCars, state.page);

    garageContent.innerHTML = "";
    carsResponse.cars.forEach((car) => {
      createNewCarArea(car);
    });

    return garageContent;
  } catch (error) {
    const errorMessage = createElement({
      tagName: "div",
      classNames: ["error-message"],
      textContent: `${error}. Failed to load garage data. Please try again later.`,
    });

    garageContent.innerHTML = "";
    garageContent.appendChild(errorMessage);
    return garageContent;
  }
}
const setupGarageEventListeners = () => {
  garageContent.addEventListener("click", async (event: Event) => {
    const eventTarget = event.target as HTMLDivElement;

    if (eventTarget?.classList.contains("remove-button")) {
      await deleteCar(eventTarget);
      await renderGarageContent();
    } else if (eventTarget?.classList.contains("select-button")) {
      selectCar(eventTarget);
    }
  });
};

setupGarageEventListeners();

export default showGaragePage;
