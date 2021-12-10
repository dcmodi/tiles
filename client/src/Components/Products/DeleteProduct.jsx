import React, { useState } from "react";
import axios from "axios";
let successSyle = {
  backgroundColor: "#66bb6a",
  width: "70%",
  height: "10%",
  color: "white",
  display: "none",
};

const DeleteProduct = () => {
  let [id, setid] = useState("");

  let deleteProduct = async () => {
    await axios.delete(
      `https://product-management-3f357-default-rtdb.firebaseio.com/product/${id}.json`
    );
    setid("");
    document.querySelector(".delete").style.display = "block";
  };
  return (
    <>
      <div className="delete ml-2" style={successSyle}>
        <p>
          <span className="ml-2">Type Deleted Successfully</span>
          <span
            style={{
              color: "#333",
              fontSize: "2em",
              position: "absolute",
              top: "4.5%",
              right: "32%",
              cursor: "pointer",
            }}
            onClick={() => {
              document.querySelector(".delete").style.display = "none";
            }}
          >
            &times;
          </span>
        </p>
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
          placeholder="Enter Product Id"
          value={id}
          onChange={(e) => {
            setid(e.target.value);
          }}
        />
        <div class="input-group-append">
          <button class="btn btn-primary" onClick={deleteProduct}>
            Delete id
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteProduct;
