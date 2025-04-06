import { Car, CarsResponse, CarWinner, NewCar, CarEngineResponse } from "../types/interfaces";

const BASE_URL = "http://127.0.0.1:3000";
const DEFAULT_PAGE_LIMIT = 7;

export async function getCarsPerPage(
  page?: number,
  limit: number = DEFAULT_PAGE_LIMIT,
): Promise<CarsResponse> {
  const url = new URL(`${BASE_URL}/garage`);
  if (page) {
    url.searchParams.append("_page", page.toString());
    url.searchParams.append("_limit", limit.toString());
  }
  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const cars: Car[] = await response.json();
  const total = response.headers.get("X-Total-Count");

  return { cars, total };
}

export async function getWinners() {
  const apiURLGarage = `${BASE_URL}/winners`;
  const response = await fetch(apiURLGarage);
  const winners = await response.json();
  return winners;
}

export async function getWinner(id: number): Promise<CarWinner> {
  const response = await fetch(`${BASE_URL}/winners/${id}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export async function createNewCarInGarage(carData: NewCar): Promise<Car> {
  const response = await fetch(`${BASE_URL}/garage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carData),
  });
  return response.json();
}

export async function updateCarAttributes(carData: Car): Promise<Car> {
  const { id } = carData;
  const response = await fetch(`${BASE_URL}/garage/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carData),
  });
  return response.json();
}

export async function deleteCarFromGarage(id: number): Promise<void> {
  await fetch(`${BASE_URL}/garage/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function controlCarEngine(
  id: number,
  status: "started" | "stopped" | "drive",
): Promise<CarEngineResponse> {
  const response = await fetch(`${BASE_URL}/engine?id=${id}&status=${status}`, {
    method: "PATCH",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to control car engine");
  }
  return response.json();
}

export default getCarsPerPage;
