import { useQuiz } from "../../contexts/QuizContext";
import Button from "../ui/Button";

const FinishScreen = () => {
  const { points, maxPossiblePoints, dispatch, highScore } = useQuiz();

  const percentage = (points / maxPossiblePoints) * 100;

  const createEmoji = () => {
    if (percentage >= 90) {
      return "🥳🩷";
    } else if (percentage >= 70) {
      return "💪🏼";
    } else if (percentage >= 50) {
      return "😳";
    } else {
      return "🤯";
    }
  };

  const emoji = createEmoji();

  return (
    <>
      <div className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} (
        {percentage !== 100 ? percentage.toFixed(2) : percentage} %)
      </div>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <Button
        className="btn-ui"
        onClick={() => dispatch({ type: "restart-quiz" })}
      >
        Play again 🔁
      </Button>
    </>
  );
};
export default FinishScreen;
