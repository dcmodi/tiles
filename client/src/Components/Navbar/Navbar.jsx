import React, { useState } from "react";
import "../../vendor/fontawesome-free/css/all.min.css";
import "../../vendor/bootstrap/css/bootstrap.min.css";
import "../../css/ruang-admin.min.css";
import user from "../../img/user.png";
import { auth1 } from "../../Auth/Auth";
import AdminModel from "../Modal/AdminModel";

const Navbar = (props) => {
  //User Popup
  const [modal, setModal] = useState("");
  const [open, setOpen] = useState(false);
  let closeModal = () => {
    setOpen(false);
    setModal("");
  };
  return (
    <>
      <nav
        className="
              navbar navbar-expand navbar-light
              bg-navbar
              topbar
              mb-4
              static-top
            "
      >
        <button
          style={{ color: "#fff" }}
          id="sidebarToggleTop"
          className="btn btn-link rounded-circle mr-3"
          onClick={() => {
            props.setToggle(!props.toggle);
          }}
          onMouseOver={() => {
            document.querySelector("#sidebarToggleTop").style.color = "#6777ef";
          }}
          onMouseOut={() => {
            document.querySelector("#sidebarToggleTop").style.color = "#fff";
          }}
        >
          <i className="fa fa-bars"></i>
        </button>
        <ul className="navbar-nav ml-auto">
          <div className="topbar-divider d-none d-sm-block"></div>
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#a"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                className="img-profile rounded-circle"
                src={user}
                style={{ maxWidth: "60px" }}
                alt="abc"
              />
              <span className="ml-2 d-none d-lg-inline text-white small">
                {auth1.getUserName()}
              </span>
            </a>
            <div
              className="
                    dropdown-menu dropdown-menu-right
                    shadow
                    animated--grow-in
                  "
              aria-labelledby="userDropdown"
            >
              <span
                className="dropdown-item"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setOpen(true);
                  setModal("add");
                }}
              >
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Add Admin
              </span>
              <span
                className="dropdown-item"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setOpen(true);
                  setModal("change");
                }}
              >
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Change Number
              </span>
              <div className="dropdown-divider"></div>
              <p
                className="dropdown-item"
                data-toggle="modal"
                data-target="#alogoutModal"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  auth1.logOut();
                }}
              >
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </p>
            </div>
          </li>
        </ul>
      </nav>
      {open && <AdminModel close={closeModal} modal={modal} />}
    </>
  );
};

export default Navbar;
