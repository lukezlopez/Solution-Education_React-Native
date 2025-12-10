import axios from "axios";

export const api = axios.create({
    baseURL: "http://10.0.2.2:3000/api"
});

export function setAuthToken(token) {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
}
