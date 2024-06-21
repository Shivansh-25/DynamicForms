import React from "react";
import { useLocation } from "react-router-dom";

const AdditionalQuestions = () => {
  const location = useLocation();
  const questions = JSON.parse(location.state.additionalQuestions);
  return (
    <div className="flex flex-col items-center h-screen bg-gray-100 mt-12 mb-12 ">
      <div className="flex flex-col justify-left lg:w-1/2 w-full h-screen bg-gray-100 p-10">
        <div className="flex justify-center">
          <h2 className="text-3xl font-bold mb-3 p-2">Additional Questions</h2>
        </div>
        {questions.map(
          (q, index) =>
            index !== questions.length - 1 && (
              <div key={index} className="flex mb-2 p-2 ">
                <p>{q.question}</p>
              </div>
            ),
        )}
      </div>
      <div className="flex p-10 flex-col items-center justify-center lg:w-1/2 w-full h-screen bg-gray-100">
        <h3 className="text-2xl font-bold m-3 p-5">Sarcastic Summary</h3>
        <p>{questions[questions.length - 1].question}</p>
      </div>
    </div>
  );
};

export default AdditionalQuestions;
