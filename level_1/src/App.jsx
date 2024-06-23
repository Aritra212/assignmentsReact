import { useState } from "react";
import "./App.css";
import useForm from "./hooks/useForm";

function App() {
  const [values, handleChange] = useForm({
    name: "",
    email: "",
    age: "",
    attendWithGuest: false,
    guestName: "",
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!values.name) newErrors.name = "Name is required";
    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!values.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(values.age) || values.age <= 0) {
      newErrors.age = "Age must be a number greater than 0";
    }
    if (values.attendWithGuest && !values.guestName) {
      newErrors.guestName = "Guest Name is required";
    }
    return newErrors;
  };

  const showResults = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      setResult(values);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <div className="wrapper">
        <h1>Event Registration Form</h1>
        <div className="form-container">
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="e.g. Aritra Paul"
              />
            </label>
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="e.g. abc@gmail.com"
              />
            </label>
            {errors.email && <p>{errors.email}</p>}
          </div>

          <div>
            <label>
              Age:
              <input
                type="number"
                name="age"
                value={values.age}
                onChange={handleChange}
                placeholder="e.g. 22"
              />
            </label>
            {errors.age && <p>{errors.age}</p>}
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                name="attendWithGuest"
                value={values.attendWithGuest}
                onChange={handleChange}
              />
              Are you attending with a guest?
            </label>
          </div>

          {values.attendWithGuest && (
            <div>
              <label>
                Guest Name:
                <input
                  type="text"
                  name="guestName"
                  value={values.guestName}
                  onChange={handleChange}
                  placeholder="e.g. Aritra Paul"
                />
              </label>
              {errors.guestName && (
                <p style={{ marginLeft: "40%" }}>{errors.guestName}</p>
              )}
            </div>
          )}
          <div className="submit" onClick={showResults}>
            Submit
          </div>
        </div>
        {result && (
          <div>
            <h2>Form Submitted Successfully!</h2>
            <p>Name: {result.name}</p>
            <p>Email: {result.email}</p>
            <p>Age: {result.age}</p>
            <p>Attending with Guest: {result.attendWithGuest ? "Yes" : "No"}</p>
            {result.attendWithGuest && <p>Guest Name: {result.guestName}</p>}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
