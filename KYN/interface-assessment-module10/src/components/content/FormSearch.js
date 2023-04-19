import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const FormSearch = () => {
  const ref = useRef();
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const value = ref.current.value.trim();

    if (value === "") {
      return alert("Please enter valid value");
    }

    navigate(`/stores?search=${value}`);
    ref.current.value = "";
  };

  return (
    <form
      id="searchForm"
      className="d-flex w-75 mb-5 "
      onSubmit={onSubmitHandler}
    >
      <input
        ref={ref}
        className="form-control ps-4 shadow-none"
        type="text"
        name="keyword"
        required
        placeholder="Search Store"
      />
      <button type="submit" className="ms-2 btn btn-dark w-25 py-3">
        Search
      </button>
    </form>
  );
};

export default FormSearch;
