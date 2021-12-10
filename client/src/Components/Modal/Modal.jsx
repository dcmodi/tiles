import React from "react";
import "./Modal.css";
import "../../vendor/bootstrap/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import AddCompany from "../Company/AddCompany";
import AddUser from "../User/AddUser";
import DeleteUser from "../User/DeleteUser";
import DeleteCompany from "../Company/DeleteCompany";
import AddSize from "../Size/AddSize";
import DeleteSize from "../Size/DeleteSize";
import AddType from "../Type/AddType";
import DeleteType from "../Type/DeleteType";
import DeleteProduct from "../Products/DeleteProduct";
import AddProduct from "../Products/AddProduct";
import { useHistory } from "react-router-dom";

const Modal = (props) => {
  let history = useHistory();
  
  return (
    <>
      <div className="modal-container">
        <div id="popup1" className="overlay">
          <div className="popup">
            <Link
              className="close"
              to={history.location.pathname}
              onClick={() => {
                props.close();
              }}
            >
              &times;
            </Link>
            <div className="content">
              {props.modal === "addUser" ? <AddUser /> : null}
              {props.modal === "deleteUser" ? <DeleteUser /> : null}
              {props.modal === "addCompany" ? <AddCompany /> : null}
              {props.modal === "deleteCompany" ? <DeleteCompany /> : null}
              {props.modal === "addSize" ? <AddSize /> : null}
              {props.modal === "deleteSize" ? <DeleteSize /> : null}
              {props.modal === "addType" ? <AddType /> : null}
              {props.modal === "deleteType" ? <DeleteType /> : null}
              {props.modal === "addProduct" ? <AddProduct /> : null}
              {props.modal === "deleteProduct" ? <DeleteProduct /> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
