import { Radio } from "antd";
import "antd/dist/antd.min.css";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { useCallback, useState } from "react";

const RasterData = ({ newState, handleSubmit }) => {
  const [state, setState] = useState({
    ...newState,
  });

  const [other, setOther] = useState(false);
  const handleChange = useCallback((e) => {
    const { name, type, value } = e.target;
    if (type !== "text") {
      setOther(false);
    }
    if (value === "other") {
      setOther(true);
    } else {
      setState((oldState) => ({ ...oldState, [name]: value }));
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="row d-flex h4 mb-1 mt-5 p-3 ml-2">
        <div className="row d-flex ml-2 pt-4">
          <Link
            className="d-inline d-flex justify-content-start pb-3"
            to="/mainInfo"
          >
            <i
              className="fa-solid fa-angles-left"
              style={{ color: "black", paddingRight: "5px", scale: "70%" }}
            ></i>
          </Link>
          <label className="col-5 ps-5 mb-2 text-start">
            The Raster (Scanned Map) Data Format is:
          </label>
          <Radio.Group
            name="rasterFormat"
            className="col-5 my-0 d-flex justify-content-start"
            onChange={handleChange}
            buttonStyle="solid"
            style={{
              marginTop: 16,
            }}
          >
            <Radio.Button
              className="h5 w-50 d-flex justify-content-center"
              value="Tiff"
            >
              Tiff
            </Radio.Button>
            <Radio.Button
              className="h5 w-50 d-flex justify-content-center"
              value="Jpg"
            >
              Jpg
            </Radio.Button>
            <Radio.Button
              className="h5 w-50 d-flex justify-content-center"
              value="Bmp"
            >
              Bmp
            </Radio.Button>
            <Radio.Button
              className="h5 w-50 d-flex justify-content-center"
              value="Sid"
            >
              Sid
            </Radio.Button>
            <Radio.Button
              className="h5 w-50 d-flex justify-content-center"
              value="other"
            >
              Other
            </Radio.Button>
          </Radio.Group>
          <input
            type="text"
            name="rasterFormat"
            className="w-25 p-1 mx-5 mb-3 form-control"
            placeholder="Other Format"
            disabled={!other}
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <div className="d-flex h4 mb-2 mt-1 ml-2">
        <span className="col-5 ps-5 mb-2 d-flex text-start">
          Is it geo-referenced?
        </span>
        <Radio.Group
          name="geoReference"
          className="col-5 m-0 d-flex justify-content-start"
          onChange={handleChange}
          buttonStyle="solid"
          style={{
            marginTop: 16,
          }}
        >
          <Radio.Button
            className="h5 w-25 d-flex justify-content-center"
            value={true}
          >
            Yes
          </Radio.Button>
          <Radio.Button
            className="h5 w-25 d-flex justify-content-center"
            value={false}
          >
            No
          </Radio.Button>
        </Radio.Group>
      </div>
      <hr />

      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-dark btn-lg px-5 mt-5"
          onClick={() => handleSubmit(state)}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default RasterData;
