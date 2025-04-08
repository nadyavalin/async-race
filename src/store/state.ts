import { AppState } from "../types/interfaces";

const state: AppState = {
  cars: [],
  winners: [],
  carsPerPage: 7,
  winnersPerPage: 10,
  garagePage: 1,
  winnersPage: 1,
  totalCars: 0,
  totalWinners: 0,
  selectedCar: undefined,
  sortBy: "id",
  sortOrder: "ASC",
  selectedCarArea: null,
  components: {
    inputUpdateCarColor: null,
    inputUpdateCarModel: null,
    nextButton: null,
  },
};

export default state;
