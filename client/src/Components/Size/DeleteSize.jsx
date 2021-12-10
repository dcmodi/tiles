import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteSize = () => {
  let [id, setId] = useState("");
  let [sizes, setSizes] = useState([]);
  let [offset, setOffset] = useState(0);

  useEffect(() => {
    getData();
  }, [offset]);
  let getData = async () => {
    let res = await axios.get(
      `https://product-management-3f357-default-rtdb.firebaseio.com/size.json`
    );
    setSizes(Object.values(res.data));
  };

  let deleteSize = async () => {
    await axios.delete(
      `https://product-management-3f357-default-rtdb.firebaseio.com/size/${id}.json`
    );
    setOffset(offset + 1);
    document.querySelector(".delete").style.display = "block";
  };
  return (
    <>
      <center>
        <div
          class="alert alert-success delete"
          style={{
            display: "none",
          }}
        >
          <button
            type="button"
            class="close"
            style={{
              marginTop: "-1vh",
            }}
            onClick={() => {
              document.querySelector(".delete").style.display = "none";
            }}
          >
            &times;
          </button>
          Size Deleted Successfully.
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
          name="size"
          onChange={(e) => {
            setId(e.target.value);
          }}
        >
          <option value="select">--SELECT--</option>
          {sizes.map((val, index) => {
            return (
              <option value={val.id} key={index}>
                {val.sizeTag}{" "}
              </option>
            );
          })}
        </select>
        <div class="input-group-append">
          <button class="btn btn-primary" onClick={deleteSize}>
            Delete Size
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteSize;
