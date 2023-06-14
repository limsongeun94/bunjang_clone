import Axios from 'axios'

export default Axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 1000,
  // headers: {'Content-Type': 'application/json'}
})