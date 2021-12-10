import React from "react";
import "./OTP.css";
const OTP = (props) => {
  let inputChange = (e) => {
    if (
      document.activeElement.nextElementSibling &&
      e.target.value.length !== 0
    ) {
      document.activeElement.nextElementSibling.focus();
    }
    props.set(props.OTP + e.target.value);
  };
  return (
    <>
      <div className="container h d-flex justify-content-center align-items-center">
        <div className="position-relative">
          <div className="ca card p-2 text-center">
            <h6>
              Please enter the one time password <br /> to verify your account
            </h6>
            <div
              id="otp"
              className="inputs d-flex flex-row justify-content-center mt-2"
            >
              {" "}
              <input
                className="m-2 text-center form-control rounded focus"
                type="text"
                id="first"
                maxLength="1"
                onChange={inputChange}
                tabIndex="1"
              />{" "}
              <input
                className="m-2 text-center form-control rounded focus"
                type="text"
                id="second"
                maxLength="1"
                onChange={inputChange}
              />{" "}
              <input
                className="m-2 text-center form-control rounded focus"
                type="text"
                id="third"
                maxLength="1"
                onChange={inputChange}
              />{" "}
              <input
                className="m-2 text-center form-control rounded focus"
                type="text"
                id="fourth"
                maxLength="1"
                onChange={inputChange}
              />{" "}
              <input
                className="m-2 text-center form-control rounded focus"
                type="text"
                id="fifth"
                maxLength="1"
                onChange={inputChange}
              />{" "}
              <input
                className="m-2 text-center form-control rounded focus"
                type="text"
                id="sixth"
                maxLength="1"
                onChange={inputChange}
              />{" "}
            </div>
            <div className="mt-4">
              {" "}
              <button
                className="btn btn-danger px-4 validate"
                onClick={props.validate}
              >
                Login
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTP;
