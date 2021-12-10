import React, { useEffect, useState } from "react";
import axios from "axios";

const AddType = () => {
  let [Type, setType] = useState("");
  let [types, setTypes] = useState([]);
  useEffect(() => {
    getData();
  });

  let getData = async () => {
    let res = await axios.get(
      `https://product-management-3f357-default-rtdb.firebaseio.com/type.json`
    );
    setTypes(Object.values(res.data));
  };
  let addType = async () => {
    let index = await containsType(types, Type);
    if (index === null) {
      let res = await new Promise(async (resolve) => {
        let r = await axios.post(
          `https://product-management-3f357-default-rtdb.firebaseio.com/type.json`,
          {
            typeTag: Type,
            id: "",
          }
        );
        resolve(r);
      });

      await new Promise(async (resolve) => {
        let url = `https://product-management-3f357-default-rtdb.firebaseio.com/type/${res.data.name}.json`;
        let r = await axios.patch(url, {
          id: res.data.name,
          typeTag: Type,
        });
        resolve(r);
      });

      setType("");
      document.querySelector(".display").style.display = "block";
    } else {
      document.querySelector(".display").style.display = "none";
      document.querySelector(".user").style.display = "block";
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
          Type Added Successfully
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
        Type already Exists
      </div>
      <div
        class="input-group"
        id="clockPicker3"
        style={{
          width: "80%",
        }}
      >
        <input
          class="form-control"
          placeholder="Enter Type: "
          value={Type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        />
        <div class="input-group-append">
          <button class="btn btn-primary" onClick={addType}>
            Add Type
          </button>
        </div>
      </div>
    </>
  );
};

export default AddType;

let containsType = (types, type) => {
  console.log(types);
  for (let i = 0; i < types.length; i++) {
    if (types[i].typeTag === type) {
      return i;
    }
  }
  return null;
};
