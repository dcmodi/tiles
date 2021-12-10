import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./ProductModal.css";
import app from "../fire.js";
import { getDatabase, ref, onValue } from "firebase/database";
import ReactPaginate from "react-paginate";

const ProductModal = (props) => {
  let history = useHistory();
  let [data, setData] = useState([]);
  const dataPerPage = 8;
  const [rows, setRows] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [offset, setOffset] = useState(1);
  useEffect(() => {
    new Promise(async (resolve) => {
      await resolve(getData());
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setPagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, dataPerPage]);
  let getData = async () => {
    const db = getDatabase(app);
    const userRef = ref(db, "upload/" + props.userId);
    onValue(userRef, async (snapshot) => {
      const values = snapshot.val();
      if (values) {
        await setData(Object.values(values).reverse());
        await setRows(
          Object.values(values)
            .reverse()
            .slice(
              (offset - 1) * dataPerPage,
              (offset - 1) * dataPerPage + dataPerPage
            )
        );
        await setPageCount(() => {
          return Math.ceil(Object.values(values).length / dataPerPage);
        });
      }
    });

    //await setPagination();
  };
  const setPagination = async () => {
    await setRows((oldData) => {
      return data.slice(
        (offset - 1) * dataPerPage,
        (offset - 1) * dataPerPage + dataPerPage
      );
    });
    //console.log(rows);
  };
  let handlePageClick = (event) => {
    const selectedPage = event.selected;
    setOffset(selectedPage + 1);
  };
  return (
    <>
      (
      <div id="myModal" className="productModal">
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
          <table
            className="table align-items-center table-flush table-hover mt-3"
            id="dataTableHover"
          >
            <thead className="thead-light">
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Company</th>
                <th>Size</th>
                <th>Type</th>
                <th>Pending</th>
                <th>Current</th>
                <th>Sales</th>
                <th>Total</th>
                <th>Increase</th>
                <th>Decrease</th>
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
      )
    </>
  );
};

const TableRow = (props) => {
  return (
    <>
      <tr>
        <td>
          <img
            src={
              props.value.imageURL.length !== 0
                ? `${props.value.imageURL}`
                : "https://firebasestorage.googleapis.com/v0/b/product-management-3f357.appspot.com/o/tiles.jpeg?alt=media&token=e676a39f-5d6c-447e-b30f-329f65737088"
            }
            alt="img"
            style={{
              height: "5vh",
              width: "5vw",
              borderRadius: "20%",
            }}
          />
        </td>
        <td>{props.value.productName}</td>
        <td>{props.value.description}</td>
        <td>{props.value.company}</td>
        <td>{props.value.size}</td>
        <td>{props.value.type}</td>
        <td>{props.value.pending || 0}</td>
        <td>{props.value.current || 0}</td>
        <td>{props.value.sales || 0}</td>
        <td>
          {parseInt(props.value.pending || 0) +
            parseInt(props.value.current || 0)}
        </td>
        <td>{props.value.increase}</td>
        <td>{props.value.decrease}</td>
      </tr>
    </>
  );
};

export default ProductModal;
