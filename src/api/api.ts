import {
  Car,
  CarsResponse,
  NewCar,
  CarEngineResponse,
  Winner,
  NewWinner,
} from "../types/interfaces";

const BASE_URL = "http://127.0.0.1:3000";
const DEFAULT_PAGE_LIMIT = 7;
const DEFAULT_WINNERS_LIMIT = 10;

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
    throw new Error(`Failed to get cars! status: ${response.status}`);
  }

  const cars: Car[] = await response.json();
  const total = response.headers.get("X-Total-Count") || "0";

  return { cars, total: parseInt(total, 10) };
}

export async function getCar(id: number): Promise<Car> {
  const response = await fetch(`${BASE_URL}/garage/${id}`);

  if (!response.ok) {
    throw new Error(`Car with id ${id} not found!`);
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

  if (!response.ok) {
    throw new Error("Failed to create new car");
  }

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

  if (!response.ok) {
    throw new Error(`Failed to update car with id ${id}`);
  }

  return response.json();
}

export async function deleteCarFromGarage(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/garage/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete car with id ${id}`);
  }
}

export async function startStopEngine(
  id: number,
  status: "started" | "stopped",
): Promise<CarEngineResponse> {
  const response = await fetch(`${BASE_URL}/engine?id=${id}&status=${status}`, {
    method: "PATCH",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to ${status} engine: ${error.message}`);
  }

  return response.json();
}

export async function switchToDriveMode(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/engine?id=${id}&status=drive`, {
      method: "PATCH",
    });

    if (!response.ok) {
      const error = await response.json();
      return error;
    }
    return true;
  } catch (error) {
    return false;
  }
}

export async function getWinners(
  page?: number,
  limit: number = DEFAULT_WINNERS_LIMIT,
  sort?: "id" | "wins" | "time",
  order?: "ASC" | "DESC",
): Promise<{ winners: Winner[]; total: number }> {
  const url = new URL(`${BASE_URL}/winners`);

  if (page) {
    url.searchParams.append("_page", page.toString());
    url.searchParams.append("_limit", limit.toString());
  }
  if (sort) url.searchParams.append("_sort", sort);
  if (order) url.searchParams.append("_order", order);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to get winners! status: ${response.status}`);
  }

  const winners: Winner[] = await response.json();
  const total = response.headers.get("X-Total-Count") || "0";

  return { winners, total: parseInt(total, 10) };
}

export async function getWinner(id: number): Promise<Winner> {
  const response = await fetch(`${BASE_URL}/winners/${id}`);

  if (!response.ok) {
    throw new Error(`Winner with id ${id} not found!`);
  }

  return response.json();
}

export async function createWinner(winnerData: NewWinner): Promise<Winner> {
  const response = await fetch(`${BASE_URL}/winners`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(winnerData),
  });

  if (!response.ok) {
    throw new Error("Failed to create new winner");
  }

  return response.json();
}

export async function updateWinner(winnerData: Winner): Promise<Winner> {
  const { id } = winnerData;
  const response = await fetch(`${BASE_URL}/winners/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(winnerData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update winner with id ${id}`);
  }

  return response.json();
}

export async function deleteWinner(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/winners/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete winner with id ${id}`);
  }
}

export async function saveRaceResult(winnerId: number, raceTime: number): Promise<void> {
  try {
    const existingWinner = await getWinner(winnerId);
    await updateWinner({
      id: winnerId,
      wins: existingWinner.wins + 1,
      time: Math.min(existingWinner.time, raceTime),
    });
  } catch (error) {
    await createWinner({
      id: winnerId,
      wins: 1,
      time: raceTime,
    });
  }
}
