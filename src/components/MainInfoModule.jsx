import MainInfo from "./MainInfo";
import VectorData from "./VectorData";
import RasterData from "./RasterData";
import SatelliteData from "./SatelliteData";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Done from "./Done";
import AllSubmissions from "./allSubmissions";
import { addInfo } from "../APIs/infos";
import { ToastContainer } from "react-toastify";

const MainInfoModule = () => {
  const [mainInfo, setMainInfo] = useState({
    sector: "",
    department: "",
    subDept: "",
    projType: "",
    projName: "",
    lvlOfDetails: "",
    dataSource: [],
    uploadedFile: null,
    coordinate: "",
    projection: "",
    conciliationPosition: [false, false, false, false],
    dataType: "",
  });

  const [vectorData, setVectorData] = useState({
    vectorFormat: "",
    dataSets: [],
  });

  const [rasterData, setRasterData] = useState({
    rasterFormat: "",
    geoReference: "",
  });

  const [satelliteData, setSatelliteData] = useState({
    satelliteFormat: "",
    resolution: "",
  });

  const navigate = useNavigate();
  const handleSubmit = async (newState) => {
    if (newState) {
      switch (parseInt(mainInfo.dataType)) {
        case 0:
          setVectorData(newState);
          break;
        case 1:
          setRasterData(newState);
          break;
        default:
          setSatelliteData(newState);
          break;
      }
      let conciliationPosition = mainInfo.conciliationPosition
        .map((elm, i) => {
          if (elm) {
            switch (parseInt(i)) {
              case 0:
                return "First";
              case 1:
                return "Second";
              case 2:
                return "Third";
              default:
                return "No";
            }
          }
          return null;
        })
        .filter((x) => x !== null);
      const info = {
        ...mainInfo,
        dataSource: mainInfo.dataSource.join("|"),
        conciliationPosition: conciliationPosition.join("|"),
        ...newState,
        dataSets: newState.dataSets?.join("|"),
      };
      const response = await addInfo(info);
      console.log(info);
      if (response) {
        navigate(`/mainInfo/done`);
      }
    }
  };
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          index
          element={<MainInfo newState={mainInfo} setNewState={setMainInfo} />}
        />
        <Route
          path="/vector"
          element={
            <VectorData newState={vectorData} handleSubmit={handleSubmit} />
          }
        />
        <Route path="/done" element={<Done />} />

        <Route
          path="/raster"
          element={
            <RasterData newState={rasterData} handleSubmit={handleSubmit} />
          }
        />

        <Route
          path="/satellite"
          element={
            <SatelliteData
              newState={satelliteData}
              handleSubmit={handleSubmit}
            />
          }
        />
        <Route path="/mainInfo/allSubmissions" element={<AllSubmissions />} />
      </Routes>
    </>
  );
};

export default MainInfoModule;
