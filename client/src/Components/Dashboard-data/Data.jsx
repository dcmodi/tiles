import React, { useState, useEffect } from "react";
import "../../vendor/fontawesome-free/css/all.min.css";
import "../../vendor/bootstrap/css/bootstrap.min.css";
import "../../css/ruang-admin.min.css";
import { productRef, userRef, companyRef } from "../fire.js";
import { onValue } from "firebase/database";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductModal from "../Modal/PrdouctModal";

const Data = (props) => {
  let [products, setProducts] = useState([]);
  let [user, setUser] = useState([]);
  let [company, setCompany] = useState([]);
  let [rows, setRows] = useState([]);
  let [temp, setTemp] = useState([]);
  let [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    getData();
  }, []);

  let getData = async () => {
    await onValue(productRef, (snapshot) => {
      let productData = snapshot.val();
      setProducts(Object.values(productData));
    });

    await onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setUser(Object.values(data));
      setTemp(Object.values(data));
      setRows(Object.values(data).slice(0, 8));
    });

    await onValue(companyRef, (snapshot) => {
      let companyData = snapshot.val();
      setCompany(Object.values(companyData));
    });
  };

  let closeModal = () => {
    setIsOpen(false);
  };

  let filterData = (e) => {
    setSearch(e.target.value);
    temp = temp.filter((t) => {
      return t.userName.startsWith(e.target.value);
    });

    setRows(temp.slice(0, 8));
    setTemp(user);
  };
  return (
    <>
      <div className="container-fluid" id="container-wrapper">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="./">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Dashboard
            </li>
          </ol>
        </div>

        <div className="row mb-3">
          <div className="col-xl-4 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-uppercase mb-1">
                      Total Users
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {user.length === 0 ? null : user.length}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-users fa-2x text-info"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-uppercase mb-1">
                      Products
                    </div>
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {products.length}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="fas fa-shopping-cart fa-2x text-success"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-uppercase mb-1">
                      Companies
                    </div>
                    <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                      {company.length}
                    </div>
                  </div>
                  <div className="col-auto">
                    <i className="far fa-fw fa-2x fa-window-maximize"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/**<div className="col-xl-8 col-lg-7">
            <div className="card mb-4">
              <div
                className="
                      card-header
                      py-3
                      d-flex
                      flex-row
                      align-items-center
                      justify-content-between
                    "
              >
                <h6 className="m-0 font-weight-bold text-primary">
                  Monthly Recap Report
                </h6>
                <div className="dropdown no-arrow">
                  <a
                    className="dropdown-toggle"
                    href="#a"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                  </a>
                  <div
                    className="
                          dropdown-menu dropdown-menu-right
                          shadow
                          animated--fade-in
                        "
                    aria-labelledby="dropdownMenuLink"
                  >
                    <div className="dropdown-header">Dropdown Header:</div>
                    <a className="dropdown-item" href="#a">
                      Action
                    </a>
                    <a className="dropdown-item" href="#a">
                      Another action
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#a">
                      Something else here
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="chart-area">
                  <canvas id="myAreaChart"></canvas>
                </div>
              </div>
            </div>
          </div>
 */}
          {/**<div className="col-xl-4 col-lg-5">
            <div className="card mb-4">
              <div
                className="
                      card-header
                      py-3
                      d-flex
                      flex-row
                      align-items-center
                      justify-content-between
                    "
              >
                <h6 className="m-0 font-weight-bold text-primary">
                  Products Sold
                </h6>
                <div className="dropdown no-arrow">
                  <a
                    className="dropdown-toggle btn btn-primary btn-sm"
                    href="#a"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Month <i className="fas fa-chevron-down"></i>
                  </a>
                  <div
                    className="
                          dropdown-menu dropdown-menu-right
                          shadow
                          animated--fade-in
                        "
                    aria-labelledby="dropdownMenuLink"
                  >
                    <div className="dropdown-header">Select Periode</div>
                    <a className="dropdown-item" href="#a">
                      Today
                    </a>
                    <a className="dropdown-item" href="#a">
                      Week
                    </a>
                    <a className="dropdown-item active" href="#a">
                      Month
                    </a>
                    <a className="dropdown-item" href="#a">
                      This Year
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <div className="small text-gray-500">
                    Oblong T-Shirt
                    <div className="small float-right">
                      <b>600 of 800 Items</b>
                    </div>
                  </div>
                  <div className="progress" style={{ height: "12px" }}>
                    <div
                      className="progress-bar bg-warning"
                      role="progressbar"
                      style={{ width: "80%" }}
                      aria-valuenow="80"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="small text-gray-500">
                    Gundam 90'Editions
                    <div className="small float-right">
                      <b>500 of 800 Items</b>
                    </div>
                  </div>
                  <div className="progress" style={{ height: "12px" }}>
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: "70%" }}
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="small text-gray-500">
                    Rounded Hat
                    <div className="small float-right">
                      <b>455 of 800 Items</b>
                    </div>
                  </div>
                  <div className="progress" style={{ height: "12px" }}>
                    <div
                      className="progress-bar bg-danger"
                      role="progressbar"
                      style={{ width: "55%" }}
                      aria-valuenow="55"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="small text-gray-500">
                    Indomie Goreng
                    <div className="small float-right">
                      <b>400 of 800 Items</b>
                    </div>
                  </div>
                  <div className="progress" style={{ height: "12px" }}>
                    <div
                      className="progress-bar bg-info"
                      role="progressbar"
                      style={{ width: "50%" }}
                      aria-valuenow="50"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="small text-gray-500">
                    Remote Control Car Racing
                    <div className="small float-right">
                      <b>200 of 800 Items</b>
                    </div>
                  </div>
                  <div className="progress" style={{ height: "12px" }}>
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: "30%" }}
                      aria-valuenow="30"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
              <div className="card-footer text-center">
                <a className="m-0 small text-primary card-link" href="#a">
                  View More <i className="fas fa-chevron-right"></i>
                </a>
              </div>
            </div>
          </div>
 */}
          <div className="col-xl-12 col-lg-12 mb-12">
            <div className="card">
              <div
                className="
                      card-header
                      py-3
                      d-flex
                      flex-row
                      align-items-center
                      justify-content-between
                    "
              >
                <input
                  className="form-control"
                  type="text"
                  placeholder="Search User.."
                  aria-label="Search"
                  value={search}
                  onChange={filterData}
                  style={{
                    width: "20vw",
                    paddingLeft: "10px",
                  }}
                />

                <Link
                  className="m-0 float-right btn btn-danger btn-sm"
                  to="/view-user"
                >
                  View More <i className="fas fa-chevron-right"></i>
                </Link>
              </div>
              <div className="table-responsive">
                <table className="table align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th>UserName</th>
                      <th>Password</th>
                      <th colSpan="2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length !== 0
                      ? rows.map((val, index) => {
                          return (
                            <TableRow
                              key={index}
                              value={val}
                              setOpen={setIsOpen}
                              setId={setId}
                            />
                          );
                        })
                      : null}
                  </tbody>
                </table>
              </div>
              {isOpen && <ProductModal close={closeModal} userId={id} />}
              <div className="card-footer"></div>
            </div>
          </div>

          {/**
          <div className="col-xl-4 col-lg-5">
            <div className="card">
              <div
                className="
                      card-header
                      py-4
                      bg-primary
                      d-flex
                      flex-row
                      align-items-center
                      justify-content-between
                    "
              >
                <h6 className="m-0 font-weight-bold text-light">
                  Message From Customer
                </h6>
              </div>
              <div>
                <div className="customer-message align-items-center">
                  <a className="font-weight-bold" href="#a">
                    <div className="text-truncate message-title">
                      Hi there! I am wondering if you can help me with a problem
                      I've been having.
                    </div>
                    <div
                      className="
                            small
                            text-gray-500
                            message-time
                            font-weight-bold
                          "
                    >
                      Udin Cilok · 58m
                    </div>
                  </a>
                </div>
                <div className="customer-message align-items-center">
                  <a href="#a">
                    <div className="text-truncate message-title">
                      But I must explain to you how all this mistaken idea
                    </div>
                    <div className="small text-gray-500 message-time">
                      Nana Haminah · 58m
                    </div>
                  </a>
                </div>
                <div className="customer-message align-items-center">
                  <a className="font-weight-bold" href="#a">
                    <div className="text-truncate message-title">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </div>
                    <div
                      className="
                            small
                            text-gray-500
                            message-time
                            font-weight-bold
                          "
                    >
                      Jajang Cincau · 25m
                    </div>
                  </a>
                </div>
                <div className="customer-message align-items-center">
                  <a className="font-weight-bold" href="#a">
                    <div className="text-truncate message-title">
                      At vero eos et accusamus et iusto odio dignissimos ducimus
                      qui blanditiis
                    </div>
                    <div
                      className="
                            small
                            text-gray-500
                            message-time
                            font-weight-bold
                          "
                    >
                      Udin Wayang · 54m
                    </div>
                  </a>
                </div>
                <div className="card-footer text-center">
                  <a className="m-0 small text-primary card-link" href="#a">
                    View More <i className="fas fa-chevron-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
         */}
        </div>

        <div
          className="modal fade"
          id="logoutModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabelLogout"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabelLogout">
                  Ohh No!
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to logout?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <a href="login.html" className="btn btn-primary">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const TableRow = (props) => {
  return (
    <>
      <tr>
        <td>{props.value.userName}</td>
        <td>{props.value.passWord}</td>
        <td>
          <span
            className="btn btn-sm btn-primary"
            style={{ cursor: "pointer" }}
            onClick={() => {
              props.setOpen(true);
              props.setId(props.value.userId);
            }}
          >
            Detail
          </span>
        </td>
        <td>
          <span
            className="btn btn-sm btn-danger"
            style={{ cursor: "pointer" }}
            onClick={async () => {
              let ans = await window.confirm(
                `Do you want to delete ${props.value.userName} ?`
              );
              if (ans) {
                await axios.delete(
                  `https://product-management-3f357-default-rtdb.firebaseio.com/user/${props.value.userId}.json`
                );
              }
            }}
          >
            Delete
          </span>
        </td>
      </tr>
    </>
  );
};

export default Data;
