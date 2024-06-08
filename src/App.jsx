import { useEffect } from "react";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Loader from "./components/ui/Loader";
import ErrorMessage from "./components/ui/ErrorMessage";
import StartScreen from "./components/screens/StartScreen";
import Question from "./components/questions/Question";
import Progress from "./components/questions/Progress";
import FinishScreen from "./components/screens/FinishScreen";
import Button from "./components/ui/Button";
import Timer from "./components/questions/Timer";
import Footer from "./components/layout/Footer";
import { useQuiz } from "./contexts/QuizContext";

const App = () => {
  const { status, currentQuestionIndex, answer, dispatch, numOfQuestions } =
    useQuiz();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:8000/questions");
        const data = await response.json();
        dispatch({ type: "questions-received", payload: data });
      } catch (error) {
        dispatch({ type: "questions-error" });
      }
    };
    fetchQuestions();
  }, [dispatch]);

  useEffect(() => {
    const highScore = localStorage.getItem("highScore");
    if (highScore) {
      dispatch({ type: "set-highscore", payload: highScore });
    }
  }, [dispatch]);

  console.log(status);

  const handleNextClick = () => {
    if (currentQuestionIndex === numOfQuestions - 1) {
      dispatch({ type: "finish-quiz" });
    } else {
      dispatch({ type: "next-question" });
    }
  };

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorMessage />}
        {status === "ready" && <StartScreen />}

        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              {answer !== null && (
                <Button className="btn-ui" onClick={handleNextClick}>
                  {currentQuestionIndex === numOfQuestions - 1
                    ? "Finish 🏁"
                    : "Next ➡️"}
                </Button>
              )}
            </Footer>
          </>
        )}

        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
};
export default App;
