import { createNewCarInGarage } from "src/api/api";
import createElement from "src/utils/createElement";
import renderGarageContent from "src/render/render";
import { createNewCarArea } from "../areas/createNewCarArea";

export const inputChooseCarModel = createElement({
  tagName: "input",
  classNames: ["input-car-model"],
  attributes: { type: "text", placeholder: "Choose the model" },
});

export const inputChooseCarColor = createElement({
  tagName: "input",
  classNames: ["input-color"],
  attributes: { type: "color", name: "color" },
});

export async function createNewCar() {
  const newCar = await createNewCarInGarage({
    name: inputChooseCarModel.value,
    color: inputChooseCarColor.value,
  });
  createNewCarArea(newCar);
  inputChooseCarModel.value = "";
  inputChooseCarColor.value = "#000000";
  await renderGarageContent();
}
