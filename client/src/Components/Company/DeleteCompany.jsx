import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteCompany = () => {
  let [id, setId] = useState("");
  let [companies, setcompanies] = useState([]);
  let [offset, setOffset] = useState(0);

  useEffect(() => {
    getData();
  }, [offset]);
  let getData = async () => {
    let res = await axios.get(
      `https://product-management-3f357-default-rtdb.firebaseio.com/company.json`
    );
    setcompanies(Object.values(res.data));
  };

  let deleteCompany = async () => {
    await axios.delete(
      `https://product-management-3f357-default-rtdb.firebaseio.com/company/${id}.json`
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
          Company Deleted Successfully
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
          name="company"
          onChange={(e) => {
            setId(e.target.value);
          }}
        >
          <option value="select">--SELECT--</option>
          {companies.map((val, index) => {
            return (
              <option value={val.id} key={index}>
                {val.companyTag}{" "}
              </option>
            );
          })}
        </select>
        <div class="input-group-append">
          <button class="btn btn-primary" onClick={deleteCompany}>
            Delete Company
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteCompany;
