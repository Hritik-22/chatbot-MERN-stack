import * as React from 'react';
import {
    AppBar, Box, Toolbar, IconButton, Typography, Menu, Container,
    Avatar, Tooltip, MenuItem
} from '@mui/material';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/CreateContext.jsx';
import { logoutApi } from '../Api/api';

const settings = [
    { name: 'Profile', path: "/me" },
    { name: 'History', path: "/history" }
];

const Header = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { user, isAuthenticated, logout } = useAuth();
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        try {
            const { data } = await logoutApi();
            if (data.success) {
                logout();
                alert(data.message);
                navigate("/")
            }
        } catch (error) {
            console.error(error?.response?.data?.message);

        }

    }

    return (
        <>
            <AppBar position="fixed" sx={{ height: "65px", bgcolor: '#2c2c2c', top: 0, left: 0, right: 0 }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>

                        {/* Logo for desktop */}
                        <SmartToyRoundedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Chintu
                        </Typography>

                        {/* Logo for mobile */}

                        <Typography
                            variant="h5"
                            noWrap
                            component={Link}
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },

                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <SmartToyRoundedIcon sx={{ display: { width: "45px", height: "45px", xs: 'flex', md: 'none' }, mr: 1 }} />
                        </Typography>

                        {/* Spacer */}
                        <Box sx={{ flexGrow: 1 }} />

                        {/* Avatar menu */}
                        {user && isAuthenticated ?
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar src={user?.image} alt={user?.nam} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {
                                        settings.map((setting) => (
                                            <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                                                <Typography
                                                    component={Link}
                                                    to={setting.path}
                                                    sx={{ textDecoration: 'none', color: 'inherit', textAlign: 'center' }}
                                                >
                                                    {setting.name}
                                                </Typography>
                                            </MenuItem>
                                        ))

                                    }
                                    < MenuItem onClick={handleCloseUserMenu}>
                                        <Typography
                                            onClick={handleLogout}
                                            sx={{ textDecoration: 'none', color: 'inherit', textAlign: 'center' }}
                                        >
                                            Logout
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </Box> :
                            <Box>
                                <Typography
                                    component={Link}
                                    to="/sign-in"
                                    sx={{ textDecoration: 'none', color: 'inherit', textAlign: 'center' }}
                                >
                                    Login
                                </Typography>
                            </Box>
                        }
                    </Toolbar>
                </Container>
            </AppBar >

            {/* Space below fixed header */}
            < Toolbar />

            {/* Renders nested routes */}
            < Outlet />
        </>
    );
};

export default Header;
