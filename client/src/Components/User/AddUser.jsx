import React, { useState } from "react";
import axios from "axios";

const AddUser = (props) => {
  let [isUser, setIsUser] = useState(false);
  let [user, setUser] = useState({
    id: "",
    password: "",
  });

  let makeUser = async () => {
    return {
      id: genRandom(5),
      password: genRandom(10),
    };
  };
  let submitUser = async () => {
    let obj = await makeUser();

    await new Promise(async (resolve, reject) => {
      let r = await axios.post(
        "https://product-management-3f357-default-rtdb.firebaseio.com/user.json",
        {
          userName: obj.id,
          passWord: obj.password,
          userId: "",
        }
      );
      let url = `https://product-management-3f357-default-rtdb.firebaseio.com/user/${r.data.name}.json`;
      r = await axios.patch(url, {
        userName: obj.id,
        passWord: obj.password,
        userId: r.data.name,
      });
      //console.log(r);
      await setUser(obj);
      await setIsUser(true);
      if (r) {
        resolve(r);
      } else {
        reject(r);
      }
    });
  };
  return (
    <>
      <div>
        <button
          style={{
            border: "0px",
            color: "#fff",
            backgroundColor: "#6777ef",
            padding: "15px",
            outline: "none",
          }}
          onClick={submitUser}
        >
          Generate User
        </button>
        {isUser ? (
          <>
            <hr />
            <div>
              <p>
                {" "}
                User ID : {user.id}
                <button
                  style={{
                    border: "0px",
                    color: "#fff",
                    backgroundColor: "#6777ef",
                    padding: "8px",
                    outline: "none",
                    marginLeft: "2%",
                  }}
                  className="copyId"
                  onClick={() => {
                    navigator.clipboard.writeText(user.id);
                    document.querySelector(".copyId").textContent = "Copied !";
                  }}
                >
                  Copy
                </button>
              </p>
              <p>
                {" "}
                Password : {user.password}
                <button
                  className="copyPwd"
                  style={{
                    border: "0px",
                    color: "#fff",
                    backgroundColor: "#6777ef",
                    padding: "8px",
                    outline: "none",
                    marginLeft: "2%",
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(user.password);
                    document.querySelector(".copyPwd").textContent = "Copied !";
                  }}
                >
                  Copy
                </button>
              </p>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default AddUser;

let genRandom = (len) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
