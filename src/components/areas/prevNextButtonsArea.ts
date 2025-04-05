import createElement from "../../utils/createElement";
import { state } from "../../store/state";
import nextButton from "../buttons/nextButton";
import prevButton from "../buttons/prevButton";

const prevNextButtonsContainer = createElement({
  tagName: "div",
  classNames: ["prev-next-buttons"],
});
state.components.nextButton = nextButton;

prevNextButtonsContainer.append(prevButton, nextButton);

export default prevNextButtonsContainer;
