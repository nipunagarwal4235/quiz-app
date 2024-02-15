import React, { useRef, useState } from "react";
import { data } from "../data";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let option_array = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    if (lock == false) {
      if (question.correctAnswer == ans) {
        e.target.classList.add("bg-green-400", "border-green-800");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("bg-red-400", "border-red-800");
        setLock(true);
        option_array[question.correctAnswer].current.classList.add(
          "bg-green-400",
          "border-green-800"
        );
      }
    }
  };

  const next = () => {
    console.log("clicked");
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove(
          "bg-green-400",
          "border-green-800",
          "bg-red-400",
          "border-red-800"
        );
        return null;
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <>
      <div className="w-5/6 m-auto mt-36 bg-white flex flex-col gap-5 rounded-2xl pt-10 pb-10 pl-14 pr-14">
        <h1>Quiz App</h1>
        <hr className="border-0 h-0.5 bg-stone-300" />
        {result ? (
          <>
            <h2>
              You Scored {score} out of {data.length}
            </h2>
            <button
              onClick={reset}
              className="m-auto w-64 h-16 bg-violet-600 text-white text-xl rounded-xl cursor-pointer"
            >
              {" "}
              Reset{" "}
            </button>
          </>
        ) : (
          <>
            <h2 className="font-medium text-2xl">
              {index + 1}. {question.question}
            </h2>
            <ul>
              <li
                ref={option1}
                onClick={(e) => {
                  checkAns(e, 0);
                }}
                className="flex h-16 pl-4 border-solid rounded-lg mb-5 text-xl cursor-pointer border items-center"
              >
                {question.options[0]}
              </li>
              <li
                ref={option2}
                onClick={(e) => {
                  checkAns(e, 1);
                }}
                className="flex h-16 pl-4 border-solid rounded-lg mb-5 text-xl cursor-pointer border items-center"
              >
                {question.options[1]}
              </li>
              <li
                ref={option3}
                onClick={(e) => {
                  checkAns(e, 2);
                }}
                className="flex h-16 pl-4 border-solid rounded-lg mb-5 text-xl cursor-pointer border items-center"
              >
                {question.options[2]}
              </li>
              <li
                ref={option4}
                onClick={(e) => {
                  checkAns(e, 3);
                }}
                className="flex h-16 pl-4 border-solid rounded-lg mb-5 text-xl cursor-pointer border items-center"
              >
                {question.options[3]}
              </li>
            </ul>
            <button
              onClick={next}
              className="m-auto w-64 h-16 bg-violet-600 text-white text-xl rounded-xl cursor-pointer"
            >
              Next
            </button>
            <div className="m-auto text-sm">
              {index + 1} out of {data.length} questions
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Quiz;
