import { Radio } from "antd";
import "antd/dist/antd.min.css";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { schema } from "../data/schema";
import "../styles/VectorData.css";
///////////////////////////////

const VectorData = ({ newState, handleSubmit, prevPath }) => {
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

  const handleDataSetsArray = useCallback(
    (e) => {
      const { checked, name, value } = e.target;
      let dataSets = state[name];
      if (checked) {
        dataSets.push(value);
      } else {
        dataSets = dataSets.filter((dataset) => dataset !== value);
      }
      setState((oldState) => ({ ...oldState, dataSets }));
    },
    [state]
  );

  return (
    <>
      <ToastContainer />
      <div className="card h4 mb-4 mt-5 p-3">
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
          <label className="col-4 ps-5 mb-2 text-start">
            The vector Data Format is:
          </label>
          <Radio.Group
            name="vectorFormat"
            className="col-7 my-0 d-flex justify-content-start"
            onChange={handleChange}
            buttonStyle="solid"
            style={{
              marginTop: 16,
            }}
          >
            <Radio.Button
              className="h5 w-50 d-flex justify-content-center"
              value="ShapeFile"
            >
              Shape file
            </Radio.Button>
            <Radio.Button
              className="h5 w-50 d-flex justify-content-center"
              value="GeoDatabase"
            >
              Geo-database
            </Radio.Button>
            <Radio.Button
              className="h5 w-50 d-flex justify-content-center"
              value="DWG"
            >
              DWG (AutoCAD)
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
            name="vectorFormat"
            className="w-25 p-1 mx-5 mb-3 form-control"
            placeholder="Other Format"
            disabled={!other}
            onChange={handleChange}
          ></input>
        </div>

        <div className="row">
          <label className="col-6 my-2 mb-3 ps-5 d-flex justify-content-start">
            Scale: [1:
            <input
              name="scale"
              className="col-2 w-25 mx-2 p-1 form-control d-inline"
              type="number"
              placeholder="100000"
              onChange={handleChange}
            ></input>
            ]
          </label>
        </div>

        <div className="row">
          <label className="col-3 my-2 mb-3 me-5 ps-5 d-flex justify-content-start text-start">
            Data Sets:
          </label>

          <div className="ps-5 form-check">
            {schema.map((d, i) => (
              <div className="row w-100 p-1 me-5 ms-5" key={i}>
                <input
                  name="dataSets"
                  className="form-check-input"
                  type="checkbox"
                  value={d.name}
                  key={d}
                  id={d.name}
                  onChange={handleDataSetsArray}
                />

                <label
                  name={d.name}
                  className="col-3 h5 pt-1 ps-4 d-flex justify-content-start form-check-label"
                  value={d.name}
                  key={i}
                  htmlFor={d.name}
                >
                  {d.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <br />

      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-dark btn-lg px-5 border-0"
          value="submit"
          onClick={() => handleSubmit(state)}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default VectorData;
