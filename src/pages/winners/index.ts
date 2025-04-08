import { getWinners } from "src/api/api";
import state from "src/store/state";
import { winnersContent } from "src/components/areas/createNewCarArea";
import { svgCarElement } from "src/components/svgElements";
import createElement from "src/utils/createElement";

async function updateWinnersTable(): Promise<void> {
  try {
    while (winnersContent.firstChild) {
      winnersContent.removeChild(winnersContent.firstChild);
    }

    const winnersResponse = await getWinners();
    const winners = Array.isArray(winnersResponse?.winners) ? winnersResponse.winners : [];

    if (winners.length === 0) {
      const noWinnersMessage = createElement({
        tagName: "div",
        classNames: ["no-winners-message"],
        textContent: "No winners yet. Be the first!",
      });
      winnersContent.appendChild(noWinnersMessage);
      return;
    }

    const table = document.createElement("table");
    table.classList.add("winners-table");

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    headerRow.classList.add("head-row-table");

    ["Number", "Car", "Name", "Wins", "Best time (seconds)"].forEach((headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);
    const tbody = document.createElement("tbody");
    const sortedWinners = [...winners].sort((a, b) => {
      if (b.wins !== a.wins) return b.wins - a.wins;
      return a.time - b.time;
    });

    sortedWinners.forEach((winner, index) => {
      const car = state.cars.find((c) => c.id === winner.id) || {
        id: winner.id,
        name: `Car ${winner.id}`,
        color: "#000000",
      };

      const row = document.createElement("tr");
      [
        { value: (index + 1).toString(), class: "number-cell" },
        {
          value: createElement({
            tagName: "div",
            classNames: ["car", "car_small"],
            innerHTML: svgCarElement,
          }),
          class: "car-cell",
          process: (el: HTMLElement) => {
            el.style.setProperty("--svg-fill-color", car.color);
            return el;
          },
        },
        { value: car.name, class: "name-cell" },
        { value: winner.wins.toString(), class: "wins-cell" },
        { value: winner.time.toFixed(2), class: "time-cell" },
      ].forEach((cellConfig) => {
        const td = document.createElement("td");
        td.classList.add("cell-table", cellConfig.class);

        if (typeof cellConfig.value === "string") {
          td.textContent = cellConfig.value;
        } else {
          const element = cellConfig.process
            ? cellConfig.process(cellConfig.value)
            : cellConfig.value;
          td.appendChild(element);
        }

        row.appendChild(td);
      });

      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    winnersContent.appendChild(table);
  } catch (error) {
    winnersContent.innerHTML = "";
    const errorMessage = createElement({
      tagName: "div",
      classNames: ["error-message"],
      textContent: "Failed to load winners data. Please try again later.",
    });
    winnersContent.appendChild(errorMessage);
  }
}

export default updateWinnersTable;
