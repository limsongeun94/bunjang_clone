import Axios from "axios";

//console.log("process.env.API_HOST", process.env.NEXT_PUBLIC_API_HOST);

export default Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  // timeout: 1000,
  // headers: {'Content-Type': 'application/json'}
});
