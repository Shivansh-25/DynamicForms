import React from "react";
import { useLocation } from "react-router-dom";

const AdditionalQuestions = () => {
  const location = useLocation();
  const questions = JSON.parse(location.state.additionalQuestions);
  return (
    <div className="flex flex-col items-center justify-space-between w-screen h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100">
        <h2 className="text-3xl font-bold m-3 p-5">Additional Questions</h2>
        {questions.map(
          (q, index) =>
            index !== questions.length - 1 && (
              <div key={index} className="flex  m-2 p-2 flex-col items-center">
                <p>{q.question}</p>
              </div>
            ),
        )}
      </div>
      <div className="flex p-10 flex-col items-center justify-center w-[45vw] h-screen bg-gray-100">
        <h3 className="text-2xl font-bold m-3 p-5">
          Here is the summary of the questions.... please don't be offended
        </h3>
        <p>{questions[questions.length - 1].question}</p>
      </div>
    </div>
  );
};

export default AdditionalQuestions;
