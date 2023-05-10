import { Radio } from "antd";
import "antd/dist/antd.min.css";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const SatelliteData = ({ newState, handleSubmit }) => {
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
      <div>
        <div className="row d-flex h4 mt-5 p-3 ml-2">
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
              The Satellite Image Type:
            </label>
            <Radio.Group
              name="SatelliteFormat"
              className="col-5 my-0 d-flex justify-content-start"
              onChange={handleChange}
              buttonStyle="solid"
              style={{
                marginTop: 16,
              }}
            >
              <Radio.Button
                className="h5 w-50 px-5 d-flex justify-content-center"
                value="IKONOS"
              >
                IKONOS
              </Radio.Button>
              <Radio.Button
                className="h5 w-50 px-5 d-flex justify-content-center"
                value="QUICKBIRD"
              >
                QUICKBIRD
              </Radio.Button>
              <Radio.Button
                className="h5 w-50 px-5 d-flex justify-content-center"
                value="LANDSAT"
              >
                LANDSAT
              </Radio.Button>
              <Radio.Button
                className="h5 w-50 px-5 d-flex justify-content-center"
                value="Spot"
              >
                Spot
              </Radio.Button>
              <Radio.Button
                className="h5 w-50 px-5 d-flex justify-content-center"
                value="other"
              >
                Other
              </Radio.Button>
            </Radio.Group>
            <input
              type="text"
              name="SatelliteFormat"
              className="w-25 p-1 mx-5 mb-3 form-control"
              placeholder="Other Format"
              disabled={!other}
              onChange={handleChange}
            ></input>
          </div>
        </div>

        <div className="row d-flex h4 mb-1 mt-0 p-3 py-0 ml-2">
          <label className="col-5 ps-5 mb-2 d-flex text-start">
            Resolution:
          </label>
          <input
            name="resolution"
            className="col-6 w-25 mx-2 p-1 m-1 form-control d-inline"
            type="number"
            placeholder=""
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <br />
      <br />
      <hr />
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-dark btn-lg px-5 m-5"
          onClick={() => handleSubmit(state)}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default SatelliteData;
