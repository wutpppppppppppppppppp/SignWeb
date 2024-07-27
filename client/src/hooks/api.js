import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "X-Custom-Header": "foobar" },
})
export default api

// const temp = useMemo(() => {

//   return ""

// }, [currentPage])

// init load page
// useEffect(() => {
// res =  axios.get(localhost:3000/login)
// setState(res)
// }, [])
