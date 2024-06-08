import { useQuiz } from "../../contexts/QuizContext";

const Options = () => {
  const { question, dispatch, answer } = useQuiz();

  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => {
        return (
          <button
            key={option}
            className={`btn btn-option ${
              hasAnswered &&
              (index === question.correctOption
                ? "correct"
                : index === answer
                ? "selected-wrong "
                : "wrong")
            } ${index === answer ? "answer" : ""}
              
            `}
            onClick={() =>
              dispatch({ type: "answer-selected", payload: index })
            }
            disabled={hasAnswered}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};
export default Options;
