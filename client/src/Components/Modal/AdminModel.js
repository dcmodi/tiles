import React from "react";
import { Link, useHistory } from "react-router-dom";
import AddAdmin from "../Admin/AddAdmin";
import ChangeAdmin from "../Admin/ChangeAdmin";

import "./ProductModal.css";

const AdminModel = (props) => {
  let history = useHistory();
  return (
    <>
      <div className="adminModal">
        <center>
          <div id="myModal" style={{ width: "50%", height: "20%" }}>
            <div className="productModal-content">
              <Link
                className="productClose"
                to={history.location.pathname}
                onClick={() => {
                  props.close();
                }}
              >
                &times;
              </Link>
              {props.modal === "add" ? <AddAdmin /> : null}
              {props.modal === "change" ? <ChangeAdmin /> : null}
            </div>
          </div>
        </center>
      </div>
    </>
  );
};

export default AdminModel;
