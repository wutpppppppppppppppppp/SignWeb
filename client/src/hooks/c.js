import axios from "axios"

export const instance = axios.create({
  baseURL: "localhost:3000/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
})
