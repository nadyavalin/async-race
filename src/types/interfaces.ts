export interface NewCar {
  name: string;
  color: string;
}

export interface Car extends NewCar {
  id: number;
}

export interface CarsResponse {
  cars: Car[];
  total: string | null;
}

export interface CarWinner {
  id: number;
  wins: number;
  time: number;
}

export interface State {
  page: number;
  cars: Car[];
  carsPerPage: number;
  totalCars: number;
  selectedCar?: Car;
  selectedCarArea: HTMLDivElement | null;
  components: Components;
}

interface Components {
  nextButton: HTMLButtonElement | null;
  inputUpdateCarModel: HTMLInputElement | null;
  inputUpdateCarColor: HTMLInputElement | null;
}

export interface CarStatus {
  status: "started" | "stopped" | "drive";
}

export interface CarEngineResponse {
  velocity: number;
  distance: number;
}
