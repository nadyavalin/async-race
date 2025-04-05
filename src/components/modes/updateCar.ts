import { updateCarAttributes } from "src/api/api";
import renderGarageContent from "src/render/render";
import state from "src/store/state";
import createElement from "src/utils/createElement";

export const inputUpdateCarModel = createElement({
  tagName: "input",
  classNames: ["input-car-model"],
  attributes: { type: "text", placeholder: "Choose the model" },
});

export const inputUpdateCarColor = createElement({
  tagName: "input",
  classNames: ["input-color"],
  attributes: { type: "color", name: "color" },
});

export async function updateCar() {
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
