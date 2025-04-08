import state from "src/store/state";
import { generateRandomCarData } from "src/utils/utils";
import { createNewCarInGarage } from "src/api/api";
import renderGarageContent from "src/render/render";
import createElement from "../../utils/createElement";
import { inputUpdateCarColor, inputUpdateCarModel, updateCar } from "../modes/updateCar";
import { createNewCar, inputChooseCarColor, inputChooseCarModel } from "../modes/createNewCar";

export const chooseModesContainer = createElement({
  tagName: "div",
  classNames: ["choose-modes-container"],
});
const chooseContainer = createElement({ tagName: "div", classNames: ["choose-container"] });
const createCarButton = createElement({
  tagName: "button",
  classNames: ["create-button"],
  textContent: "create",
  attributes: { name: "color-button" },
});
const updateContainer = createElement({ tagName: "div", classNames: ["update-container"] });
const updateCarButton = createElement({
  tagName: "button",
  classNames: ["update-button"],
  textContent: "update",
  attributes: { name: "color-button" },
});
const raceButtonsContainer = createElement({
  tagName: "div",
  classNames: ["race-buttons-container"],
});
const raceButton = createElement({
  tagName: "button",
  classNames: ["race-button"],
  textContent: "race",
  attributes: { id: "race", name: "race" },
});
const resetButton = createElement({
  tagName: "button",
  classNames: ["reset-button"],
  textContent: "reset",
  attributes: { id: "reset", name: "reset" },
});
const generateCarsButton = createElement({
  tagName: "button",
  classNames: ["generate-button"],
  textContent: "generate cars",
  attributes: { id: "generate", name: "generate" },
});

state.components.inputUpdateCarModel = inputUpdateCarModel;
state.components.inputUpdateCarColor = inputUpdateCarColor;

chooseContainer.append(inputChooseCarModel, inputChooseCarColor, createCarButton);
updateContainer.append(inputUpdateCarModel, inputUpdateCarColor, updateCarButton);
raceButtonsContainer.append(raceButton, resetButton, generateCarsButton);
chooseModesContainer.append(chooseContainer, updateContainer, raceButtonsContainer);

document.body.append(chooseModesContainer);

async function generateCars() {
  const carPromises = [];

  for (let i = 0; i < 100; i += 1) {
    const randomCar = generateRandomCarData();
    carPromises.unshift(createNewCarInGarage(randomCar));
  }

  await Promise.all(carPromises);
  await renderGarageContent();
  state.components.nextButton?.classList.remove("next-button_disabled");
}

createCarButton.addEventListener("click", createNewCar);
updateCarButton.addEventListener("click", updateCar);
generateCarsButton.addEventListener("click", generateCars);

export default chooseModesContainer;
