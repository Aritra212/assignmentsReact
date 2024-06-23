import { useState } from "react";

const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setValues({
        ...values,
        skills: {
          ...values.skills,
          [name]: checked,
        },
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  return [values, handleChange, setValues];
};

export default useForm;
