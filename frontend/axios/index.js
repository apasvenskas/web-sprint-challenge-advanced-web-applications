// ✨ implement axiosWithAuth
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const authLogic = (failedRequest) => 
    axios
    .post("http://localhost:9000/auth/refresh", {
        refreshToken: localStorage.getItem("refreshToken"),
    })
    .then((tokenRefreshResponse) => {
        localStorage.setItem("token", tokenRefreshResponse.data.token);
        failedRequest.response.config.headers["Authorization"] = 
            "Bearer" + tokenRefreshResponse.data.token;
        return Promise.resolve();
    });

createAuthRefreshInterceptor(axios, authLogic);

const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: "http://localhost:9000/api",
        headers: {
            Authorization: token ? `Bearer ${token}` : null,
        },
    });
};

export default axiosWithAuth;