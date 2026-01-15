export function useQuizSounds() {
  const correct = typeof Audio !== "undefined"
    ? new Audio("/sounds/correct.mp3")
    : null;

  const wrong = typeof Audio !== "undefined"
    ? new Audio("/sounds/error.mp3")
    : null;

  const playCorrect = () => {
    correct?.currentTime && (correct.currentTime = 0);
    correct?.play();
  };

  const playWrong = () => {
    wrong?.currentTime && (wrong.currentTime = 0);
    wrong?.play();
  };

  return { playCorrect, playWrong };
}
