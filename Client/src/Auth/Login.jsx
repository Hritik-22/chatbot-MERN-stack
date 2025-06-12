import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Box,
    Divider,
    Link,
    Paper
} from '@mui/material';
import { Google } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/CreateContext';
import { useGoogleLogin } from "@react-oauth/google"
import MetaData from '../meta/MetaData';
import { googleAuth } from '../Api/api';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    // getting response from google Api 

    const GoogleResponse = async (result) => {
        try {
            if (result.code) {
                const { data } = await googleAuth(result.code);
                if (data.success) {
                    navigate("/")
                    login(data.user)
                }
            }

        } catch (error) {
            console.log(error)
        }

    }


    // login with google*

    const loginWithGoogle = useGoogleLogin({
        onSuccess: GoogleResponse,
        onError: GoogleResponse,
        flow: 'auth-code'

    })



    //  Submit to the backend - credantial*
    const handleSubmit = async () => {
        try {
            if (formData.name === 'ritik' && formData.password === '3265@121') {
                login(formData);
                navigate('/');
            }
            console.log(formData)
        } catch (error) {
            console.log(error?.response?.data?.message || 'Login failed');
        }
    };

    return (
        <Box
            sx={{
                backgroundColor: '#000',
                minHeight: '93.5vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <MetaData title={"sign-in"} />


            <Button

                variant="outlined"
                startIcon={<Google />}
                onClick={loginWithGoogle}
                sx={{ mb: 1, p: 2, color: 'white', borderColor: '#555', maxWidth: 400 }}
            >
                SIGN IN WITH GOOGLE
            </Button>

        </Box>
    );
};

export default Login;
