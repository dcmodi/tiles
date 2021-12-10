import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { adminRef } from "../fire";
import { onValue } from "firebase/database";

const ChangeAdmin = () => {
  const [number, setNumber] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [adminData, setAdminData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let m_no = Cookies.get("mobile");
    await setNumber(m_no.substr(3));
    await onValue(adminRef, async (snap) => {
      let data = await snap.val();
      await setAdminData(Object.values(data));
      await setKeys(Object.keys(data));
    });
  };

  const updateNumber = async () => {
    if (newNumber.length !== 10) {
      document.querySelector(".user").style.display = "block";
      setErrMsg("Invalid Mobile Number");
      return;
    } else {
      let i = -1;
      let filter = adminData.filter((data, index) => {
        if (data.mobileNo === `+91${number}`) {
          i = index;
          return data;
        }
        return null;
      });
      if (i !== -1) {
        let url = `https://product-management-3f357-default-rtdb.firebaseio.com/admin/${keys[i]}.json`;
        let res = await axios.patch(url, {
          mobileNo: `+91${newNumber}`,
        });
        if (res.status === 200) {
          document.querySelector(".display").style.display = "block";
        }
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
          Number Updated Successfully
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
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="exampleInputPassword1"
          readOnly={true}
          value={number}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Enter Number.."
          maxLength={10}
          value={newNumber}
          onChange={(e) => {
            const regex = /^[0-9\b]*$/;
            if (regex.test(e.target.value)) {
              setNewNumber(e.target.value);
            }
          }}
        />
      </div>
      <div className="form-group">
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={updateNumber}>
            Change Admin
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangeAdmin;
