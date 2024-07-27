import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 3000,
  // headers: { "X-Custom-Header": "foobar" },
})

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle error globally
    console.error("API call error:", error)
    return Promise.reject(error)
  }
)

export default api

// const temp = useMemo(() => {

//   return ""

// }, [currentPage])

// init load page
// useEffect(() => {
// res =  axios.get(localhost:3000/login)
// setState(res)
// }, [])
