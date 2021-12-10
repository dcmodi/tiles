import React, { useState, useEffect } from "react";
import axios from "axios";
import { adminRef } from "../fire";
import { onValue } from "firebase/database";

const initState = {
  userName: "",
  mobileNo: "",
};

const AddAdmin = () => {
  const [admin, setAdmin] = useState(initState);
  const [adminData, setAdminData] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getData = async () => {
    await onValue(adminRef, async (snap) => {
      let data = await snap.val();
      await setAdminData(Object.values(data));
    });
  };
  const submitAdmin = async () => {
    if (!admin.userName) {
      setErrMsg("UserName Field is Empty");
      document.querySelector(".user").style.display = "block";
      return;
    } else if (admin.mobileNo.length !== 10) {
      document.querySelector(".user").style.display = "block";
      setErrMsg("Invalid Mobile Number");
      return;
    } else {
      let filter = adminData.filter((data) => {
        return data.mobileNo === `+91${admin.mobileNo}`;
      });
      if (filter.length === 0) {
        let url = `https://product-management-3f357-default-rtdb.firebaseio.com/admin.json/`;
        let res = await axios.post(url, {
          userName: admin.userName,
          mobileNo: `+91${admin.mobileNo}`,
        });
        if (res.status === 200) {
          document.querySelector(".display").style.display = "block";
          setAdmin(initState);
        }

        return;
      } else {
        document.querySelector(".user").style.display = "block";
        setErrMsg("Mobile Number Exists.");
        return;
      }
    }
  };
  return (
    <>
      <center>
        <div
          className="alert alert-success display"
          style={{
            width: "80%",
            display: "none",
          }}
        >
          <button
            type="button"
            className="close"
            style={{
              marginTop: "-1vh",
            }}
            onClick={() => {
              document.querySelector(".display").style.display = "none";
            }}
          >
            &times;
          </button>
          Admin Added Successfully
        </div>
      </center>

      <div
        className="alert alert-danger alert-dismissible user"
        style={{
          width: "80%",
          display: "none",
        }}
      >
        <button
          type="button"
          className="close"
          onClick={() => {
            document.querySelector(".user").style.display = "none";
          }}
        >
          &times;
        </button>
        {errMsg}
      </div>
      <div
        id="clockPicker3"
        style={{
          width: "80%",
        }}
      >
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter UserName "
            value={admin.userName}
            onChange={(e) => {
              setAdmin((oldData) => {
                return {
                  ...oldData,
                  userName: e.target.value,
                };
              });
            }}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Mobileno "
            value={admin.mobileNo}
            maxLength={10}
            onChange={(e) => {
              const regex = /^[0-9\b]*$/;
              if (regex.test(e.target.value)) {
                setAdmin((oldData) => {
                  return {
                    ...oldData,
                    mobileNo: e.target.value,
                  };
                });
              }
            }}
          />
        </div>
        <div className="form-group">
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={submitAdmin}>
              Add Admin
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddAdmin;
