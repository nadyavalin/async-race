export interface NewCar {
  name: string;
  color: string;
}

export interface Car extends NewCar {
  id: number;
}

export interface CarsResponse {
  cars: Car[];
  total: number;
}

export interface NewWinner {
  id: number;
  wins: number;
  time: number;
}

export interface Winner extends NewWinner {
  name?: string;
  color?: string;
}

export interface WinnersResponse {
  winners: Winner[];
  total: number;
}

export interface AppState {
  garagePage: number;
  winnersPage: number;
  cars: Car[];
  winners: Winner[];
  carsPerPage: number;
  winnersPerPage: number;
  totalCars: number;
  totalWinners: number;
  selectedCar?: Car;
  sortBy: "id" | "wins" | "time";
  sortOrder: "ASC" | "DESC";
  selectedCarArea: HTMLDivElement | null;
  components: Components;
}

interface Components {
  nextButton: HTMLButtonElement | null;
  inputUpdateCarModel: HTMLInputElement | null;
  inputUpdateCarColor: HTMLInputElement | null;
}

export interface EngineStatus {
  status: "started" | "stopped" | "drive";
}

export interface CarEngineResponse {
  velocity: number;
  distance: number;
}

export interface DriveModeResponse {
  success: boolean;
}
