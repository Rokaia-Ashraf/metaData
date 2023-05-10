import client from "./client";
import { alertError, alertSuccess } from "../helper/toast";

const resource = "MainInfos";

export const getInfos = async (isAdmin) => {
  const url = isAdmin ? resource + "/getAllInfos" : resource + "/getMyInfos";
  try {
    const { data } = await client.get(url);
    return data.$values.map((info, index) => {
      // delete null fields
      for (var key in info) {
        if (info.hasOwnProperty(key)) {
          if (info[key] == null) delete info[key];
        }
      }
      delete info.isDeleted;
      if (parseInt(info.dataType) === 0) {
        let { vectorFormat, scale, dataSets } = info.vectorData;
        return { ...info, vectorFormat, scale, dataSets, key: index };
      } else if (parseInt(info.dataType) === 1) {
        let { rasterFormat, geoReference } = info.rasterData;
        return { ...info, rasterFormat, geoReference };
      } else {
        let { satlliteFormat, resolution } = info.satelliteData;
        return { ...info, satlliteFormat, resolution };
      }
    });
  } catch (err) {
    if (err.response.data) {
      alertError(err.response.data);
    } else {
      alertError(err.message);
    }
  }
};

export const addInfo = async (info) => {
  const formData = new FormData();
  for (var key in info) {
    formData.append(key, info[key]);
  }
  if (info.uploadedFile) {
    formData.append("fileName", info.uploadedFile.name);
  }
  try {
    const { data } = await client.post(resource, formData);
    if (data.status === "400") {
      alertError(data.message);
    } else {
      alertSuccess(data.message);
      return true;
    }
  } catch (error) {
    console.log(error);
    alertError(error.message);
  }
};
