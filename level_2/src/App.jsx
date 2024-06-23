import { useState } from "react";
import "./App.css";
import useForm from "./hooks/useForm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [values, handleChange, setValues] = useForm({
    name: "",
    email: "",
    phNumber: "",
    position: "",
    experience: "",
    portfolio: "",
    managementExperience: "",
    skills: {
      JavaScript: false,
      CSS: false,
      Python: false,
    },
    interviewTime: new Date(),
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const validate = () => {
    const newErrors = {};
    // check name field
    if (!values.name) newErrors.name = "Full Name is required";
    // check email field
    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email is invalid";
    }
    // check phone number
    if (!values.phNumber) {
      newErrors.phNumber = "Phone Number is required";
    } else if (isNaN(values.phNumber)) {
      newErrors.phNumber = "Phone Number must be a valid number";
    }
    // check if "Developer" or "Designer" is selected, and must be a number greater than 0
    if (
      (values.position === "Developer" || values.position === "Designer") &&
      !values.experience
    ) {
      newErrors.experience = "Relevant Experience is required";
    } else if (
      (values.position === "Developer" || values.position === "Designer") &&
      (isNaN(values.experience) || values.experience <= 0)
    ) {
      newErrors.experience =
        "Relevant Experience must be a number greater than 0";
    }
    // if 'Designer' check portfolio
    if (values.position === "Designer" && !values.portfolio) {
      newErrors.portfolio = "Portfolio URL is required";
    } else if (
      values.position === "Designer" &&
      !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(values.portfolio)
    ) {
      newErrors.portfolio = "Portfolio URL is invalid";
    }

    // if "Manager" check manager experience
    if (values.position === "Manager" && !values.managementExperience) {
      newErrors.managementExperience = "Management Experience is required";
    }
    // check if skill not selected
    if (!Object.values(values.skills).includes(true)) {
      newErrors.skills = "At least one skill must be selected";
    }
    // check 'InterviewTime' empty or not
    if (!values.interviewTime) {
      newErrors.interviewTime = "Preferred Interview Time is required";
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
        <h1>Job Application Form</h1>
        <div className="form-container">
          <div>
            <label>
              Full Name:
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
              Phone Number:
              <input
                type="number"
                name="phNumber"
                value={values.phNumber}
                onChange={handleChange}
                placeholder="e.g. 0123456789"
              />
            </label>
            {errors.age && <p>{errors.phNumber}</p>}
          </div>

          <div>
            <label>
              Applying for Position:
              <select
                name="position"
                value={values.position}
                onChange={handleChange}
              >
                <option value="">Select Position</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
              </select>
            </label>
          </div>

          {(values.position === "Developer" ||
            values.position === "Designer") && (
            <div>
              <label>
                Relevant Experience (years):
                <input
                  type="text"
                  name="experience"
                  value={values.experience}
                  onChange={handleChange}
                />
              </label>
              {errors.experience && <p>{errors.experience}</p>}
            </div>
          )}
          {values.position === "Designer" && (
            <div>
              <label>
                Portfolio URL:
                <input
                  type="text"
                  name="portfolio"
                  value={values.portfolio}
                  onChange={handleChange}
                />
              </label>
              {errors.portfolio && <p>{errors.portfolio}</p>}
            </div>
          )}

          {values.position === "Manager" && (
            <div>
              <label>
                Management Experience:
                <input
                  type="text"
                  name="managementExperience"
                  value={values.managementExperience}
                  onChange={handleChange}
                />
              </label>
              {errors.managementExperience && (
                <p>{errors.managementExperience}</p>
              )}
            </div>
          )}

          <div>
            <label>
              Additional Skills:
              <label>
                <input
                  type="checkbox"
                  name="JavaScript"
                  checked={values.skills.JavaScript}
                  onChange={handleChange}
                />
                JavaScript
              </label>
              <label>
                <input
                  type="checkbox"
                  name="CSS"
                  checked={values.skills.CSS}
                  onChange={handleChange}
                />
                CSS
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Python"
                  checked={values.skills.Python}
                  onChange={handleChange}
                />
                Python
              </label>
            </label>
            {errors.skills && <p>{errors.skills}</p>}
          </div>

          <div>
            <label>
              Preferred Interview Time:
              <div className="customDatePickerWidth">
                <DatePicker
                  selected={values.interviewTime}
                  onChange={(date) =>
                    setValues({ ...values, interviewTime: date })
                  }
                />
              </div>
            </label>
            {errors.interviewTime && <p>{errors.interviewTime}</p>}
          </div>

          <div className="submit" onClick={showResults}>
            Submit
          </div>
        </div>

        {result && (
          <div>
            <h2>Form Submitted Successfully!</h2>
            <p>Full Name: {result.name}</p>
            <p>Email: {result.email}</p>
            <p>Phone Number: {result.phNumber}</p>
            <p>Position: {result.position}</p>
            {(result.position === "Developer" ||
              result.position === "Designer") && (
              <p>Relevant Experience: {result.experience} years</p>
            )}
            {result.position === "Designer" && (
              <p>Portfolio URL: {result.portfolio}</p>
            )}
            {result.position === "Manager" && (
              <p>Management Experience: {result.managementExperience}</p>
            )}
            <p>
              Additional Skills:{" "}
              {Object.keys(result.skills)
                .filter((skill) => result.skills[skill])
                .join(", ")}
            </p>
            <p>Preferred Interview Time: {result.interviewTime.toString()}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
