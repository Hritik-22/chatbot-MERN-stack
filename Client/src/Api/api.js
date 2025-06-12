import axios from "axios";
const path = import.meta.env.VITE_BACKEND_URL
console.log(path)

const api = axios.create({
    baseURL: `${path}/api/v1`,
    withCredentials: true
})

// login 
export const googleAuth = (code) => api.post(`/login?code=${code}`);

//  chatbot 
export const chatbot = (prompt) => api.post('/chatbot', prompt);

// profile - 
export const profile = () => api.get("/me");

// History -

export const userHistory = () => api.get("/history")

// logout Api -
export const logoutApi = () => api.post("/logout");
