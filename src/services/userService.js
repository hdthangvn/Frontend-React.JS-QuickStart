import { Input } from "reactstrap";
import axios from "../axios"
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('api/login', {email: userEmail, password: userPassword });

}

const getAllUsers = (inputId) => {
    console.log("Calling API /api/get-all-users?id=" + inputId);
    return axios.get(`/api/get-all-users?id=${inputId}`);
};

export { handleLoginApi, getAllUsers }