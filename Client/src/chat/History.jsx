import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Box, Button,
    Container, Typography
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { userHistory } from '../Api/api';
import HistoryBotResponse from './HistoryBotResponse';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const getHistory = async () => {
            try {
                const { data } = await userHistory();

                setHistory(data.data || []);
            } catch (err) {
                setError(err);
                console.error('Error fetching history:', err);
            } finally {
                setLoading(false);
            }
        };

        getHistory();
    }, []);

    const handleView = (item) => {
        setSelectedItem(item);
        setOpenModal(true);
    };

    if (loading || error) {
        return (
            <Box
                sx={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#1e1e1e',
                    color: 'white',
                    textAlign: 'center',
                    p: 2,
                }}
            >
                {loading ? 'Loading history...' : 'Error loading history.'}
            </Box>
        );
    }


    return (
        <Box
            sx={{
                width: '100vw',
                minHeight: '100vh',
                bgcolor: '#1e1e1e',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                position: 'relative',
            }}
        >
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: 'bold', color: 'primary.main' }}
                >
                    History
                </Typography>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: '100%' }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Question</StyledTableCell>

                                <StyledTableCell align="center">Bot Response</StyledTableCell>
                                <StyledTableCell align="right">Asked At</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {history.map((item, index) => (
                                <StyledTableRow key={item.id || item._id || index}>

                                    <StyledTableCell component="th" scope="row">
                                        {index + 1}.   {item.question || item.data?.question || 'N/A'}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button onClick={() => handleView(item)}>View</Button>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        {item.askedAt
                                            ? new Date(item.askedAt).toLocaleDateString()
                                            : 'N/A'}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            {selectedItem && (
                <HistoryBotResponse
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    question={selectedItem.question || selectedItem.data?.question || 'N/A'}
                    answer={selectedItem.answer || 'N/A'}
                />
            )}
        </Box>
    );
};

export default History;
