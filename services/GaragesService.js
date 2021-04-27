import http from ".";
import { GET_ALL_GARAGES_URL, GET_GARAGE_BY_ID_URL } from "../config/ApiEndpoints";

const getAllGarages = async (payload) => {
  try {
    const response = await http.post(GET_ALL_GARAGES_URL, payload);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

const getGarageById = async (payload) => {
  try {
    const response = await http.get(`${GET_GARAGE_BY_ID_URL}/${payload}`);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export { getAllGarages, getGarageById }