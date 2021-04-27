import http from ".";
import { CREATE_BOOKING_URL, GET_ALL_BOOKING_URL, UPDATE_BOOKING_STATUS_URL } from "../config/ApiEndpoints";

const createBooking = async (payload) => {
  try {
    const response = await http.post(CREATE_BOOKING_URL, payload);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

const getAllBookings = async (payload) => {
  try {
    const response = await http.get(`${GET_ALL_BOOKING_URL}/${payload}`);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

const updateBooingStatus = async (payload) => {
  try {
    const response = await http.put(`${UPDATE_BOOKING_STATUS_URL}/${payload}`);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export { createBooking, getAllBookings, updateBooingStatus }