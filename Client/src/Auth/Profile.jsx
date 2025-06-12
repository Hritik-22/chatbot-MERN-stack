import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { useAuth } from '../context/CreateContext';

const UserProfileCard = () => {
    const { user } = useAuth();

    return (
        <Box
            sx={{
                minHeight: '93.5vh',
                bgcolor: 'black',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Card
                sx={{
                    width: 300,
                    backgroundColor: '#3b3b3b',
                    borderRadius: 2,
                    color: 'white',
                    boxShadow: 4,
                }}
            >
                <Box
                    sx={{
                        background: '#2c2c2c',
                        display: 'flex',
                        justifyContent: 'center',
                        py: 3,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                    }}
                >
                    <Avatar
                        src={user?.image}
                        alt={user?.name}
                        sx={{ width: 120, height: 120, border: '3px solid white' }}
                    />
                </Box>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mt: 1 }}>
                        {user?.name}
                    </Typography>
                    <Typography variant="body2" color="gray">
                        {user?.email}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{ mt: 1, display: 'block', color: '#aaa' }}
                    >
                        Last Login: {new Date().toLocaleString()}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserProfileCard;
