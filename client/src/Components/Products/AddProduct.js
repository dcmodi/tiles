import axios from "axios";
import React, { useEffect, useState } from "react";
import app from "../fire";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

let initState = {
  productName: "",
  company: "",
  imageURL: "",
  size: "",
  type: "",
  sales: 0,
  current: 0,
  pending: 0,
};

const AddProduct = () => {
  //console.log(data);
  let [product, setProduct] = useState(initState);
  const [size, setSize] = useState([]);
  const [type, setType] = useState([]);
  const [company, setCompany] = useState([]);
  let [loading, setLoading] = useState(true);
  let [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    getData();
  }, []);

  let getData = async () => {
    let res = await new Promise(async (resolve, reject) => {
      let r = await axios.get(
        "https://product-management-3f357-default-rtdb.firebaseio.com/size.json/"
      );
      if (r) {
        resolve(r);
      } else {
        reject(r);
      }
    });

    await setSize(Object.values(res.data));
    res = await new Promise(async (resolve, reject) => {
      let r = await axios.get(
        "https://product-management-3f357-default-rtdb.firebaseio.com/type.json/"
      );
      if (r) {
        resolve(r);
      } else {
        reject(r);
      }
    });
    await setType(Object.values(res.data));

    res = await new Promise(async (resolve, reject) => {
      let r = await axios.get(
        "https://product-management-3f357-default-rtdb.firebaseio.com/company.json/"
      );
      if (r) {
        resolve(r);
      } else {
        reject(r);
      }
    });
    await setCompany(Object.values(res.data));
    await setLoading(false);
  };
  let changeInput = (e) => {
    setProduct((oldProduct) => {
      return {
        ...oldProduct,
        [e.target.name]: e.target.value,
      };
    });
  };

  let handleImg = async (e) => {
    const storage = await getStorage(app);
    const storageRef = await ref(storage, `/${e.target.files[0].name}`);

    //console.log(e.target.files[0]);
    const metadata = {
      contentType: "image/jpeg",
    };

    // Upload the file and metadata
    await uploadBytes(storageRef, e.target.files[0], metadata);
    const gsReference = ref(
      storage,
      `gs://product-management-3f357.appspot.com/${e.target.files[0].name}`
    );

    await getDownloadURL(gsReference)
      .then((url) => {
        console.log(url);
        setProduct((oldData) => {
          return {
            ...oldData,
            imageURL: url,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let submitProduct = async () => {
    if (!product.productName) {
      setErrMsg("Please Fill Product Name Field.");
      document.querySelector(".errorMsg").style.display = "block";
    } else if (!product.imageURL) {
      setErrMsg("Please Fill Image Field.");
      document.querySelector(".errorMsg").style.display = "block";
    } else if (!product.size) {
      setErrMsg("Please Select Size Field.");
      document.querySelector(".errorMsg").style.display = "block";
    } else if (!product.type) {
      setErrMsg("Please Select Type Field.");
      document.querySelector(".errorMsg").style.display = "block";
    } else if (!product.company) {
      setErrMsg("Please Select Company Name Field.");
      document.querySelector(".errorMsg").style.display = "block";
    } else {
      let res = await new Promise(async (resolve, reject) => {
        let r = await axios.post(
          "https://product-management-3f357-default-rtdb.firebaseio.com/product.json/",
          {
            productName: product.productName,
            company: product.company,
            imageURL: product.imageURL,
            size: product.size,
            type: product.type,
            sales: product.sales.length !== 0 ? product.sales : 0,
            current: product.current.length !== 0 ? product.current : 0,
            pending: product.pending.length !== 0 ? product.pending : 0,
            id: "",
          }
        );
        if (r) {
          resolve(r);
        } else {
          reject(r);
        }
      });

      if (res.status === 200) {
        let url = `https://product-management-3f357-default-rtdb.firebaseio.com/product/${res.data.name}.json`;
        //console.log(url);
        await axios.put(url, {
          productName: product.productName,
          company: product.company,
          imageURL: product.imageURL,
          size: product.size,
          type: product.type,
          sales: product.sales.length !== 0 ? product.sales : 0,
          current: product.current.length !== 0 ? product.current : 0,
          pending: product.pending.length !== 0 ? product.pending : 0,
          id: res.data.name,
        });
        //console.log(r);
        document.querySelector(".display").style.display = "block";

        setProduct(initState);
      }
    }
  };
  return (
    <>
      <div className="card mb-4">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">Prdouct</h6>
        </div>
        <center>
          <div
            class="alert alert-success display"
            style={{
              display: "none",
            }}
          >
            <button
              type="button"
              class="close"
              style={{
                marginTop: "-1vh",
              }}
              onClick={() => {
                document.querySelector(".display").style.display = "none";
              }}
            >
              &times;
            </button>
            Product Added Successfully
          </div>
        </center>
        <center>
          <div
            class="alert alert-danger errorMsg"
            style={{
              display: "none",
            }}
          >
            <button
              type="button"
              class="close"
              style={{
                marginTop: "-1vh",
              }}
              onClick={() => {
                document.querySelector(".errorMsg").style.display = "none";
              }}
            >
              &times;
            </button>
            {errMsg}
          </div>
        </center>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">
                Product Name<span className="text-danger"> *</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Product Name"
                name="productName"
                value={product.productName}
                onChange={changeInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="customFile">
                Image<span className="text-danger"> *</span>
              </label>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="customFile"
                  name="imageURL"
                  onChange={handleImg}
                  accept={".jpeg,.jpg"}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose file
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="size">
                Size<span className="text-danger"> *</span>
              </label>
              <select
                className="form-control"
                id="size"
                aria-describedby="emailHelp"
                name="size"
                value={product.size ? product.size : "select"}
                onChange={changeInput}
              >
                <option value="select">--SELECT--</option>
                {!loading
                  ? size.map((val, index) => {
                      return <Size key={index} data={val} />;
                    })
                  : null}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="type">
                Type<span className="text-danger"> *</span>
              </label>
              <select
                className="form-control"
                id="type"
                aria-describedby="emailHelp"
                name="type"
                value={product.type ? product.type : "select"}
                onChange={changeInput}
              >
                <option value="select">--SELECT--</option>
                {!loading
                  ? type.map((val, index) => {
                      return <Type key={index} data={val} />;
                    })
                  : null}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="size">
                Company<span className="text-danger"> *</span>
              </label>
              <select
                className="form-control"
                id="size"
                aria-describedby="emailHelp"
                name="company"
                value={product.company ? product.company : "select"}
                onChange={changeInput}
              >
                <option value="select">--SELECT--</option>
                {!loading
                  ? company.map((val, index) => {
                      return <Company key={index} data={val} />;
                    })
                  : null}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Sales Stock</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                name="sales"
                value={product.sales}
                pattern="[0-9]*"
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
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Current Stock</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                name="current"
                value={product.current}
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
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Pending Stock</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                name="pending"
                value={product.pending}
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
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={submitProduct}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;

let Size = (props) => {
  return (
    <>
      <option value={props.data.sizeTag}>{props.data.sizeTag}</option>
    </>
  );
};

let Type = (props) => {
  return (
    <>
      <option value={props.data.typeTag}>{props.data.typeTag}</option>
    </>
  );
};

let Company = (props) => {
  return (
    <>
      <option value={props.data.companyTag}>{props.data.companyTag}</option>
    </>
  );
};
