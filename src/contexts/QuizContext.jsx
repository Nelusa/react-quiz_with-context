import { createContext, useContext, useReducer } from "react";

const QuizContext = createContext();

const SECS_PER_QUESTION = 20;

const initialState = {
  questions: [],
  status: "loading", // loading, ready, error, active, finished
  currentQuestionIndex: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsLeft: null,
};

const reducer = (state, action) => {
  const question = state.questions[state.currentQuestionIndex];
  const newHighScore =
    state.points > state.highScore ? state.points : state.highScore;

  switch (action.type) {
    case "questions-received":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "questions-error":
      return {
        ...state,
        status: "error",
      };
    case "start-quiz":
      return {
        ...state,
        status: "active",
        secondsLeft: state.questions.length * SECS_PER_QUESTION,
      };
    case "answer-selected":
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "next-question":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        answer: null,
      };
    case "finish-quiz":
      localStorage.setItem("highScore", newHighScore);
      return {
        ...state,
        status: "finished",
        highScore: newHighScore,
      };
    case "restart-quiz":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highScore: state.highScore,
      };
    case "timer-tick":
      return {
        ...state,
        secondsLeft: state.secondsLeft - 1,
        status: state.secondsLeft === 0 ? "finished" : state.status,
        highScore: state.secondsLeft === 0 ? newHighScore : state.highScore, //je toto správně?
      };
    case "set-highscore":
      return {
        ...state,
        highScore: action.payload,
      };

    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
};

const QuizProvider = ({ children }) => {
  const [
    {
      questions,
      status,
      currentQuestionIndex,
      answer,
      points,
      highScore,
      secondsLeft,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPossiblePoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );
  const numOfQuestions = questions.length;
  const question = questions[currentQuestionIndex];

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        currentQuestionIndex,
        answer,
        points,
        highScore,
        secondsLeft,

        maxPossiblePoints,
        numOfQuestions,
        question,

        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};

export default QuizProvider;
