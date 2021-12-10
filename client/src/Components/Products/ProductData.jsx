import React, { useEffect, useState } from "react";
import "../../vendor/fontawesome-free/css/all.min.css";
import "../../vendor/bootstrap/css/bootstrap.min.css";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import "../../css/Pagination.css";
import { productRef } from "../fire";
import { onValue } from "firebase/database";
import axios from "axios";

const ProductData = () => {
  let [data, setData] = useState([]);
  const [dataPerPage, setDataPerPage] = useState(50);
  const [rows, setRows] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(1);

  let [search, setSearch] = useState("");

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setPagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, dataPerPage]);
  const getData = async () => {
    await onValue(productRef, async (snapshot) => {
      let productData = await snapshot.val();
      await setData(Object.values(productData).reverse());
      await setRows(
        Object.values(productData)
          .reverse()
          .slice(
            (offset - 1) * dataPerPage,
            (offset - 1) * dataPerPage + dataPerPage
          )
      );
      //console.log(rows);
      await setPageCount(() => {
        return Math.ceil(Object.values(productData).length / dataPerPage);
      });
    });
  };
  const setPagination = async () => {
    await setPageCount(() => {
      return Math.ceil(data.length / dataPerPage);
    });
    await setRows(() => {
      return data.slice(
        (offset - 1) * dataPerPage,
        (offset - 1) * dataPerPage + dataPerPage
      );
    });
  };
  let handlePageClick = (event) => {
    const selectedPage = event.selected;
    setOffset(selectedPage + 1);
  };
  let filterData = async (e) => {
    await setSearch(e.target.value);

    let newData = await data.filter((d) => {
      if (d.productName.startsWith(e.target.value)) {
        return d;
      }
      return null;
    });
    await setRows([]);
    await setRows(() => {
      return newData.slice(
        (offset - 1) * dataPerPage,
        (offset - 1) * dataPerPage + dataPerPage
      );
    });
  };
  return (
    <>
      {data.length !== 0 ? (
        <div className="container-fluid" id="container-wrapper">
          {/* Breadcrumb */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Products</h1>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">Products</li>
              <li className="breadcrumb-item active" aria-current="page">
                Display Products
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
                    Product Data
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
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search Product.."
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
                  <span className="ml-1">Entires</span>
                </div>
                <div className="table-responsive p-3">
                  <table
                    className="table align-items-center table-flush table-hover"
                    id="dataTableHover"
                  >
                    <thead className="thead-light">
                      <tr>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Company</th>
                        <th>Size</th>
                        <th>Type</th>
                        <th>Sales</th>
                        <th>Current</th>
                        <th>Pending</th>
                        <th
                          colSpan="3"
                          style={{
                            textAlign: "center",
                          }}
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.length !== 0
                        ? rows.map((val, index) => {
                            return <TableRow key={index} value={val} />;
                          })
                        : null}
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
          {/* End Row */}
        </div>
      ) : null}
    </>
  );
};

