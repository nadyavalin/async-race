import getCarsPerPage, { getWinners } from "src/api/api";
import { winnersContent } from "src/components/areas/createNewCarArea";
import { svgCarElement } from "src/components/svgElements";
import createElement from "src/utils/createElement";

type Winner = {
  id: number;
  wins: number;
  time: number;
};

type Car = {
  id: number;
  name: string;
  color: string;
};

const createCarSvg = (color: string): HTMLElement => {
  const carSvg = createElement({
    tagName: "div",
    classNames: ["car", "car_small"],
    innerHTML: svgCarElement,
  });
  carSvg.style.setProperty("--svg-fill-color", color);
  return carSvg;
};

const createTableHeader = (): HTMLTableSectionElement => {
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headerRow.classList.add("head-row-table");

  const headers = ["Number", "Car", "Name", "Wins", "Best time (seconds)"];

  headers.forEach((headerText) => {
    const headerCell = document.createElement("th");
    headerCell.textContent = headerText;
    headerRow.append(headerCell);
  });

  thead.append(headerRow);
  return thead;
};

const createWinnerRow = (winner: Winner, car: Car, index: number): HTMLTableRowElement => {
  const row = document.createElement("tr");

  const cells = [
    { value: `${index + 1}`, class: "cell-table" },
    { value: createCarSvg(car.color), class: "cell-table" },
    { value: car.name, class: "cell-table" },
    { value: winner.wins.toString(), class: "cell-table" },
    { value: winner.time.toString(), class: "cell-table" },
  ];

  cells.forEach((cellData) => {
    const cell = document.createElement("td");
    cell.classList.add(cellData.class);

    if (typeof cellData.value === "string") {
      cell.textContent = cellData.value;
    } else {
      cell.appendChild(cellData.value);
    }

    row.appendChild(cell);
  });

  return row;
};

async function createWinnersTable(): Promise<HTMLDivElement> {
  try {
    winnersContent.innerHTML = "";
    const [winners, carsData] = await Promise.all([getWinners(), getCarsPerPage()]);

    const { cars } = carsData;
    const table = document.createElement("table");
    table.classList.add("winners-table");
    table.appendChild(createTableHeader());

    const tbody = document.createElement("tbody");
    winners.forEach((winner: Winner, index: number) => {
      const car: Car = cars.find((c: Car) => c.id === winner.id) ||
        cars[index] || {
          id: -1,
          name: "Unknown",
          color: "#000000",
        };
      tbody.appendChild(createWinnerRow(winner, car, index));
    });

    table.appendChild(tbody);
    winnersContent.appendChild(table);

    return winnersContent;
  } catch (error) {
    const errorMessage = createElement({
      tagName: "div",
      classNames: ["error-message"],
      textContent: `${error}. Failed to load winners data. Please try again later.`,
    });

    winnersContent.innerHTML = "";
    winnersContent.appendChild(errorMessage);

    return winnersContent;
  }
}

export default createWinnersTable;
