import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true
})

// login 
export const googleAuth = (code) => api.post(`/login?code=${code}`);

//  chatbot 
export const chatbot = (prompt) => api.post('/chatbot', prompt);

// profile - 
export const profile = () => api.get("/me");

// History -

export const userHistory = (currentPage, limit) => api.get("/history")

// logout Api -
export const logoutApi = () => api.post("/logout");
