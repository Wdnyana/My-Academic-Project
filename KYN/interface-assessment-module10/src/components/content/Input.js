import React from "react";

const Input = ({
  label,
  name,
  register,
  type,
  placeholder,
  validation,
  errors,
  emailTaken,
}) => {
  let errorMessage;

  if (errors && errors[name]) {
    errorMessage = (
      <p className="d-flex align-item-end text-danger font-normal">
        {errors[name].message}
      </p>
    );
  }

  let invalid = false;

  if (errors && errors[name]) {
    if (
      errors[name].type === "required" ||
      errors[name].type === "minLength" ||
      errors[name].type === "pattern" ||
      errors[name].type === "maxLength"
    ) {
      invalid = true;
    }
  }

  if (emailTaken) {
    invalid = true;
  }

  return (
    <div className="mb-3">
      <label htmlFor={name} className="fs-5 ps-4">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={`form-input form-control mb-3 p-3 shadow-none ps-4 ${
          invalid ? "alert alert-warning" : ""
        }`}
        {...register(name, { ...validation })}
      />
      {errorMessage}
    </div>
  );
};

export default Input;
