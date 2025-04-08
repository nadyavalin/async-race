import { deleteCarFromGarage } from "src/api/api";
import state from "../../store/state";

export default async function deleteCar(eventTarget: HTMLDivElement) {
  const carElement = eventTarget.closest(".car-area") as HTMLDivElement;
  const carId = carElement?.dataset.id;
  if (carElement && carId) {
    state.selectedCar = state.cars.find((car) => String(car.id) === carId);
    if (state.selectedCar) {
      await deleteCarFromGarage(state.selectedCar.id);
      state.selectedCar = undefined;
      state.selectedCarArea = null;
      carElement.remove();
    }
  }
}
