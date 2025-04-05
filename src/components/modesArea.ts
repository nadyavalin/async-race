import { state } from "src/store/state";
import { generateRandomCarData } from "src/utils/utils";
import { createNewCarInGarage, updateCarAttributes } from "src/api/api";
import createElement from "../utils/createElement";
import { createNewCar, renderGarageContent } from "./functions";

const inputChooseCarModel = createElement({
  tagName: "input",
  classNames: ["input-car-model"],
  attributes: { type: "text", placeholder: "Choose the model" },
});
const inputChooseCarColor = createElement({
  tagName: "input",
  classNames: ["input-color"],
  attributes: { type: "color", name: "color" },
});
const inputUpdateCarModel = createElement({
  tagName: "input",
  classNames: ["input-car-model"],
  attributes: { type: "text", placeholder: "Choose the model" },
});
const inputUpdateCarColor = createElement({
  tagName: "input",
  classNames: ["input-color"],
  attributes: { type: "color", name: "color" },
});
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
  attributes: { name: "race" },
});
const resetButton = createElement({
  tagName: "button",
  classNames: ["reset-button"],
  textContent: "reset",
  attributes: { name: "reset" },
});
const generateCarsButton = createElement({
  tagName: "button",
  classNames: ["generate-button"],
  textContent: "generate cars",
  attributes: { name: "generate" },
});

state.components.inputUpdateCarModel = inputUpdateCarModel;
state.components.inputUpdateCarColor = inputUpdateCarColor;

chooseContainer.append(inputChooseCarModel, inputChooseCarColor, createCarButton);
updateContainer.append(inputUpdateCarModel, inputUpdateCarColor, updateCarButton);
raceButtonsContainer.append(raceButton, resetButton, generateCarsButton);
chooseModesContainer.append(chooseContainer, updateContainer, raceButtonsContainer);

document.body.append(chooseModesContainer);

async function createNewCarItem() {
  const newCar = await createNewCarInGarage({
    name: inputChooseCarModel.value,
    color: inputChooseCarColor.value,
  });
  createNewCar(newCar);
  inputChooseCarModel.value = "";
  inputChooseCarColor.value = "#000000";
  await renderGarageContent();
}

async function updateCar() {
  if (state.selectedCar && state.selectedCarArea) {
    const updatedCarData = {
      name: inputUpdateCarModel.value,
      color: inputUpdateCarColor.value,
      id: state.selectedCar.id,
    };
    await updateCarAttributes(updatedCarData);

    if (updatedCarData) {
      const newName = state.selectedCarArea.querySelector(".model-text") as HTMLElement | null;
      const newColor = state.selectedCarArea.querySelector(".car") as HTMLElement | null;

      if (newName) {
        newName.innerText = updatedCarData.name;
        state.selectedCar.name = updatedCarData.name;
        inputUpdateCarModel.value = "";
      }
      if (newColor) {
        newColor.removeAttribute("style");
        newColor.style.fill = updatedCarData.color;
        state.selectedCar.color = updatedCarData.color;
        inputUpdateCarColor.value = "#000000";
      }
    }
  }
  await renderGarageContent();
}

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

createCarButton.addEventListener("click", createNewCarItem);
updateCarButton.addEventListener("click", updateCar);
generateCarsButton.addEventListener("click", generateCars);

export default chooseModesContainer;
