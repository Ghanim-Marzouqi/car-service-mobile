import http from ".";
import { GET_ALL_SERVICES_URL, GET_SERVICE_BY_ID_URL } from "../config/ApiEndpoints";

const getAllServices = async () => {
  try {
    const response = await http.get(GET_ALL_SERVICES_URL);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

const getServiceById = async (payload) => {
  try {
    const response = await http.get(`${GET_SERVICE_BY_ID_URL}/${payload.id}`);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export { getAllServices, getServiceById }