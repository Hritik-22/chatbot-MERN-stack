// src/pages/NotFound.jsx
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <Box
            height="100vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            bgcolor="#0d0d0d"
            color="#ffffff"
            textAlign="center"
            px={2}
        >
            <Typography variant="h1" fontSize="120px" fontWeight="bold">
                4<span style={{
                    color: '#c6ff00',
                    display: 'inline-block',
                    transform: 'scale(1.1)',
                }}>👁️</span>4
            </Typography>

            <Typography variant="h6" mt={2}>
                SORRY, THERE'S <span style={{ color: '#c6ff00' }}>NOTHING HERE</span>
            </Typography>

            <Button
                variant="contained"
                onClick={() => navigate("/")}
                sx={{
                    mt: 4,
                    backgroundColor: "#c6ff00",
                    color: "#000",
                    fontWeight: "bold",
                    "&:hover": {
                        backgroundColor: "#b4e600",
                    },
                }}
            >
                GO HOME
            </Button>
        </Box>
    );
};



export default PageNotFound