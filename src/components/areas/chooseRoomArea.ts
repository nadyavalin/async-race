import createElement from "src/utils/createElement";
import toGarage from "../buttons/toGarageButton";
import toWinners from "../buttons/toWinnersButton";

const chooseRoomContainer = createElement({
  tagName: "div",
  classNames: ["choose-room-container"],
});

chooseRoomContainer.append(toGarage, toWinners);

export default chooseRoomContainer;
