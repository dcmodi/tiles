import React, { useState, useEffect } from "react";
import axios from "axios";

const AddSize = () => {
  let [size, setSize] = useState("");
  let [sizes, setSizes] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  let getData = async () => {
    let res = await axios.get(
      `https://product-management-3f357-default-rtdb.firebaseio.com/size.json`
    );

    await setSizes(Object.values(res.data));
  };

  let addSize = async () => {
    let index = await containsType(sizes, size);
    if (index === null) {
      let res = await new Promise(async (resolve) => {
        let r = await axios.post(
          `https://product-management-3f357-default-rtdb.firebaseio.com/size.json`,
          {
            sizeTag: size,
            id: "",
          }
        );
        resolve(r);
      });

      await new Promise(async (resolve) => {
        let url = `https://product-management-3f357-default-rtdb.firebaseio.com/size/${res.data.name}.json`;
        let r = await axios.patch(url, {
          id: res.data.name,
          sizeTag: size,
        });
        resolve(r);
      });

      setSize("");
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
          Size Added Successfully
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
        Size already Exists
      </div>
      <div
        className="input-group"
        id="clockPicker3"
        style={{
          width: "80%",
        }}
      >
        <input
          className="form-control"
          placeholder="Enter Size: "
          value={size}
          onChange={(e) => {
            setSize(e.target.value);
          }}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={addSize}>
            Add size
          </button>
        </div>
      </div>
    </>
  );
};

export default AddSize;
let containsType = (sizes, size) => {
  console.log(sizes);
  for (let i = 0; i < sizes.length; i++) {
    if (sizes[i].sizeTag === size) {
      return i;
    }
  }
  return null;
};
