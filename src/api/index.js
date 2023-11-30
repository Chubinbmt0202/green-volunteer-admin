import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const baseURL = "http://54.169.253.94"
let authToken = "";

if (typeof window !== "undefined") {
  authToken = localStorage?.getItem('authToken') || "";
}

export const instance = axios.create({
  baseURL: `${baseURL}/api`,
  headers: { "X-Custom-Header": "foobar", "Authorization": `Bearer ${authToken}` },
});
