import axios from "axios";

export default axios.create({
    baseURL: "https://nodeblogapp.onrender.com/api",
    withCredentials: false,
   
})
