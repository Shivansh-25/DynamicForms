import { useState } from "react";
import useForm from "../Hooks/useForm";
export default function Level1() {
  const initialValues = {
    name: "",
    email: "",
    age: "",
    guest: false,
    guestName: "",
  };
  const validate = (values) => {
    let errors = {};
    if (!values.name) errors.name = "Name is required";
    if (!values.email) errors.email = "Email is required";
    if (!values.age || values.age <= 0)
      errors.age = "Age must be greater than 0";
    if (values.guest && !values.guestName)
      errors.guestName = "Guest Name is required";
    return errors;
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    validate,
  );

  //testing something

  const submitForm = () => {
    alert(JSON.stringify(values, null, 2));
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100">
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-col items-center justify-center w-[100vw] h-[100vh] bg-gray-100">
            <div className="flex flex-col items-center">
              <div>
                {" "}
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onInput={handleChange}
                  onBlur={handleChange}
                  className="w-64 border-2 border-gray-300 rounded-md p-2 m-3"
                />
                {errors.name && (
                  <div className="text-red-600">{<p>{errors.name}</p>}</div>
                )}
              </div>
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={values.email}
                onInput={handleChange}
                onBlur={handleChange}
                className="w-64 border-2 border-gray-300 rounded-md p-2 m-3"
              />
              {errors.email && (
                <div className="text-red-600">{<p>{errors.email}</p>}</div>
              )}
            </div>
            <div className="flex flex-col items-center">
              <div>
                {" "}
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={values.age}
                  onInput={handleChange}
                  onBlur={handleChange}
                  className="w-64 border-2 border-gray-300 rounded-md p-2 m-3"
                />
                {errors.age && (
                  <div className="text-red-600">{<p>{errors.age}</p>}</div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center mt-5">
              <div>
                <label className="mr-5 font-bold">
                  Are you attending with a guest?
                </label>
                <input
                  type="checkbox"
                  name="guest"
                  checked={values.guest}
                  onInput={handleChange}
                />
              </div>
            </div>
            {values.guest && (
              <div className="flex flex-col items-center">
                <div>
                  <label>Guest Name</label>
                  <input
                    type="text"
                    name="guestName"
                    value={values.guestName}
                    onInput={handleChange}
                    onBlur={handleChange}
                    className="w-64 border-2 border-gray-300 rounded-md p-2 m-3"
                  />
                  {errors.guestName && (
                    <div className="text-red-600">
                      {<p>{errors.guestName}</p>}
                    </div>
                  )}
                </div>
              </div>
            )}
            <button
              className="mt-5 p-3 w-32 border-black border-2 rounded-lg bg-blue-400"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
