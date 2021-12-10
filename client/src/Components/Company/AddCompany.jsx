import React, { useState, useEffect } from "react";
import axios from "axios";

const AddCompany = () => {
  let [company, setcompany] = useState("");
  let [companies, setCompanies] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  let getData = async () => {
    let res = await axios.get(
      `https://product-management-3f357-default-rtdb.firebaseio.com/company.json`
    );

    await setCompanies(Object.values(res.data));
  };

  let addCompany = async () => {
    let index = await containsCompany(companies, company);
    if (index === null) {
      let res = await new Promise(async (resolve) => {
        let r = await axios.post(
          `https://product-management-3f357-default-rtdb.firebaseio.com/company.json`,
          {
            companyTag: company,
            id: "",
          }
        );
        resolve(r);
      });

      await new Promise(async (resolve) => {
        let url = `https://product-management-3f357-default-rtdb.firebaseio.com/company/${res.data.name}.json`;
        let r = await axios.patch(url, {
          id: res.data.name,
          companyTag: company,
        });
        resolve(r);
      });

      setcompany("");
      document.querySelector(".delete").style.display = "block";
    } else {
      document.querySelector(".delete").style.display = "none";
      document.querySelector(".user").style.display = "block";
    }
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
              document.querySelector(".display").style.display = "none";
            }}
          >
            &times;
          </button>
          Company Added Successfully
        </div>
      </center>

      <div
        className="input-group"
        id="clockPicker3"
        style={{
          width: "80%",
        }}
      >
        <input
          className="form-control"
          placeholder="Enter Company Name: "
          value={company}
          minLength={1}
          onChange={(e) => {
            setcompany(e.target.value);
          }}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={addCompany}>
            Add Company
          </button>
        </div>
      </div>
    </>
  );
};

export default AddCompany;

let containsCompany = (sizes, size) => {
  console.log(sizes);
  for (let i = 0; i < sizes.length; i++) {
    if (sizes[i].sizeTag === size) {
      return i;
    }
  }
  return null;
};
