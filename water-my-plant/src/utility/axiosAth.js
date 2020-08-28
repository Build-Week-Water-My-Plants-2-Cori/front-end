import axios from 'axios'
const axiosWithAuth = () => {
    const token = localStorage.getItem("token");
    return axios.create({
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        baseURL: "https://cking-watermyplants.herokuapp.com/"
    });
}
export default axiosWithAuth

