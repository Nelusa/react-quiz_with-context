import { useEffect } from "react";
import { useQuiz } from "../../contexts/QuizContext";

const Timer = () => {
  const { secondsLeft, dispatch } = useQuiz();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "timer-tick" });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const time = `${minutes < 10 ? `0${minutes}` : seconds}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;

  return <div className="timer">{time}</div>;
};
export default Timer;
