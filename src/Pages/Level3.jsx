import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MistralClient from "@mistralai/mistralai";

const apiKey = process.env.REACT_APP_MISTRAL_API_KEY;
const client = new MistralClient(apiKey);

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (callback) => (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      callback();
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

const Level3 = () => {
  const initialValues = {
    fullName: "",
    email: "",
    surveyTopic: "",
    programmingLanguage: "",
    experience: "",
    exercise: "",
    diet: "",
    qualification: "",
    fieldOfStudy: "",
    feedback: "",
  };

  const [loading, setLoading] = useState(false);
  const validate = (values) => {
    let errors = {};
    if (!values.fullName) errors.fullName = "Full Name is required";
    if (!values.email) errors.email = "Email is required";
    if (!values.surveyTopic) errors.surveyTopic = "Survey Topic is required";
    if (
      values.surveyTopic === "Technology" &&
      (!values.programmingLanguage || !values.experience)
    )
      errors.technologySection = "Technology Section fields are required";
    if (values.surveyTopic === "Health" && (!values.exercise || !values.diet))
      errors.healthSection = "Health Section fields are required";
    if (
      values.surveyTopic === "Education" &&
      (!values.qualification || !values.fieldOfStudy)
    )
      errors.educationSection = "Education Section fields are required";
    if (!values.feedback || values.feedback.length < 50)
      errors.feedback = "Feedback must be at least 50 characters";
    return errors;
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    validate,
  );

  const fetchAdditionalQuestions = async (
    topic,
    language,
    experience,
    exercise,
    diet,
    qualification,
    fieldOfStudy,
    fullName,
  ) => {
    setLoading(true);
    const chatResponse = await client.chat({
      model: "mistral-large-2402",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: `Give me 5 questions for a survey on the topic of ${topic} in JSON format in the form of an array with one question at every index please make sure to give the annswer only in json format there should be no ther information, I want the object to contain just the question with the type of "question": "__the question__" nothing else in the object and I want the last element of the array to be a sarcastic summary and comment on the data ${fullName} is the name of the user, if he interested in Technology use the programming language and experience and eignore everything else / if interested in health comment on the diet and exercise frequency and ignore everything else/ if he is interested in education comment only on field of study and qualification and ignore everything else. ${topic} is the topic he is interested in, ${language} is the programming language he uses if he is interested in Technology otherwise it is blank, ${experience} is the amount of experience he has in the field of tech, ${exercise} is the exercise frequency of the user if he is interested in health, ${diet} is the diet preference if interested in health , ${qualification} is his max qualificiation if interested in education, ${fieldOfStudy} is his field of study if interested in education. Try to make thu summary around 100 words long and try to insult the person first but compliment him in the end. Only include and comment on the field he is intersted in. MAKE SURE THAT EVEN THE SUMMARY FOLLOWS THE SAME JSON FORMAT AS QUESTIONS "question": "__the summary__"" `,
        },
      ],
    });
    return chatResponse.choices[0].message.content;
  };

  const navigate = useNavigate();

  const submitForm = async () => {
    const additionalQuestions = await fetchAdditionalQuestions(
      values.surveyTopic,
      values.programmingLanguage,
      values.experience,
      values.exercise,
      values.diet,
      values.qualification,
      values.fieldOfStudy,
      values.fullName,
    );
    navigate("/additional-questions", { state: { additionalQuestions } });
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col items-center"
      >
        <div className="flex flex-col items-center">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleChange}
            className="w-64 border-2 border-gray-300 rounded-md p-2 m-3"
          />
          {errors.fullName && (
            <div className="text-red-600">{errors.fullName}</div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleChange}
            className="w-64 border-2 border-gray-300 rounded-md p-2 m-3"
          />
          {errors.email && <div className="text-red-600">{errors.email}</div>}
        </div>
        <div className="flex flex-col items-center">
          <label>Survey Topic</label>
          <select
            name="surveyTopic"
            value={values.surveyTopic}
            onChange={handleChange}
            onBlur={handleChange}
            className="w-64 border-2 border-gray-300 rounded-md p-2 m-3"
          >
            <option value="">Select</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
          {errors.surveyTopic && (
            <div className="text-red-600">{errors.surveyTopic}</div>
          )}
        </div>
        {values.surveyTopic === "Technology" && (
          <div className="flex flex-col items-center">
            <label>Favorite Programming Language</label>
            <select
              name="programmingLanguage"
              value={values.programmingLanguage}
              onChange={handleChange}
              onBlur={handleChange}
              className="w-64 border-2 border-gray-300 rounded-md p-2 m-3"
            >
              <option value="">Select</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
            </select>
            <label>Years of Experience</label>
            <input
              type="number"
              name="experience"
              value={values.experience}
              onChange={handleChange}
              onBlur={handleChange}
              className="w-64 border-2 border-gray-300 rounded-md p-2 m-3"
            />
            {errors.technologySection && (
              <div className="text-red-600">
                {<p>{errors.technologySection}</p>}
              </div>
            )}
          </div>
        )}
        {values.surveyTopic === "Health" && (
          <div className="flex flex-col items-center">
            <label>Exercise Frequency</label>
            <select
              name="exercise"
              value={values.exercise}
              onChange={handleChange}
              onBlur={handleChange}
              className="w-64 border-2 border-gray-300 rounded-md p-2 m-3"
            >
              <option value="">Select</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Rarely">Rarely</option>
            </select>
            <label>Diet Preference</label>
            <select
              name="diet"
              value={values.diet}
              onChange={handleChange}
              onBlur={handleChange}
              className="w-64 border-2 border-gray-300 rounded-md p-2 m-3"
            >
              <option value="">Select</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
            {errors.healthSection && (
              <div className="text-red-600">
                {<p>{errors.healthSection}</p>}
              </div>
            )}
          </div>
        )}
        {values.surveyTopic === "Education" && (
          <div className="flex flex-col items-center">
            <label>Highest Qualification</label>
            <select
              name="qualification"
              value={values.qualification}
              onChange={handleChange}
              onBlur={handleChange}
              className="w-64 border-2 border-gray-300 rounded-md p-2 m-3"
            >
              <option value="">Select</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
            <label>Field of Study</label>
            <input
              type="text"
              name="fieldOfStudy"
              value={values.fieldOfStudy}
              onChange={handleChange}
              onBlur={handleChange}
              className="w-64 border-2 border-gray-300 rounded-md p-2 m-3"
            />
            {errors.educationSection && (
              <div className="text-red-600">
                {<p>{errors.educationSection}</p>}
              </div>
            )}
          </div>
        )}
        <div className="flex flex-col items-center">
          <label>Feedback</label>
          <textarea
            name="feedback"
            value={values.feedback}
            onChange={handleChange}
            onBlur={handleChange}
            className="w-64 border-2 border-gray-300 rounded-md p-2 m-3"
          />
          {errors.feedback && (
            <div className="text-red-600">{<p>{errors.feedback}</p>}</div>
          )}
        </div>
        <button
          type="submit"
          className="mt-5 p-3 w-32 border-black border-2 rounded-lg bg-blue-400"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Level3;
