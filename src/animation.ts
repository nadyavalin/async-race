import { startStopEngine, switchToDriveMode } from "./api/api";
import { updateWinnersTable } from "./pages/winners";
import state from "./store/state";

const activeAnimations = new Map<string, number>();

function handleRaceFinish(carId: string, finishTime: number) {
  const timeInSeconds = parseFloat((finishTime / 1000).toFixed(2));

  const existingWinnerIndex = state.winners.findIndex((winner) => winner.id === Number(carId));

  if (existingWinnerIndex === -1) {
    state.winners.push({
      id: Number(carId),
      wins: 1,
      time: timeInSeconds,
    });
  } else {
    const winner = state.winners[existingWinnerIndex];
    winner.wins += 1;
    winner.time = Math.min(winner.time, timeInSeconds);
  }

  updateWinnersTable();
}

function calculateTrackWidth(carElement: HTMLElement): number {
  const roadElement = carElement.closest(".road");
  if (!roadElement) return 800;

  const finishFlag = roadElement.querySelector(".finish-flag");
  const flagWidth = finishFlag ? finishFlag.clientWidth : 40;

  return roadElement.clientWidth - flagWidth - carElement.clientWidth;
}

function animateCar(carId: string, carElement: HTMLElement, duration: number) {
  let startTime: number;
  let animationId: number;

  const distance = calculateTrackWidth(carElement);

  const animateFrame = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const elapsedTime = timestamp - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const newCarElement = carElement;
    newCarElement.style.transform = `translateX(${progress * distance}px)`;

    if (progress < 1) {
      animationId = requestAnimationFrame(animateFrame);
      activeAnimations.set(carId, animationId);
    } else {
      handleRaceFinish(carId, duration);
    }
  };

  animationId = requestAnimationFrame(animateFrame);
  activeAnimations.set(carId, animationId);
}

export function stopCarAnimation(carId: string) {
  const animationId = activeAnimations.get(carId);
  if (animationId) {
    cancelAnimationFrame(animationId);
    activeAnimations.delete(carId);
  }
  startStopEngine(Number(carId), "stopped");
}

async function checkDriveModeInBackground(carId: number) {
  const success = await switchToDriveMode(carId);
  if (!success) {
    document.querySelector(`[data-id="${carId}"] .car`)?.classList.add("broken");
  }
}

export async function startCarAnimation(carId: string, carElement: HTMLElement) {
  try {
    const engineData = await startStopEngine(Number(carId), "started");
    const animationDuration = engineData.distance / engineData.velocity;

    animateCar(carId, carElement, animationDuration);

    checkDriveModeInBackground(Number(carId));
  } catch (error) {
    stopCarAnimation(carId);
  }
}
