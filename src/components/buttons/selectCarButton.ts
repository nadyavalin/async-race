import state from "src/store/state";

export default function selectCar(eventTarget: HTMLDivElement) {
  const carElement = eventTarget.closest(".car-area") as HTMLDivElement;
  if (carElement && carElement.dataset.id) {
    const carId = carElement.dataset.id;
    state.selectedCar = state.cars.find((car) => String(car.id) === carId);
    state.selectedCarArea = carElement;

    if (state.components.inputUpdateCarModel) {
      state.components.inputUpdateCarModel.value = state.selectedCar?.name ?? "";
    }

    if (state.components.inputUpdateCarColor) {
      state.components.inputUpdateCarColor.value = state.selectedCar?.color ?? "";
    }
  }
}
