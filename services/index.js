import axios from "axios";

const http = axios.create({
  baseURL: "http://192.168.43.180:5000/api"
});

http.defaults.headers.post["Content-Type"] = "application/json";

export default http;