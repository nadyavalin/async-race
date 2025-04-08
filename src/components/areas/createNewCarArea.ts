import { startCarAnimation, stopCarAnimation } from "src/animation";
import createElement from "../../utils/createElement";
import { svgCarElement, svgFlagElement } from "../svgElements";
import { Car } from "../../types/interfaces";
import state from "../../store/state";

export const garageContent = createElement({ tagName: "div", classNames: ["garage-content"] });
export const garageArea = createElement({ tagName: "div", classNames: ["garage-area"] });
export const winnersContent = createElement({ tagName: "div", classNames: ["winners-content"] });
export function createNewCarArea(car: Car) {
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

  aButton.addEventListener("click", async () => {
    aButton.innerHTML = '<div class="spinner"></div>';
    aButton.disabled = true;
    bButton.disabled = false;

    try {
      await startCarAnimation(car.id.toString(), svgCar);
      aButton.textContent = "A";
    } catch (error) {
      aButton.textContent = "A";
      aButton.style.backgroundColor = "#ff9800";
    } finally {
      aButton.disabled = false;
    }
  });

  bButton.addEventListener("click", () => {
    bButton.disabled = true;
    stopCarAnimation(car.id.toString());
    bButton.disabled = false;
  });

  if (state.totalCars > 7) {
    state.components.nextButton?.classList.remove("next-button_disabled");
  }
}
