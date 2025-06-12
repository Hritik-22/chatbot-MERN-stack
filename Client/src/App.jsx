// src/App.jsx
import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Header from './Auth/Header';
import Login from './Auth/Login';
import UserProfileCard from './Auth/Profile';
import ChatInput from './chat/ChatInput';
import { History } from './chat/History';
import PrivateRoute from './private.routes';

import { useAuth } from './context/CreateContext';
import { profile } from './Api/api';
import PageNotFound from './chat/PageNotFound';

function App() {
  const { login } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await profile();
        login(data.user);
      } catch (error) {
        console.log(error?.response?.data?.message || "Not authenticated");
      }
    };
    fetchProfile();
  }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<ChatInput />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />

            <Route
              path="/me"
              element={
                <PrivateRoute>
                  <UserProfileCard />
                </PrivateRoute>
              }
            />

            <Route
              path="/history"
              element={
                <PrivateRoute>
                  <History />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
