import getCarsPerPage from "src/api/api";
import deleteCar from "src/components/buttons/deleteCarButton";
import selectCar from "src/components/buttons/selectCarButton";
import { createNewCarArea, garageArea, garageContent } from "src/components/areas/createNewCarArea";
import renderGarageContent from "src/render/render";
import state from "src/store/state";
import createElement from "src/utils/createElement";

async function showGaragePage(): Promise<HTMLDivElement> {
  const carsResponse = await getCarsPerPage(state.page);
  const garageText = createElement({
    tagName: "p",
    classNames: ["garage-text"],
    textContent: `Garage (${carsResponse.total})`,
  });
  state.totalCars = Number(carsResponse.total);
  const pagesGarageText = createElement({
    tagName: "p",
    classNames: ["pages"],
    textContent: `Page #${state.page}`,
  });
  garageArea.append(garageText, pagesGarageText);
  state.cars = carsResponse.cars;
  carsResponse.cars.forEach((car) => {
    createNewCarArea(car);
  });

  return garageContent;
}

garageContent.addEventListener("click", async (event: Event) => {
  const eventTarget = event.target as HTMLDivElement;
  if (eventTarget?.classList.contains("remove-button")) {
    await deleteCar(eventTarget);
    await renderGarageContent();
  } else if (eventTarget?.classList.contains("select-button")) {
    selectCar(eventTarget);
  }
});

export default showGaragePage;
