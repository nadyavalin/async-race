import state from "src/store/state";
import createElement from "src/utils/createElement";
import renderGarageContent from "src/render/render";

export const prevButton = createElement({
  tagName: "button",
  classNames: ["prev-button"],
  textContent: "prev",
  attributes: { id: "prev", name: "prev" },
});

export const nextButton = createElement({
  tagName: "button",
  classNames: ["next-button"],
  textContent: "next",
  attributes: { id: "next", name: "next" },
});

prevButton.addEventListener("click", async () => {
  if (state.garagePage > 1) {
    prevButton.classList.add("prev-button_disabled");
    nextButton.classList.add("next-button_disabled");
    state.garagePage -= 1;
    nextButton.classList.remove("next-button_disabled");
    await renderGarageContent();
    if (state.garagePage !== 1) {
      prevButton.classList.remove("prev-button_disabled");
    }
  }
});

nextButton.addEventListener("click", async () => {
  const totalPages = Math.ceil(state.totalCars / state.carsPerPage);
  if (state.garagePage < totalPages) {
    prevButton.classList.add("prev-button_disabled");
    nextButton.classList.add("next-button_disabled");
    state.garagePage += 1;
    prevButton.classList.remove("prev-button_disabled");
    await renderGarageContent();
    if (state.garagePage !== totalPages) {
      nextButton.classList.remove("next-button_disabled");
    }
  }
});
