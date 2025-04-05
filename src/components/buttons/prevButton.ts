import state from "src/store/state";
import createElement from "src/utils/createElement";
import renderGarageContent from "src/render/render";
import nextButton from "./nextButton";

const prevButton = createElement({
  tagName: "button",
  classNames: ["prev-button"],
  textContent: "prev",
  attributes: { id: "prev", name: "prev" },
});

prevButton.addEventListener("click", async () => {
  if (state.page > 1) {
    prevButton.classList.add("prev-button_disabled");
    nextButton.classList.add("next-button_disabled");
    state.page -= 1;
    nextButton.classList.remove("next-button_disabled");
    await renderGarageContent();
    if (state.page !== 1) {
      prevButton.classList.remove("prev-button_disabled");
    }
  }
});

export default prevButton;
