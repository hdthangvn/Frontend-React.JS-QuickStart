import { Input } from "reactstrap";
import axios from "../axios"
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('api/login', {email: userEmail, password: userPassword });

}

const getAllUsers = (inputId) => {
    console.log("Calling API /api/get-all-users?id=" + inputId);
    return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
    console.log("check data from service", data);
    return axios.post('/api/create-new-user', data);
};

export { handleLoginApi, getAllUsers, createNewUserService };