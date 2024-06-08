import { useQuiz } from "../../contexts/QuizContext";
import Options from "./Options";

const Question = () => {
  const { question } = useQuiz();

  return (
    <div>
      <h3>{question.question}</h3>
      <Options />
    </div>
  );
};
export default Question;
