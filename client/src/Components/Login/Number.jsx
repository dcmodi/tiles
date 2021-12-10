import React from "react";
import "./Number.css";

const Number = (props) => {
  return (
    <>
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <div className="login">
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="tel"
                  className="login__input"
                  placeholder="Enter Mobile No."
                  value={`${props.mobileNo}`}
                  maxLength={10}
                  pattern="[0-9]*"
                  onChange={(e) => {
                    const regex = /^[0-9\b]*$/;
                    if (regex.test(e.target.value))
                      props.setNum(e.target.value);
                  }}
                />
              </div>
              {props.isValidate ? null : (
                <div
                  style={{
                    color: "red",
                  }}
                >
                  Mobile Number Not Found
                </div>
              )}
              <button className="button login__submit" onClick={props.validate}>
                <span className="button__text">Continue</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Number;
