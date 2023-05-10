import { useState, useEffect } from "react";
import { Divider, Table } from "antd";
import { getInfos } from "../APIs/infos";
import { useLocation, useNavigate } from "react-router";

const AllSubmissions = ({
  isAdmin,
  submissions,
  setSelectedSubmission,
  setSubmissions,
  setPrevPath,
}) => {
  useEffect(() => {
    (async () => {
      let Infos = await getInfos(isAdmin);
      if (Infos) {
        console.log(Infos);
        const dataTypes = ["Vector", "Raster (Scanned Map)", "Satellite Image"];
        let _data = Infos.map((s) => {
          return {
            ...s,
            key: s.id,
            ProjectName: s.projName,
            UserName: s.userName,
            Date: s.createdOn.split("T")[0],
            Time: s.createdOn.split("T")[1].split(".")[0],
            Details: `Details of ${s.projName} Project`,
            conciliationPosition: s.conciliationPosition.split("|"),
            dataType: dataTypes[s.dataType],
            // dataSource:s.dataSource.split("|"),
            // dataSets:s.dataSets?.split("|"),
            Approval: "Not Approved",
          };
        });
        setSubmissions(_data);
      }
    })();
  }, [isAdmin, setSubmissions]);

  const Navigate = useNavigate();
  const location = useLocation();
  const showDetails = (id) => {
    setSelectedSubmission(id);
    setPrevPath(location.pathname);
    Navigate("/Details");
  };
  const columns = [
    {
      title: (t) => <p className="h4">ID</p>,
      dataIndex: "key",
    },
    {
      title: (t) => <p className="h5">Project Name</p>,
      dataIndex: "ProjectName",
    },
    {
      title: (t) => <p className="h5">User Name</p>,
      dataIndex: "UserName",
    },
    {
      title: (t) => <p className="h5">Date</p>,
      dataIndex: "Date",
    },
    {
      title: (t) => <p className="h5">Time</p>,
      dataIndex: "Time",
    },
    {
      title: (t) => <p className="h5">Approval</p>,
      dataIndex: "Approval",
    },
    {
      title: (t) => <p className="h5">Details</p>,
      dataIndex: "Details",
      render: (text, record) => (
        <button
          className="btn btn-light"
          onClick={() => showDetails(record.key)}
        >
          {text}
        </button>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  const [selectionType] = useState();

  const printPage = () => {
    window.print();
  };

  return (
    <>
      <div className="text-center h5 p-2 mt-5"> Submissions</div>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={submissions}
      />
      <Divider />
      <button
        type="button"
        className="w-25 btn btn-secondary btn-lg m-5"
        onClick={printPage}
      >
        Print
      </button>
    </>
  );
};

export default AllSubmissions;
