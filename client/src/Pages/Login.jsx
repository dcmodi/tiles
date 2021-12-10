import React, { useEffect, useState } from "react";
import Number from "../Components/Login/Number";
import { adminRef } from "../Components/fire.js";
import { onValue } from "firebase/database";
import { auth1 } from "../Auth/Auth";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import app from "../Components/fire.js";
import OTP from "../Components/Login/OTP";
import { useHistory } from "react-router-dom";

const Login = () => {
  const auth = getAuth(app);
  const [admin, setAdmin] = useState([]);
  const [isMobilePage, setIsMobilePage] = useState(true);
  const [mobileNo, setMobileNo] = useState("");
  const [isValidate, setIsValidate] = useState(true);
  const [otp, setOtp] = useState("");

  let history = useHistory();
  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          //console.log(response);
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.onSignInSubmit();
        },
      },
      auth
    );
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //const verifier = () => {};
  let onSignInSubmit = (e) => {
    const phoneNumber = `+91${mobileNo}`;
    //const appVerifier =
    signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        //console.log(confirmationResult);
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;

        // ...
      })
      .catch((error) => {
        console.log(error);
        // Error; SMS not sent
        // ...
      });
  };

  let validateNum = async (e) => {
    e.preventDefault();
    let temp = false;
    admin.forEach((a) => {
      return a.mobileNo === `+91${mobileNo}` ? (temp = true) : null;
    });
    if (temp) {
      onSignInSubmit();
      setIsMobilePage(false);
    } else {
      setIsValidate(false);
    }
  };
  let getData = async () => {
    await onValue(adminRef, async (snap) => {
      const val = await snap.val();
      await setAdmin(Object.values(val));
    });
  };

  let validateOtp = () => {
    submitOTP();
  };

  let submitOTP = () => {
    const code = otp;
    window.confirmationResult
      .confirm(code)
      .then(async (result) => {
        // User signed in successfully.
        const user = result.user;
        if (user) {
          let a = admin.map((val) => {
            return val.mobileNo === `+91${mobileNo}`;
          });
          await auth1.setLogIn(a.userName, `+91${mobileNo}`);
          if (await auth1.getLogin()) {
            history.go("/dashboard");
          }
        } else {
        }
        // ...
      })
      .catch((error) => {
        window.alert("Invalid OTP");
        setIsMobilePage(true);
        window.location.reload();
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };
  return (
    <>
      {admin.length !== 0 ? (
        isMobilePage ? (
          <Number
            mobileNo={mobileNo}
            setNum={setMobileNo}
            validate={validateNum}
            isValidate={isValidate}
          />
        ) : (
          <OTP OTP={otp} set={setOtp} validate={validateOtp} />
        )
      ) : null}
      <div id="recaptcha-container"></div>
    </>
  );
};

export default Login;
