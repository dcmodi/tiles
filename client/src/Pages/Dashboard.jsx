import React, { useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import "../vendor/fontawesome-free/css/all.min.css";
import "../vendor/bootstrap/css/bootstrap.min.css";
import "../css/ruang-admin.min.css";
import Data from "../Components/Dashboard-data/Data";
import Navbar from "../Components/Navbar/Navbar";

const Dashboard = () => {
  let [toggle, setToggle] = useState(false);
  
  return (
    <>
      <div id="page-top">
        <div id="wrapper">
          <Sidebar toggle={toggle} />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar setToggle={setToggle} toggle={toggle} />
              <Data />
            </div>
          </div>
        </div>
      </div>

      <script src="../vendor/jquery/jquery.min.js"></script>
      <script src="../vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
      <script src="../vendor/jquery-easing/jquery.easing.min.js"></script>
      <script src="../js/ruang-admin.min.js"></script>
    </>
  );
};

export default Dashboard;
