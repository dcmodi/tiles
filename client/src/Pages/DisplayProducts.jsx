import React, { useState } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import ProductData from "../Components/Products/ProductData";

const DisplayProducts = () => {
  let [toggle, setToggle] = useState(false);

  return (
    <>
      <div id="page-top">
        <div id="wrapper">
          <Sidebar toggle={toggle} />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar setToggle={setToggle} toggle={toggle} />
              <ProductData />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayProducts;
