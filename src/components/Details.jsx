// import { useState } from "react";
// import { Table } from "antd";

import { Link } from "react-router-dom";

const Details = (props) => {
  const {
    sector,
    department,
    subDept,
    internal,
    officeName,
    ProjectName,
    projType,
    projName,
    lvlOfDetails,
    region,
    governorate,
    markaz,
    municipality,
    city,
    village,
    dataSource,
    startDate,
    endDate,
    phases,
    currentPhase,
    endCurrentPhase,
    outPutCurrentPhase,
    notes,
    coordinate,
    projection,
    dataType,
    vectorFormat,
    scale,
    dataSets,
    rasterFormat,
    geoReference,
    SatelliteFormat,
    resolution,
    userName,
    prevPath,
    filePath,
  } = props;

  // const columns = [
  //   {
  //     title: (t) => <p className="h3">Info</p>,
  //     dataIndex: "Info",
  //     // render: (text) => <a>{text}</a>,
  //   },
  //   {
  //     title: (t) => <p className="h3">Value</p>,
  //     dataIndex: "Value",
  //   },
  // ];

  // let data = [
  //   {
  //     key: 1,
  //     Info: <span className="h5">Sector</span>,
  //     Value: sector,
  //   },
  //   {
  //     key: 2,
  //     Info: <span className="h5">Department</span>,
  //     Value: department,
  //   },
  //   {
  //     key: 3,
  //     Info: <span className="h5">Sub Department</span>,
  //     Value: subDept,
  //   },
  //   {
  //     key: 4,
  //     Info: <span className="h5">Office Name</span>,
  //     Value: officeName,
  //   },
  //   {
  //     key: 5,
  //     Info: <span className="h5">Project Type</span>,
  //     Value: projType,
  //   },
  //   {
  //     key: 6,
  //     Info: <span className="h5">Project Name</span>,
  //     Value: ProjectName,
  //     // Value: `Zefta`,
  //   },
  //   {
  //     key: 30,
  //     Info: <span className="h5">Level of Planning</span>,
  //     Value: `National`,
  //   },
  //   {
  //     key: 7,
  //     Info: <span className="h5">Coordinate System</span>,
  //     Value: {},
  //   },
  //   {
  //     key: 8,
  //     Info: <span className="h5">Projection</span>,
  //     Value: {},
  //   },
  //   {
  //     key: 9,
  //     Info: <span className="h5">Data Acquisition Date</span>,
  //     Value: {},
  //   },
  //   {
  //     key: 10,
  //     Info: <span className="h5">Data Type</span>,
  //     Value: {},
  //   },
  // ];

  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     console.log(
  //       `selectedRowKeys: ${selectedRowKeys}`,
  //       "selectedRows: ",
  //       selectedRows
  //     );
  //   },
  //   getCheckboxProps: (record) => ({
  //     disabled: record.Offer === "Disabled User",
  //     // Column configuration not to be checked
  //     Offer: record.Offer,
  //   }),
  // };

  // const [selectionType] = useState();
  const Info = [
    { key: "Sector", Value: sector },
    { key: "Department", Value: department },
    { key: "Sub Department", Value: subDept },
    { key: "Internal parties", Value: internal },
    { key: "Office Name", Value: officeName },
    { key: "Project Type", Value: projType },
    { key: "Project Name", Value: projName },
    { key: "Level of Planning", Value: lvlOfDetails },
    { key: "Region", Value: region },
    { key: "Governorate", Value: governorate },
    { key: "Markaz", Value: markaz },
    { key: "Municipality", Value: municipality },
    { key: "City", Value: city },
    { key: "Village", Value: village },
    { key: "Data Source", Value: dataSource },
    { key: "Starting Date", Value: startDate },
    { key: "End Date", Value: endDate },
    { key: "Project Phases", Value: phases },
    { key: "Number of Current Phase", Value: currentPhase },
    { key: "End Date of Current Phase", Value: endCurrentPhase },
    { key: "OutPut of Current Phase", Value: outPutCurrentPhase },
    { key: "Notes", Value: notes },
    { key: "Coordinate System", Value: coordinate },
    { key: "Projection", Value: projection },
    { key: "Data Type", Value: dataType },
    { key: "Vector Data Format", Value: vectorFormat },
    { key: "Scale", Value: scale },
    { key: "Data Sets", Value: dataSets },
    { key: "Raster Data Format", Value: rasterFormat },
    { key: "geo-referenced", Value: geoReference },
    { key: "Satellite Image Type", Value: SatelliteFormat },
    { key: "Resolution", Value: resolution },
    { key: "Submitted By: ", Value: `"${userName}"` },
  ];

  const printPage = () => {
    window.print();
  };
  const openFile = () => {
    window.open(filePath, "_blank");
  };

  return (
    <>
      {/* <div className="card w-75 my-5 m-auto h5 p-5 d-flex justify-content-center text-center"> */}
      {/* <div className="h4 mb-5">Details of {ProjectName} Project</div>

        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
        />
        <Divider /> */}
      {/* </div> */}

      <div className="card h4 mb-3 text-center w-75 my-5 m-auto h5 p-5 pb-1 d-flex justify-content-center">
        <Link
          className="d-inline d-flex justify-content-start pb-3"
          to={prevPath}
          style={{ textDecoration: "none" }}
        >
          <i
            className="fa-solid fa-angles-left"
            style={{ color: "black", paddingRight: "5px", scale: "70%" }}
          ></i>
        </Link>
        Details of "{ProjectName}" Project
        <table className="table table-hover text-start">
          <thead>
            <tr className="row table-dark my-2 pt-4">
              <th className="col-4">Info</th>
              <th className="col-8">Value</th>
            </tr>
          </thead>
          <tbody>
            {Info.map((inf, index) => (
              <tr className="row font-weight-light" key={index}>
                <td className="col-4 ">{inf.key}</td>
                <td className="col-8  font-weight-light">{inf.Value}</td>
              </tr>
            ))}
            <tr className="row font-weight-light">
              <td className="col-4 ">Uploaded File</td>
              <td className="col-8 font-weight-light" onClick={openFile}>
                {/* <a href={filePath} target="_blank"> */}
                {filePath?.split("\\")[filePath.split("\\").length - 1]}
                {/* </a> */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        type="button"
        className="w-25 btn btn-secondary btn-lg mb-5"
        onClick={printPage}
      >
        Print
      </button>
    </>
  );
};

export default Details;
