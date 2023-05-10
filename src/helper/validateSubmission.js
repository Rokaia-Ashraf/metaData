export const validateMainInfoSubmission = ({
  sector,
  department,
  projType,
  projName,
  lvlOfDetails,
  dataSource,
  startDate,
  endDate,
  phases,
  currentPhase,
  coordinate,
  conciliationPosition,
  projection,
  dataType,
}) => {
  if (
    (department === "" ||
      sector === "" ||
      projType === "" ||
      projName === "" ||
      lvlOfDetails === "" ||
      dataSource.length === 0 ||
      !startDate ||
      !endDate ||
      conciliationPosition === [false, false, false, false],
    coordinate === "" || projection === "" || dataType === "")
  ) {
    return " Fill all required Fields ";
  } else if (new Date(startDate) > new Date(endDate)) {
    return " Start date can't be after end date ";
  } else if (currentPhase > phases) {
    return " Current Phase can't be greater than Project Phases";
  }
};
