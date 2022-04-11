import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://labs.patio.com.bo/api-pay/",
});
export default axiosClient;