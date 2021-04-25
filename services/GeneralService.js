import http from ".";
import {
  GET_ALL_REGIONS_URL,
  GET_ALL_WILLAYATS_URL
} from "../config/ApiEndpoints";

const getRegions = async () => {
  try {
    const response = await http.get(GET_ALL_REGIONS_URL);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

const getWillayats = async (payload) => {
  try {
    const response = await http.get(`${GET_ALL_WILLAYATS_URL}/${payload.id}`);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export { getRegions, getWillayats }