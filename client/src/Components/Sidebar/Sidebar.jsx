import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../vendor/fontawesome-free/css/all.min.css";
import "../../vendor/bootstrap/css/bootstrap.min.css";
import "../../css/ruang-admin.min.css";
import "../../../node_modules/reactjs-popup/dist/index.css";
import user from "../../img/user.png";
import Modal from "../Modal/Modal";

const Sidebar = (props) => {
  useEffect(() => {
    if (props.toggle) {
      document.querySelector(".sidebar").classList.add("toggled");
    } else {
      if (document.querySelector(".sidebar").classList.contains("toggled")) {
        document.querySelector(".sidebar").classList.remove("toggled");
      }
    }
  });

  //User Popup
  const [modal, setModal] = useState("");
  const [open, setOpen] = useState(false);
  let closeModal = () => {
    setOpen(false);
    setModal("");
  };
  return (
    <>
      <ul
        className="navbar-nav sidebar sidebar-light accordion"
        id="accordionSidebar"
      >
        <Link
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to="/"
        >
          <div className="sidebar-brand-icon">
            <img src={user} alt="user" />
          </div>
          <div className="sidebar-brand-text mx-3">City Tiles</div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        <li className="nav-item">
          <span
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapseBootstrap"
            aria-expanded="true"
            aria-controls="collapseBootstrap"
          >
            <i className="far fa-fw fa-user"></i>
            <span>Users</span>
          </span>
          <div
            id="collapseBootstrap"
            className="collapse"
            aria-labelledby="headingBootstrap"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Manage Users</h6>

              <a
                href="#popup1"
                className="collapse-item"
                onClick={() => {
                  setModal("addUser");
                  setOpen(true);
                }}
              >
                Add User
              </a>

              <Link className="collapse-item" to="/view-user">
                Display Users
              </Link>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <span
            className="nav-link collapsed"
            href="#a"
            data-toggle="collapse"
            data-target="#collapseForm"
            aria-expanded="true"
            aria-controls="collapseForm"
          >
            <i className="fab fa-fw fa-wpforms"></i>
            <span>Proudcts</span>
          </span>
          <div
            id="collapseForm"
            className="collapse"
            aria-labelledby="headingForm"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">manage product</h6>
              <a
                className="collapse-item"
                href="#popup1"
                onClick={() => {
                  setOpen(true);
                  setModal("addProduct");
                }}
              >
                Add Product
              </a>
              
              <Link className="collapse-item" to="/view-products">
                Display products
              </Link>
              
            </div>
          </div>
        </li>

        <li className="nav-item">
          <span
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapseCompany"
            aria-expanded="true"
            aria-controls="collapseBootstrap"
          >
            <i className="far fa-fw fa-window-maximize"></i>
            <span>Companies</span>
          </span>
          <div
            id="collapseCompany"
            className="collapse"
            aria-labelledby="headingBootstrap"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Manage Companies</h6>
              <a
                className="collapse-item"
                href="#popup1"
                onClick={() => {
                  setOpen(true);
                  setModal("addCompany");
                }}
              >
                Add Company
              </a>

              <a
                className="collapse-item"
                href="#popup1"
                onClick={() => {
                  setOpen(true);
                  setModal("deleteCompany");
                }}
              >
                Delete Company
              </a>
            </div>
          </div>
        </li>
        <li className="nav-item">
          <span
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapseSize"
            aria-expanded="true"
            aria-controls="collapseBootstrap"
          >
            <i className="far fa-fw fa-window-maximize"></i>
            <span>Size</span>
          </span>
          <div
            id="collapseSize"
            className="collapse"
            aria-labelledby="headingBootstrap"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Manage Size</h6>
              <a
                className="collapse-item"
                href="#popup1"
                onClick={() => {
                  setOpen(true);
                  setModal("addSize");
                }}
              >
                Add Size
              </a>

              <a
                className="collapse-item"
                href="#popup1"
                onClick={() => {
                  setOpen(true);
                  setModal("deleteSize");
                }}
              >
                Delete Size
              </a>
            </div>
          </div>
        </li>

        <li className="nav-item">
          <span
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapseType"
            aria-expanded="true"
            aria-controls="collapseBootstrap"
          >
            <i className="far fa-fw fa-window-maximize"></i>
            <span>Type</span>
          </span>
          <div
            id="collapseType"
            className="collapse"
            aria-labelledby="headingBootstrap"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Manage Type</h6>
              <a
                className="collapse-item"
                href="#popup1"
                onClick={() => {
                  setOpen(true);
                  setModal("addType");
                }}
              >
                Add Type
              </a>

              <a
                className="collapse-item"
                href="#popup1"
                onClick={() => {
                  setOpen(true);
                  setModal("deleteType");
                }}
              >
                Delete Type
              </a>
            </div>
          </div>
        </li>

        <hr className="sidebar-divider" />
      </ul>
      {open && <Modal id="popup1" close={closeModal} modal={modal} />}
    </>
  );
};

export default Sidebar;
