import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteType = () => {
  let [id, setId] = useState("");
  let [types, setTypes] = useState([]);
  let [offset, setOffset] = useState(0);
  useEffect(() => {
    getData();
  }, [offset]);
  let getData = async () => {
    let res = await axios.get(
      `https://product-management-3f357-default-rtdb.firebaseio.com/type.json`
    );
    setTypes(Object.values(res.data));
  };

  let deleteType = async () => {
    await axios.delete(
      `https://product-management-3f357-default-rtdb.firebaseio.com/type/${id}.json`
    );
    setOffset(offset + 1);
    document.querySelector(".display").style.display = "block";
  };
  return (
    <>
      <center>
        <div
          className="delete alert alert-success display"
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
              document.querySelector(".delete").style.display = "none";
            }}
          >
            &times;
          </button>
          Type Deleted Successfully
        </div>
      </center>
      <div
        class="input-group"
        id="clockPicker3"
        style={{
          width: "80%",
        }}
      >
        <select
          className="form-control"
          id="type"
          aria-describedby="emailHelp"
          name="type"
          onChange={(e) => {
            setId(e.target.value);
          }}
        >
          <option value="select">--SELECT--</option>
          {types.map((val, index) => {
            return (
              <option value={val.id} key={index}>
                {val.typeTag}{" "}
              </option>
            );
          })}
        </select>
        <div class="input-group-append">
          <button class="btn btn-primary" onClick={deleteType}>
            Delete Type
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteType;
