import axios from "axios"

export const instance = axios.create({
  baseURL: "localhost:3000/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
})

// const temp = useMemo(() => {

//   return ""

// }, [currentPage])

// init load page
// useEffect(() => {
// res =  axios.get(localhost:3000/login)
// setState(res)
// }, [])
