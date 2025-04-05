import createElement from "../utils/createElement";
import { svgCarElement, svgFlagElement } from "./svgElements";
import { Car } from "../types/interfaces";
import { state } from "../store/state";
import { getCarsPerPage, getWinners } from "../api/api";
import { deleteCar, selectCar } from "./carButtons";

export const garageContent = createElement({ tagName: "div", classNames: ["garage-content"] });
export const garageArea = createElement({ tagName: "div", classNames: ["garage-area"] });

export const winnersContent = createElement({ tagName: "div", classNames: ["winners-content"] });

export function createNewCar(car: Car) {
  const carAreaButtons = createElement({ tagName: "div", classNames: ["car-area-buttons"] });
  const selectButton = createElement({
    tagName: "button",
    classNames: ["select-button"],
    textContent: "select",
    attributes: { id: "select", name: "select" },
  });
  const removeButton = createElement({
    tagName: "button",
    classNames: ["remove-button"],
    textContent: "remove",
    attributes: { id: "remove", name: "remove" },
  });
  const modalText = createElement({
    tagName: "p",
    classNames: ["model-text"],
    textContent: `${car.name}`,
  });
  const carArea = createElement({
    tagName: "div",
    classNames: ["car-area"],
    attributes: { "data-id": `${car.id}` },
  });

  const actionButtons = createElement({ tagName: "div", classNames: ["action-buttons"] });
  const aButton = createElement({
    tagName: "button",
    classNames: ["a-button"],
    textContent: "A",
    attributes: { id: "a", name: "a" },
  });
  const bButton = createElement({
    tagName: "button",
    classNames: ["b-button"],
    textContent: "B",
    attributes: { id: "b", name: "b" },
  });
  const road = createElement({ tagName: "div", classNames: ["road"] });
  const svgCar = createElement({ tagName: "div", classNames: ["car"], innerHTML: svgCarElement });
  svgCar.style.setProperty("--svg-fill-color", car.color);

  const finishFlag = createElement({
    tagName: "div",
    classNames: ["finish-flag"],
    innerHTML: svgFlagElement,
  });
  garageArea.append(garageContent);
  actionButtons.append(aButton, bButton);
  carAreaButtons.append(selectButton, removeButton, modalText);
  carArea.append(carAreaButtons, actionButtons, svgCar, road, finishFlag);
  garageContent.prepend(carArea);
  if (state.totalCars > 7) {
    state.components.nextButton?.classList.remove("next-button_disabled");
  }
}

export async function showGaragePage(): Promise<HTMLDivElement> {
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
    createNewCar(car);
  });

  return garageContent;
}

export async function renderGarageContent() {
  garageContent.innerHTML = "";
  garageArea.innerHTML = "";
  await showGaragePage();

  const totalPages = Math.ceil(state.totalCars / state.carsPerPage);
  if (state.totalCars <= 7 || state.page === totalPages) {
    state.components.nextButton?.classList.add("next-button_disabled");
  }

  garageArea.append(garageContent);
}

const svgCar = createElement({
  tagName: "div",
  classNames: ["car", "car_small"],
  innerHTML: svgCarElement,
});

export async function createWinnersTable(): Promise<HTMLDivElement> {
  const winners = await getWinners();
  const { cars } = await getCarsPerPage();
  const table = document.createElement("table");
  table.classList.add("winners-table");

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headerRow.classList.add("head-row-table");
  const headers = ["Number", "Car", "Name", "Wins", "Best time (seconds)"];

  headers.forEach((headerText) => {
    const headerCell = document.createElement("th");
    headerCell.textContent = headerText;
    headerRow.append(headerCell);
  });
  thead.append(headerRow);
  table.append(thead);

  const tbody = document.createElement("tbody");
  for (let i = 0; i < winners.length; i += 1) {
    const row = document.createElement("tr");
    const cellNumber = document.createElement("td");
    cellNumber.textContent = `${i + 1}`;
    const cellCar = document.createElement("td");
    cellCar.append(svgCar);
    svgCar.style.setProperty("--svg-fill-color", cars[i].color);
    const cellName = document.createElement("td");
    cellName.textContent = cars[i].name;
    const cellWins = document.createElement("td");
    cellWins.textContent = winners[i].wins;
    const cellTime = document.createElement("td");
    cellTime.textContent = winners[i].time;

    cellNumber.classList.add("cell-table");
    cellCar.classList.add("cell-table");
    cellName.classList.add("cell-table");
    cellWins.classList.add("cell-table");
    cellTime.classList.add("cell-table");

    row.append(cellNumber, cellCar, cellName, cellWins, cellTime);
    tbody.append(row);
  }
  table.append(tbody);
  winnersContent.append(table);
  return winnersContent;
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
