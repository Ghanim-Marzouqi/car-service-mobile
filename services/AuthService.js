import http from ".";
import { AUTHENTICATE_USER_URL, CREATE_USER_URL } from "../config/ApiEndpoints";

const authenticateUser = async (payload) => {
  try {
    let response = await http.post(AUTHENTICATE_USER_URL, payload);
    return response.data;
  } catch (error) {
    console.log("http error", error);
  }
}

const createUser = async (payload) => {
  try {
    let response = await http.post(CREATE_USER_URL, payload);
    return response.data;
  } catch (error) {
    console.log("http error", error);
  }
}

export { authenticateUser, createUser }