import createElement from "../../utils/createElement";
import { state } from "../../store/state";
import { nextButton, prevButton } from "../buttons/nextNextButtons";

const prevNextButtonsContainer = createElement({
  tagName: "div",
  classNames: ["prev-next-buttons"],
});

state.components.nextButton = nextButton;

prevNextButtonsContainer.append(prevButton, nextButton);

export default prevNextButtonsContainer;
