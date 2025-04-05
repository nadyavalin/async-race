import state from "src/store/state";
import createElement from "src/utils/createElement";
import renderGarageContent from "src/render/render";
import prevButton from "./prevButton";

const nextButton = createElement({
  tagName: "button",
  classNames: ["next-button"],
  textContent: "next",
  attributes: { id: "next", name: "next" },
});

nextButton.addEventListener("click", async () => {
  const totalPages = Math.ceil(state.totalCars / state.carsPerPage);
  if (state.page < totalPages) {
    prevButton.classList.add("prev-button_disabled");
    nextButton.classList.add("next-button_disabled");
    state.page += 1;
    prevButton.classList.remove("prev-button_disabled");
    await renderGarageContent();
    if (state.page !== totalPages) {
      nextButton.classList.remove("next-button_disabled");
    }
  }
});

export default nextButton;
