import React, { useState } from "react";
import axios from "axios";

let successSyle = {
  backgroundColor: "#66bb6a",
  width: "70%",
  height: "10%",
  color: "white",
  display: "none",
};

let deleteSyle = {
  backgroundColor: "#fc544b",
  width: "70%",
  height: "10%",
  color: "white",
  display: "none",
};
const DeleteUser = () => {
  let [id, setId] = useState("");
  return (
    <>
      <div className="delete ml-2" style={successSyle}>
        <p>
          <span className="ml-2">User Deleted Successfully</span>
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

      <div className="user ml-2" style={deleteSyle}>
        <p>
          <span className="ml-2">User Not Found</span>
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
              document.querySelector(".user").style.display = "none";
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
          placeholder="Enter User ID"
          value={id}
          maxLength={5}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <div class="input-group-append">
          <button
            class="btn btn-primary"
            onClick={async () => {
              let ans = await window.confirm(`Do you want to delete ${id}?`);
              if (ans) {
                let usersData = await new Promise(async (resolve, reject) => {
                  let r = await axios.get(
                    "https://product-management-3f357-default-rtdb.firebaseio.com/user.json/"
                  );
                  if (r) {
                    resolve(r);
                  } else {
                    reject(r);
                  }
                });
                let index = containsUser(Object.values(usersData.data), id);
                if (index === null) {
                  document.querySelector(".user").style.display = "block";
                } else {
                  let res = await new Promise(async (resolve, reject) => {
                    let r = await axios.delete(
                      `https://product-management-3f357-default-rtdb.firebaseio.com/user/${
                        Object.keys(usersData.data)[index]
                      }.json`
                    );
                    if (r) {
                      resolve(r);
                    } else {
                      reject(r);
                    }
                  });
                  if (res.status === 200) {
                    document.querySelector(".delete").style.display = "block";
                    setId("");
                  }
                }
              }
            }}
          >
            Delete User
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteUser;

let containsUser = (users, id) => {
  let index = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].userName === id) {
      return i;
    }
  }
  return index;
};
