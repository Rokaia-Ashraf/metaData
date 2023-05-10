import { useState, useEffect, useCallback } from "react";
import { Radio } from "antd";
import "antd/dist/antd.min.css";
import { useNavigate } from "react-router-dom";
import { sector, internal } from "../data/department";
import { levelOfPlanning } from "../data/levelOfPlanning";
import {
  getRegions,
  getMarkazes,
  getGovDomains,
  getGovernorates,
  getMunicipalities,
  /*getCities,*/
  getVillages,
} from "../APIs/geo.service";
import { ToastContainer } from "react-toastify";
import { validateMainInfoSubmission } from "../helper/validateSubmission";
import { alertError } from "../helper/toast";

const MainInfo = ({ newState, setNewState }) => {
  const [state, setState] = useState({
    ...newState,
  });

  const [urban, setUrban] = useState(false);
  const [rural, setRural] = useState(false);
  const [lOP] = useState(levelOfPlanning);

  const [dataSource] = useState([
    "CAPMAS - Central Agency for Public Mobilization and Statistics",
    "ESA - Egyptian Survey Authority",
    "GOPP - General Organization for Physical Planning",
    "Ministry of Local Development",
    "Ministry of Defense, Armed Forces Operations Authority",
    "Stakeholders",
  ]);

  const [coordinate] = useState(["Geographic", "Projected"]);

  const [projections] = useState({
    Geographic: ["GCS_WGS_1984"],
    Projected: [
      "Egypt_Blue_Belt",
      "Egypt_Red_Belt",
      "Egypt_Purple_Belt",
      "Egypt_Extended_Purple_Belt",
      "WGS_1984_UTM_Zone_36N",
      "WGS_1984_UTM_Zone_37N",
    ],
  });

  const [DataType] = useState([
    "Vector",
    "Raster (Scanned Map)",
    "Satellite Image",
  ]);

  const [nextPage, setNaxtPage] = useState();

  const [regions, setRegions] = useState();

  const [governorates, setGovernorates] = useState([]);

  const [markazes, setMarkazes] = useState([]);

  const [municipalities, setMunicipalitys] = useState([]);

  // const [cities, setCities] = useState([]);

  const [villages, setVillages] = useState([]);

  const handleChangeConciliationPosition = useCallback(
    (e) => {
      const { checked, name, value } = e.target;
      let conciliationPosition = state[name];
      if (parseInt(value) === 3) {
        conciliationPosition = [false, false, false, checked];
      } else {
        conciliationPosition[3] = false;
        conciliationPosition[value] = checked;
      }
      setState((oldState) => ({ ...oldState, conciliationPosition }));
    },
    [state]
  );

  /////////// Sectors and departments data functions
  //#region
  const getSectors = () => {
    return sector.map((sector) => {
      return { id: sector.id, name: sector.name };
    });
  };

  const getDepartments = () => {
    let departments = [];
    sector
      .filter(
        (sector) =>
          state.sector === null || String(sector.name) === state.sector
      )
      .forEach((sector) => {
        sector.departments.forEach((dept) => {
          departments.push({ id: dept.deptId, name: dept.deptName });
        });
      });
    return departments;
  };

  const getSubDepartments = () => {
    let subDepartments = [];
    sector
      .filter((sector) => !state.sector || String(sector.name) === state.sector)
      .forEach((sector) => {
        sector.departments
          .filter(
            (dept) =>
              !state.department || String(dept.deptName) === state.department
          )
          .forEach((dept) => {
            dept.sub.forEach((subDept) => {
              subDepartments.push({ id: subDept, name: subDept });
            });
          });
      });
    return subDepartments;
  };
  //#endregion

  useEffect(() => {
    async function getData() {
      let _regionData;

      if (!regions) {
        const regionData = await getRegions();
        _regionData = regionData.data.features.map((r) => {
          return {
            name: r.attributes.Region_Name,
          };
        });
        setRegions(_regionData);
      }

      const govDomainsData = await getGovDomains();
      if (governorates.length === 0) {
        const data = await getGovernorates();
        const _data = data.data.features.map((x) => {
          return {
            name: govDomainsData.data.domains[0].codedValues.find(
              (d) => String(d.code) === String(x.attributes.Gov_Name)
            )?.name,
            code: x.attributes.Gov_Name,
            regionName: x.attributes.Region_Name,
          };
        });
        setGovernorates(_data);
      }

      if (markazes.length === 0) {
        const markazesData = await getMarkazes();
        setMarkazes(
          markazesData.data.features.map((x) => {
            return {
              name: x.attributes.Markaz_Name,
              code: x.attributes.Markaz_GCode,
              govCode: x.attributes.Gov_Name,
              govName: govDomainsData.data.domains[0].codedValues.find(
                (d) => String(d.code) === String(x.attributes.Gov_Name)
              )?.name,
              region: state.governorate?.regionName,
            };
          })
        );
      }

      if (municipalities.length === 0) {
        const municipalitysData = await getMunicipalities();
        const data = municipalitysData.data.features.map((x) => {
          return {
            id: x.attributes.OBJECTID,
            municipalityName: x.attributes.Mun_Name,
            markazName: x.attributes.Markaz_Name,
            markazCode: x.attributes.Markaz_GCode,
            govCode: x.attributes.Gov_Name,
          };
        });
        setMunicipalitys(data);
      }

      // if (municipalities.length === 0) {
      //   const municipalitysData = await getMunicipalities();
      //   const data = municipalitysData.data.features.map((x) => {
      //     return {
      //       id: x.attributes.OBJECTID,
      //       municipalityName: x.attributes.Mun_Name,
      //       markazName: x.attributes.Markaz_Name,
      //       markazCode: x.attributes.Markaz_GCode,
      //       govCode: x.attributes.Gov_Name,
      //     };
      //   });
      //   setMunicipalitys(data);
      // }

      // if (cities.length === 0) {
      //   const citiesData = await getCities();
      //   setCities(
      //     citiesData.data.features.map((c) => {
      //       return {
      //         name: c.attributes.CityName,
      //         govCode: c.attributes.Gov_Name,
      //         govName: govDomainsData.data.domains[0].codedValues.find(
      //           (d) => String(d.code) === String(c.attributes.Gov_Name)
      //         )?.name,
      //       };
      //     })
      //   );
      // }

      if (villages) {
        const villagesData = await getVillages();
        setVillages(
          villagesData.data.features.map((v) => {
            return {
              name: v.attributes.Shiakha_Name,
              govCode: v.attributes.Gov_Name,
              markaze: v.attributes.Markaz_Name,
              markazCode: v.attributes.Markaz_GCode,
              municipality: v.attributes.Mun_Name,
            };
          })
        );
      }
    }
    getData();
    if (state.dataType === 1) {
      setNaxtPage("raster");
    } else if (state.dataType === 2) {
      setNaxtPage("satellite");
    } else {
      setNaxtPage("vector");
    }
  }, [
    state.dataType,
    state.governorate?.regionName,
    regions,
    governorates.length,
    markazes.length,
    municipalities.length,
    villages,
  ]);

  const handleChange = useCallback((e) => {
    const { name, type, value } = e.target;
    if (type === "file") {
      setState((u) => ({ ...u, [name]: e.target.files[0] }));

      console.log(e.target.files);
    } else {
      setState((oldState) => ({ ...oldState, [name]: value }));
    }
  }, []);

  const handleArrayChange = useCallback(
    (e) => {
      const { checked, name, value } = e.target;
      let dataSource = state[name];
      if (checked) {
        dataSource.push(value);
      } else {
        dataSource = dataSource.filter((source) => source !== value);
      }
      setState((oldState) => ({ ...oldState, dataSource }));
    },
    [state]
  );
  const navigate = useNavigate();
  const handleSubmit = () => {
    let message = validateMainInfoSubmission(state);
    if (message) {
      alertError(message);
    } else {
      setNewState(state);
      navigate(`/mainInfo/${nextPage}`);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="card card-header h4 mb-4 mt-5 py-4 ps-5">
        <div className="row m-2 ms-5">
          <label className="col-4 m-2 ps-5 text-start" htmlFor="sector">
            Sector:
          </label>
          <select
            name="sector"
            className="col-5 w-50 p-2 form-select"
            onChange={handleChange}
            // onChange={(e) => {
            //   setCurentSector(e.target.value);
            //   setCurentDepartment(null);
            // }}
            id="sector"
          >
            <option value="">-- إختر القطاع --</option>
            {getSectors().map((sector, index) => (
              <option key={index} value={sector.name}>
                {sector.name}
              </option>
            ))}
          </select>
        </div>

        <div className="row m-2 ms-5">
          <label className="col-4 m-2 ps-5 text-start" htmlFor="department">
            Department:
          </label>
          <select
            name="department"
            className="col-5 w-50 p-2 form-select"
            onChange={handleChange}
            // onChange={(e) => {
            //   setCurentDepartment(e.target.value);
            // }}
            id="department"
          >
            <option value="" hidden>
              -- إختر الإدارة --
            </option>
            {getDepartments().map((dept, index) => (
              <option key={index} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div className="m-2 ms-5 row">
          <label className="col-4 m-2 ps-5 text-start" htmlFor="SubDept">
            Sub Department:
          </label>
          <select
            name="SubDept"
            className="col-5 w-50 p-2 form-select"
            onChange={handleChange}
            id="SubDept"
          >
            <option value="" hidden>
              -- إختر الإدارة الفرعية --
            </option>
            {getSubDepartments().length > 0 ? (
              getSubDepartments().map((subDepart, i) => (
                <option key={i} value={subDepart.id}>
                  {subDepart.name}
                </option>
              ))
            ) : (
              <option disabled>لا يوجد ادارات فرعية لهذه الادارة</option>
            )}
          </select>
        </div>

        <div className="m-2 ms-5 row">
          <label className="col-4 m-2 ps-5 text-start" htmlFor="internal">
            Internal parties involved in the project:
          </label>
          <select
            name="internal"
            className="col-5 w-50 p-2 form-select"
            onChange={handleChange}
            id="internal"
          >
            <option value="" hidden>
              -- الجهات الداخلية المشاركة في المشروع --
            </option>
            {internal.map((internal, i) => (
              <option key={i} value={internal}>
                {internal}
              </option>
            ))}
          </select>
        </div>

        <div className="m-2 ms-5 row">
          <label className="col-4 m-2 ps-5 text-start" htmlFor="officeName">
            Office Name:
          </label>
          <input
            name="officeName"
            id="officeName"
            className="col-5 w-50 p-2 form-control"
            placeholder="Enter Office Name"
            onChange={handleChange}
          />
        </div>

        <div className="m-2 ms-5 row">
          <label className="col-4 m-2 ps-5 text-start" htmlFor="ProjType">
            Project Type
          </label>
          <select
            name="projType"
            className="col-5 w-50 p-2 form-select"
            onChange={handleChange}
            id="ProjType"
          >
            <option value="" hidden>
              Project Type
            </option>
            <option key="New" value="New">
              New Project
            </option>
            <option key="Existing" value="Existing">
              Existing Project
            </option>
          </select>
        </div>

        <div className="m-2 ms-5 row">
          <label className="col-4 m-2 ps-5 text-start" htmlFor="ProjName">
            Project Name:
          </label>
          <input
            name="projName"
            id="ProjName"
            className="col-5 w-50 p-2 form-control"
            placeholder="Enter Project Name"
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="card h5 mb-4 mt-5 m-5 py-4 p-3">
        <div className="row d-flex ml-2">
          <label className="col-4 ps-5 mb-4 text-start">
            Level of Planning:
          </label>
          <Radio.Group
            name="lvlOfDetails"
            className="col-7 my-0 d-flex justify-content-start"
            onChange={handleChange}
            buttonStyle="solid"
            style={{
              marginTop: 16,
            }}
          >
            {lOP.map((l, i) => (
              <Radio.Button
                className="h5 w-50 px-1 d-flex justify-content-center"
                value={l}
                key={i}
              >
                {l}
              </Radio.Button>
            ))}
          </Radio.Group>

          <select
            name="region"
            id="region"
            className="w-25 p-1 me-5 ms-5 mb-4 form-select"
            onChange={handleChange}
            disabled={state.lvlOfDetails === "National" || !state.lvlOfDetails}
          >
            <option value="" hidden>
              -- الإقليم --
            </option>
            {regions?.map((r, i) => (
              <option value={r.name} key={i}>
                {r.name}
              </option>
            ))}
          </select>

          <select
            name="governorate"
            onChange={handleChange}
            className="w-25 p-1 me-5 ms-5 mb-4 form-select"
            id="governorate"
            value={state.governorate}
            disabled={state.lvlOfDetails === "National" || !state.lvlOfDetails}
          >
            <option value="" hidden>
              -- المحافظة --
            </option>
            {governorates
              ?.filter((g) => g.regionName === state.region)
              .map((g) => (
                <option value={g.name} key={g.code}>
                  {g.name}
                </option>
              ))}
          </select>

          <select
            name="markaz"
            className="w-25 p-1 me-5 ms-5 mb-4 form-select"
            onChange={handleChange}
            disabled={state.lvlOfDetails === "National" || !state.lvlOfDetails}
          >
            <option value="" hidden>
              -- المركز --
            </option>
            {markazes
              ?.filter((m) => String(m.govName) === String(state.governorate))
              .map((x, i) => (
                <option value={x.name} key={i}>
                  {x.name}
                </option>
              ))}
          </select>

          <select
            name="municipality"
            className="w-25 p-1 me-5 ms-5 mb-4 form-select"
            onChange={handleChange}
            disabled={
              state.lvlOfDetails === "National" ||
              state.lvlOfDetails === "Regional" ||
              !state.lvlOfDetails
            }
          >
            <option value="" hidden>
              -- الوحدة المحلية --
            </option>
            {municipalities
              ?.filter((x) => String(x.markazName) === String(state.markaz))
              .filter((x) => !x.municipalityName.includes("مدينه"))
              .map((m, i) => (
                <option value={m.municipalityName} key={i}>
                  {m.municipalityName}
                </option>
              ))}
          </select>

          <div className="d-flex w-25 p-1 me-5 ms-5">
            <input
              name="Urban"
              className="pe-3 form-check-input"
              type="checkbox"
              value="Urban"
              id="Urban"
              onChange={() => {
                setUrban((old) => !old);
              }}
              disabled={
                state.lvlOfDetails === "National" ||
                state.lvlOfDetails === "Regional" ||
                !state.lvlOfDetails
              }
            />

            <label
              name="Urban"
              className="h5 pt-1 ps-3 form-check-label"
              value="Urban"
              key="Urban"
              htmlFor="Urban"
            >
              Urban
            </label>

            <select
              name="Urban"
              id="Urban"
              className="p-1 py-0 ms-3 mb-3 form-select"
              onChange={handleChange}
              disabled={
                state.lvlOfDetails === "National" ||
                state.lvlOfDetails === "Regional" ||
                !state.lvlOfDetails ||
                !urban
              }
            >
              <option value="" hidden>
                -- Existing/Proposed --
              </option>
              <option key="Existing" value="Existing">
                Existing City
              </option>
              <option key="Proposed" value="Proposed">
                Proposed City
              </option>
            </select>

            <select
              name="city"
              className="p-1 py-0 ms-3 mb-3 form-select"
              onChange={handleChange}
              disabled={
                state.lvlOfDetails === "National" ||
                state.lvlOfDetails === "Regional" ||
                !state.lvlOfDetails ||
                !urban
              }
            >
              <option value="" hidden>
                -- City --
              </option>
              {municipalities
                ?.filter((x) => String(x.markazName) === String(state.markaz))
                ?.filter((x) => x.municipalityName.includes("مدينه"))
                .map((c, i) => (
                  <option key={i} value={c.municipalityName}>
                    {c.municipalityName}
                  </option>
                ))}
            </select>
          </div>

          <div className="d-flex w-25 p-1 me-5 ms-5">
            <input
              name="Rural"
              className="pe-3 form-check-input"
              type="checkbox"
              value="Rural"
              id="Rural"
              onChange={() => {
                setRural((old) => !old);
              }}
              disabled={
                state.lvlOfDetails === "National" ||
                state.lvlOfDetails === "Regional" ||
                !state.lvlOfDetails
              }
            />

            <label
              name="Rural"
              className="h5 pt-1 ps-3 form-check-label"
              value="Rural"
              key="Rural"
              htmlFor="Rural"
            >
              Rural
            </label>

            <select
              name="Rural"
              className="p-1 ms-3 mb-3 form-select"
              id="Rural"
              onChange={handleChange}
              disabled={
                state.lvlOfDetails === "National" ||
                state.lvlOfDetails === "Regional" ||
                !state.lvlOfDetails ||
                !rural
              }
            >
              <option value="" hidden>
                -- Village/Manor --
              </option>
              <option key="village" value="village">
                Village
              </option>
              <option key="manor" value="manor">
                Manor
              </option>
            </select>

            <select
              name="village"
              className="p-1 py-0 ms-3 mb-3 form-select"
              onChange={handleChange}
              // onChange={(event) => {
              //   setCurrentVillage(event.target.value);
              //   console.log(event.target.value);
              // }}
              disabled={
                state.lvlOfDetails === "National" ||
                state.lvlOfDetails === "Regional" ||
                !state.lvlOfDetails ||
                !rural
              }
            >
              <option value="" hidden>
                -- Village --
              </option>
              {villages
                ?.filter(
                  (v) =>
                    // String(v.govCode) === String(currentGovernorate) ||
                    // String(v.markaze) === String( currentMarkaz)
                    String(v.municipality) === String(state.municipality)
                )
                .map((v, i) => (
                  <option key={i} value={v.name}>
                    {v.name}
                  </option>
                ))}
            </select>
          </div>

          <hr className="w-75 m-5 my-2 mb-5" />
        </div>

        <div className="row d-flex ml-2 my-3">
          <label className="col-4 ps-5 text-start">Data Source: </label>

          <div className="ps-5 col-8 form-check">
            {dataSource.map((d, index) => (
              <div className="m-0 d-flex justify-content-start" key={index}>
                <input
                  name="dataSource"
                  className="form-check-input p-2"
                  type="checkbox"
                  value={d}
                  key={index}
                  id={d}
                  onChange={handleArrayChange}
                />

                <label
                  name={d}
                  className="h5 ps-3 form-check-label text-start"
                  value={d}
                  key={d}
                  htmlFor={d}
                >
                  {d}
                </label>
              </div>
            ))}

            <input
              type="text"
              className="col-6 w-75 p-1 mb-3 form-control"
              onChange={handleArrayChange}
              name="dataSource"
              placeholder="Other Data Source"
            />
          </div>
        </div>

        <hr className="w-75 m-5 my-2 mb-4" />

        <div className="row my-3">
          <label className="col-3 ps-5 text-start " htmlFor="startDate">
            Project Starting Date:
          </label>
          <input
            type="date"
            className="d-inline w-25 form-control"
            name="startDate"
            id="startDate"
            onChange={handleChange}
          />

          <label className="col-3 text-start" htmlFor="endDate">
            Project End Date:
          </label>
          <input
            type="date"
            className="d-inline w-25 form-control"
            name="endDate"
            id="endDate"
            onChange={handleChange}
          />
        </div>

        <div className="row my-3">
          <label className="col-3 ps-5 text-start " htmlFor="phases">
            Project Phases:
          </label>
          <input
            type="number"
            className="col-3 d-inline w-25 form-control"
            name="phases"
            id="phases"
            onChange={handleChange}
          />

          <label className="col-3 text-start" htmlFor="currentPhase">
            Number of Current Phase:
          </label>
          <input
            type="number"
            className="col-3 d-inline w-25 form-control"
            name="currentPhase"
            id="currentPhase"
            onChange={handleChange}
          />
        </div>

        <div className="row my-3">
          <label className="col-3 ps-5 text-start " htmlFor="endCurrentPhase">
            End Date of Current Phase{}:
          </label>
          <input
            type="date"
            className="col-3 d-inline w-25 form-control"
            name="endCurrentPhase"
            id="endCurrentPhase"
            onChange={handleChange}
          />

          <label className="col-3 text-start" htmlFor="outPutCurrentPhase">
            OutPut of Current Phase{}:
          </label>
          <input
            type="text"
            className="col-3 d-inline w-25 form-control"
            name="outPutCurrentPhase"
            id="outPutCurrentPhase"
            onChange={handleChange}
          />
        </div>

        <div className="row my-3">
          <label className="col-3 ps-5 text-start" htmlFor="conciliation">
            Conciliation Position:
          </label>
          <input
            name="conciliationPosition"
            className="form-check-input p-2"
            type="checkbox"
            value={0}
            id="First"
            checked={state.conciliationPosition[0]}
            onChange={handleChangeConciliationPosition}
          />
          <label
            className="form-check-label d-flex col-2 h5 pt-1 ps-3 text-start"
            htmlFor="First"
          >
            First Phase
          </label>

          <input
            name="conciliationPosition"
            className="form-check-input p-2"
            type="checkbox"
            value={1}
            checked={state.conciliationPosition[1]}
            id="Second"
            onChange={handleChangeConciliationPosition}
          />
          <label
            className="form-check-label d-flex col-2 h5 pt-1 ps-3 text-start"
            htmlFor="Second"
          >
            Second Phase
          </label>

          <input
            name="conciliationPosition"
            className="form-check-input p-2"
            type="checkbox"
            value={2}
            checked={state.conciliationPosition[2]}
            id="Third"
            onChange={handleChangeConciliationPosition}
          />
          <label
            className="form-check-label d-flex col-2 h5 pt-1 ps-3 text-start"
            htmlFor="Third"
          >
            Third Phase
          </label>
          <input
            name="conciliationPosition"
            className="form-check-input p-2"
            type="checkbox"
            value={3}
            id="No"
            checked={state.conciliationPosition[3]}
            onChange={handleChangeConciliationPosition}
          />
          <label
            className="form-check-label d-flex col-2 h5 pt-1 ps-3 text-start"
            htmlFor="No"
          >
            No Conciliation
          </label>
        </div>

        <div className="row my-3">
          <label className="col-3 ps-5 text-start" htmlFor="upload">
            Upload File
          </label>
          <input
            type="file"
            id="upload"
            className="button-form w-75"
            name="uploadedFile"
            onChange={handleChange}
          />
        </div>

        <div className="row my-3">
          <label className="col-3 ps-5 text-start" htmlFor="notes">
            Notes:
          </label>
          <textarea
            name="notes"
            id="notes"
            type="text"
            className="form-control d-inline col-9 p-2 w-75 "
            onChange={handleChange}
          />
        </div>

        <hr className="w-75 m-5 my-3 mb-4" />

        <div className="row my-3">
          <label className="col-3 ps-5 text-start" htmlFor="Coordinate">
            Coordinate System:
          </label>
          <select
            name="coordinate"
            className="col-3 w-25 p-2 form-select"
            onChange={handleChange}
            id="Coordinate"
            // value="Coordinate"
          >
            <option hidden>Coordinate System</option>
            {coordinate.map((coo, i) => (
              <option key={i} value={coo}>
                {coo}
              </option>
            ))}
          </select>

          <label className="col-2 text-end pe-5 " htmlFor="Projection">
            Projection:
          </label>
          <select
            name="projection"
            className="col-3 w-25 p-2 form-select"
            onChange={handleChange}
            id="Projection"
          >
            <option hidden>Projection</option>
            {projections[state.coordinate]?.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="row my-2">
          <label className="col-3 ps-5 text-start" htmlFor="dataType">
            Data Type:
          </label>
          <Radio.Group
            name="dataType"
            className="m-0 pt-4 ps-5 text-start"
            onChange={handleChange}
            value={state.dataType}
          >
            {DataType.map((d, index) => (
              <Radio
                className="col-3 h5 ps-0 pe-5 me-5"
                value={index}
                key={index}
              >
                {d}
              </Radio>
            ))}
          </Radio.Group>
        </div>
      </div>
      <br />

      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="w-25 btn btn-dark btn-lg px-5 mb-5"
          onClick={handleSubmit}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default MainInfo;
