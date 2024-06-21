import React from "react";
import useForm from "../Hooks/useForm";

const Level2 = () => {
  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    position: "",
    experience: "",
    portfolio: "",
    management: "",
    skills: [],
    interviewTime: "",
  };
  const isValidUrl = (url) => {
    const urlPattern =
      /^((http|https):\/\/)?(www\.)?([a-zA-Z0-9-]+)\.([a-zA-Z]{2,})(\/[a-zA-Z0-9-._?&=#]*)?$/;
    return urlPattern.test(url);
  };

  const validate = (values) => {
    let errors = {};
    if (!values.fullName) errors.fullName = "Full Name is required";
    if (!values.email) errors.email = "Email is required";
    if (!values.phoneNumber) errors.phoneNumber = "Phone Number is required";
    if (
      (values.position === "Developer" || values.position === "Designer") &&
      !values.experience
    )
      errors.experience = "Relevant Experience is required";
    if (values.position === "Designer" && !values.portfolio)
      errors.portfolio = "Portfolio URL is required";
    if (values.position === "Manager" && !values.management)
      errors.management = "Management Experience is required";
    if (values.skills.length === 0)
      errors.skills = "At least one skill must be selected";
    if (!values.interviewTime)
      errors.interviewTime = "Preferred Interview Time is required";
    if (values.portfolio && !isValidUrl(values.portfolio)) {
      errors.portfolio = "Please enter a valid URL";
    }
    return errors;
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    validate,
  );

  const submitForm = () => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100 mt-12 mb-12">
      <form onSubmit={submitForm} className="flex flex-col items-center">
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
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleChange}
              className="w-64 border-2 border-gray-300 rounded-md p-2 m-3"
            />
            {errors.phoneNumber && (
              <div className="text-red-600">{errors.phoneNumber}</div>
            )}
          </div>

          <div className="flex flex-col items-center">
            <label>Applying for Position</label>
            <select
              name="position"
              value={values.position}
              onChange={handleChange}
              onBlur={handleChange}
              className="w-64 border-2 border-gray-300 rounded-md p-2 m-3"
            >
              <option value="">Select</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          {(values.position === "Developer" ||
            values.position === "Designer") && (
              <div className="flex flex-col items-center">
                <label>Relevant Experience</label>
                <input
                  type="number"
                  name="experience"
                  value={values.experience}
                  onChange={handleChange}
                  onBlur={handleChange}
                  className="w-64 border-2 border-gray-300 rounded-md p-2 m-3"
                />
                {errors.experience && (
                  <div className="text-red-600">{errors.experience}</div>
                )}
              </div>
            )}

          {values.position === "Designer" && (
            <div className="flex flex-col items-center">
              <label>Portfolio URL</label>
              <input
                type="text"
                name="portfolio"
                value={values.portfolio}
                onChange={handleChange}
                onBlur={handleChange}
                className="w-64 border-2 border-gray-300 rounded-md p-2 m-3"
              />
              {errors.portfolio && (
                <div className="text-red-600">{errors.portfolio}</div>
              )}
            </div>
          )}

          {values.position === "Manager" && (
            <div className="flex flex-col items-center">
              <label>Management Experience</label>
              <input
                type="text"
                name="management"
                value={values.management}
                onChange={handleChange}
                onBlur={handleChange}
                className="w-64 border-2 border-gray-300 rounded-md p-2 m-3"
              />
              {errors.management && (
                <div className="text-red-600">{errors.management}</div>
              )}
            </div>
          )}

          <div className="flex flex-col items-center">
            <label>Additional Skills</label>
            <div className="flex flex-row">
              <label className="mr-3">
                <input
                  type="checkbox"
                  name="skills"
                  value="JavaScript"
                  onChange={handleChange}
                  onBlur={handleChange}
                />{" "}
                JavaScript
              </label>
              <label className="mr-3">
                <input
                  type="checkbox"
                  name="skills"
                  value="CSS"
                  onChange={handleChange}
                  onBlur={handleChange}
                />{" "}
                CSS
              </label>
              <label>
                <input
                  type="checkbox"
                  name="skills"
                  value="Python"
                  onChange={handleChange}
                  onBlur={handleChange} 
                />{" "}
                Python
              </label>
            </div>
            {errors.skills && (
              <div className="text-red-600">{errors.skills}</div>
            )}
          </div>

          <div className="flex flex-col items-center">
            <label>Preferred Interview Time</label>
            <input
              type="datetime-local"
              name="interviewTime"
              value={values.interviewTime}
              onChange={handleChange}
              onBlur={handleChange} 
              className="w-64 border-2 border-gray-300 rounded-md p-2 m-3"
            />
            {errors.interviewTime && (
              <div className="text-red-600">{errors.interviewTime}</div>
            )}
        </div>

        <button
          type="submit"
          className="mt-5 p-3 w-32 border-black border-2 rounded-lg bg-blue-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Level2;
