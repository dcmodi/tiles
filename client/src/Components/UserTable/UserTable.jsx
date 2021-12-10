import React, { useEffect, useState } from "react";
import "../../vendor/fontawesome-free/css/all.min.css";
import "../../vendor/bootstrap/css/bootstrap.min.css";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../css/Pagination.css";
import ProductModal from "../Modal/PrdouctModal";

const UserTable = () => {
  const [data, setData] = useState([]);
  const [dataPerPage, setDataPerPage] = useState(50);
  const [rows, setRows] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");

  let [search, setSearch] = useState("");
  let [temp, setTemp] = useState([]);

  let closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setPagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, dataPerPage]);
  const getData = async () => {
    let res = await new Promise(async (resolve, reject) => {
      let r = await axios.get(
        "https://product-management-3f357-default-rtdb.firebaseio.com/user.json/"
      );
      if (r) {
        resolve(r);
      } else {
        reject(r);
      }
    });
    await setData(Object.values(res.data));
    await setTemp(Object.values(res.data));
    await setRows(
      Object.values(res.data).slice(
        (offset - 1) * dataPerPage,
        (offset - 1) * dataPerPage + dataPerPage
      )
    );
    await setPageCount(() => {
      return Math.ceil(Object.values(res.data).length / dataPerPage);
    });
  };
  const setPagination = async () => {
    await setPageCount(() => {
      return Math.ceil(data.length / dataPerPage);
    });
    await setRows(() => {
      return temp.slice(
        (offset - 1) * dataPerPage,
        (offset - 1) * dataPerPage + dataPerPage
      );
    });
  };
  let handlePageClick = (event) => {
    const selectedPage = event.selected;
    setOffset(selectedPage + 1);
  };
  let filterData = (e) => {
    setSearch(e.target.value);
    temp = temp.filter((t) => {
      return t.userName.startsWith(e.target.value);
    });

    setRows(
      temp.slice(
        (offset - 1) * dataPerPage,
        (offset - 1) * dataPerPage + dataPerPage
      )
    );
    setTemp(data);
  };
  return (
    <>
      {data.length !== 0 ? (
        <div className="container-fluid" id="container-wrapper">
          {/* Breadcrumb */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Users</h1>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">Users</li>
              <li className="breadcrumb-item active" aria-current="page">
                Display Users
              </li>
            </ol>
          </div>
          {/*End Breadcrumb */}
          {/* Row */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">
                    User Data
                  </h6>
                </div>
                <div className="ml-4 mt-2">
                  <span className="ml-4">Show</span>
                  <span className="ml-1">
                    <select
                      onChange={(e) => {
                        setDataPerPage(parseInt(e.target.value));
                      }}
                      style={{
                        paddingRight: "10px",
                      }}
                    >
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="200">200</option>
                      <option value="500">500</option>
                    </select>
                  </span>
                  <span className="ml-1">Entires</span>
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Search User.."
                    aria-label="Search"
                    value={search}
                    onChange={filterData}
                    style={{
                      width: "20vw",
                      paddingLeft: "10px",
                      marginLeft: "auto",
                      marginRight: "5%",
                    }}
                  />
                </div>

                <div className="table-responsive p-3">
                  <table
                    className="table align-items-center table-flush table-hover"
                    id="dataTableHover"
                  >
                    <thead className="thead-light">
                      <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th colSpan="2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((val, index) => {
                        return (
                          <TableRow
                            key={index}
                            value={val}
                            setOpen={setIsOpen}
                            setId={setId}
                          />
                        );
                      })}
                    </tbody>
                  </table>

                  <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                  />
                </div>
              </div>
            </div>
          </div>

          {isOpen && <ProductModal close={closeModal} userId={id} />}
          {/* End Row */}
        </div>
      ) : null}
    </>
  );
};
export default UserTable;

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
