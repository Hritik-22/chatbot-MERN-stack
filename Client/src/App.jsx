import './App.css'
import ChatInput from './chat/ChatInput'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./Auth/Header.jsx"
import { GoogleOAuthProvider } from "@react-oauth/google"
import Login from './Auth/Login'
import { useAuth } from './context/CreateContext.jsx'
import { profile } from './Api/api'
import { useEffect } from 'react'
import UserProfileCard from './Auth/Profile'
import { History } from './chat/History.jsx'


function App() {
  const { login } = useAuth()

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await profile();

        login(data.user)

      } catch (error) {
        console.log(error?.response?.data?.message);
      }
    }
    fetch();
  }, [])

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<ChatInput />} />
            <Route path="/sign-up" element={<ChatInput />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/me" element={<UserProfileCard />} />
            <Route path="/history" element={<History />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
