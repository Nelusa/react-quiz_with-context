import { useQuiz } from "../../contexts/QuizContext";
import Button from "../ui/Button";

const StartScreen = () => {
  const { numOfQuestions, dispatch } = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numOfQuestions} questions to test your React master!</h3>
      <Button onClick={() => dispatch({ type: "start-quiz" })}>
        Start Quiz! 🚀
      </Button>
      {/*  <button className="btn" onClick={() => dispatch({ type: "start-quiz" })}>
        Start Quiz!
      </button> */}
    </div>
  );
};
export default StartScreen;
