import { useQuiz } from "../../contexts/QuizContext";

const Progress = () => {
  const {
    currentQuestionIndex,
    numOfQuestions,
    points,
    maxPossiblePoints,
    answer,
  } = useQuiz();

  return (
    <div className="progress">
      <progress
        value={
          answer !== null ? currentQuestionIndex + 1 : currentQuestionIndex
        }
        max={numOfQuestions}
      />

      <p>
        Question{" "}
        <strong>
          {currentQuestionIndex + 1}/{numOfQuestions}
        </strong>
      </p>
      <p>
        <strong>
          {points}/{maxPossiblePoints}
        </strong>
      </p>
    </div>
  );
};
export default Progress;
