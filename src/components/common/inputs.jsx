import React from "react";

function Inputs(props) {
  return (
    <>
      <input
        style={errors.email && InvalidClass}
        name="email"
        type="text"
        className="form-control form-control-lg"
        id="colFormLabelLg"
        placeholder="Email"
        {...register("email", {
          required: "Email is Required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        })}
        onKeyUp={() => {
          trigger("email");
        }}
      />
      {errors.email && (
        <small className="text-danger">{errors.email.message}</small>
      )}
    </>
  );
}

export default Inputs;
