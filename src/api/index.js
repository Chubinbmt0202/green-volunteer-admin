import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

const baseURL = "http://54.169.253.94";
// const baseURL = "http://127.0.0.1:8000";

// const token = 
// 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vNTQuMTY5LjI1My45NC9hcGkvYXV0aC9sb2dpbiIsImlhdCI6MTcwMTMwNzQxOCwiZXhwIjoxNzA2NDkxNDE4LCJuYmYiOjE3MDEzMDc0MTgsImp0aSI6IkRuREs2UFlMQjRnN1NVa00iLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyIsInVzZXJfaWQiOjF9.k09_rpKugieu-H1vxzXxYc135tCKy7OxmYINTGXeLiw'

export const instance = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    "X-Custom-Header": "foobar",
    'Content-Type': 'multipart/form-data',
    "Authorization": `Bearer ${token}`,
  },
});
