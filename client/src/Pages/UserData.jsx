import Navbar from "../Components/Navbar/Navbar";
import UserTable from "../Components/UserTable/UserTable";
import React, { useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";

const UserData = () => {
  let [toggle, setToggle] = useState(false);
  return (
    <>
      <div id="page-top">
        <div id="wrapper">
          <Sidebar toggle={toggle} />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar setToggle={setToggle} toggle={toggle} />
              <UserTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserData;
