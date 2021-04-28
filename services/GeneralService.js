import http from ".";
import {
  GET_ALL_REGIONS_URL,
  GET_ALL_WILLAYATS_URL,
  SEND_EMAIL_URL
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

const sendEmail = async (payload) => {
  try {
    const response = await http.post(SEND_EMAIL_URL, payload);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export { getRegions, getWillayats, sendEmail }