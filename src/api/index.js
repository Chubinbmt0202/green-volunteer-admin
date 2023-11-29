import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const baseURL = "http://54.169.253.94";

export const instance = axios.create({
  baseURL: `${baseURL}/api`,
  headers: { "X-Custom-Header": "foobar" },
});