export default ProductData;
const TableRow = (props) => {
  const initState = {
    name: props.value.productName,
    company: props.value.company,
    size: props.value.size,
    type: props.value.type,
    sales: props.value.sales,
    pending: props.value.pending,
    current: props.value.current,
    imageURL: props.value.imageURL,
    id: props.value.id,
  };
  let [product, setProduct] = useState(initState);

  let notEditableStyle = {
    outline: "none",
    border: "none",
    background: "none",
  };
  let [isEditable, setIsEditable] = useState(false);

  let handleInput = (e) => {
    setProduct((oldData) => {
      return {
        ...oldData,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <>
      <tr>
        <td>
          <img
            src={`${product.imageURL}`}
            alt="img"
            style={{
              height: "6vh",
              width: "4vw",
              borderRadius: "20%",
            }}
          />
        </td>

        <td>
          <input
            value={product.name}
            readOnly={!isEditable}
            name="name"
            className={`${props.value.id}`}
            style={isEditable ? null : notEditableStyle}
            minLength={1}
            size={15}
            onChange={handleInput}
          />
        </td>
        <td>
          <input
            value={product.company}
            readOnly={!isEditable}
            name="company"
            className={`${props.value.id}`}
            style={isEditable ? null : notEditableStyle}
            minLength={1}
            size={15}
            onChange={handleInput}
          />
        </td>
        <td>
          <input
            onChange={handleInput}
            value={product.size}
            name={"size"}
            readOnly={!isEditable}
            className={`${props.value.id}`}
            style={isEditable ? null : notEditableStyle}
            minLength={1}
            size={5}
          />
        </td>
        <td>
          <input
            onChange={handleInput}
            value={product.type}
            name="type"
            readOnly={!isEditable}
            className={`${props.value.id}`}
            style={isEditable ? null : notEditableStyle}
            minLength={1}
            size={5}
          />
        </td>
        <td>
          <input
            value={product.sales}
            name="sales"
            readOnly={!isEditable}
            className={`${props.value.id}`}
            style={isEditable ? null : notEditableStyle}
            minLength={1}
            size={5}
            onChange={(e) => {
              const regex = /^[0-9\b]*$/;
              if (regex.test(e.target.value)) {
                setProduct((oldData) => {
                  return {
                    ...oldData,
                    [e.target.name]: e.target.value,
                  };
                });
              }
            }}
          />
        </td>
        <td>
          <input
            value={product.current}
            name="current"
            readOnly={!isEditable}
            className={`${props.value.id}`}
            style={isEditable ? null : notEditableStyle}
            minLength={1}
            size={5}
            onChange={(e) => {
              const regex = /^[0-9\b]*$/;
              if (regex.test(e.target.value)) {
                setProduct((oldData) => {
                  return {
                    ...oldData,
                    [e.target.name]: e.target.value,
                  };
                });
              }
            }}
          />
        </td>
        <td>
          <input
            value={product.pending}
            name="pending"
            className={`${props.value.id}`}
            readOnly={!isEditable}
            style={isEditable ? null : notEditableStyle}
            minLength={1}
            size={5}
            onChange={(e) => {
              const regex = /^[0-9\b]*$/;
              if (regex.test(e.target.value)) {
                setProduct((oldData) => {
                  return {
                    ...oldData,
                    [e.target.name]: e.target.value,
                  };
                });
              }
            }}
          />
        </td>

        {!isEditable ? (
          <>
            <td>
              <span
                href="#a"
                className="btn btn-sm btn-primary"
                onClick={() => {
                  setIsEditable(true);
                  document.querySelectorAll(
                    `.${props.value.id}`
                  ).readOnly = false;
                }}
              >
                Edit
              </span>
            </td>
            <td>
              <span
                className="btn btn-sm btn-success"
                onClick={async () => {
                  let url = `https://product-management-3f357-default-rtdb.firebaseio.com/product/${product.id}.json`;
                  await axios.patch(url, {
                    productName: product.name || initState.name,
                    company: product.company || initState.company,
                    imageURL: product.imageURL || initState.imageURL,
                    size: product.size || initState.size,
                    type: product.type || initState.type,
                    sales: product.sales.length !== 0 ? product.sales : 0,
                    current: (
                      parseInt(product.current) + parseInt(product.pending)
                    ).toString(),
                    pending: 0,
                    id: product.id,
                  });
                  window.location.reload();
                  setProduct((...oldData) => {
                    return {
                      ...oldData,
                      current: (
                        parseInt(product.current) + parseInt(product.pending)
                      ).toString(),
                      pending: 0,
                    };
                  });
                }}
              >
                Clear
              </span>
            </td>
            <td>
              <span
                className="btn btn-sm btn-danger"
                onClick={async () => {
                  let ans = await window.confirm(
                    `Do you want to delete ${props.value.productName} ?`
                  );
                  if (ans) {
                    let url = `https://product-management-3f357-default-rtdb.firebaseio.com/product/${props.value.id}.json`;
                    await axios.delete(url);
                  }
                }}
              >
                Delete
              </span>
            </td>
          </>
        ) : (
          <>
            <td>
              <span
                className="btn btn-sm btn-success"
                onClick={async () => {
                  console.log("clicked");
                  let url = `https://product-management-3f357-default-rtdb.firebaseio.com/product/${product.id}.json`;
                  //console.log(url);
                  await axios.patch(url, {
                    productName: product.name || initState.name,
                    company: product.company || initState.company,
                    imageURL: product.imageURL || initState.imageURL,
                    size: product.size || initState.size,
                    type: product.type || initState.type,
                    sales: product.sales.length !== 0 ? product.sales : 0,
                    current: product.current.length !== 0 ? product.current : 0,
                    pending: product.pending.length !== 0 ? product.pending : 0,
                    id: product.id,
                  });

                  setIsEditable(false);
                }}
              >
                Save
              </span>
            </td>

            <td>
              <span
                className="btn btn-sm btn-danger"
                onClick={() => {
                  setIsEditable(false);
                  setProduct(initState);
                }}
              >
                Close
              </span>
            </td>
          </>
        )}
      </tr>
    </>
  );
};
