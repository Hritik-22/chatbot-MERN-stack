import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

// Dialog styling
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

// Dialog title with close button
const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}

        </DialogTitle>
    );
};

// Helper to strip HTML tags and decode entities
const stripHtml = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
};

// Helper to normalize Markdown into plain text
const stripMarkdown = (text) => {
    return text
        .replace(/\*\*(.*?)\*\*/g, '$1') // remove **bold**
        .replace(/\*(.*?)\*/g, '$1')     // remove *italic*
        .replace(/[_~`>#-]/g, '')        // remove markdown chars
        .replace(/\n/g, '\n\n');         // preserve paragraph spacing
};

const HistoryBotResponse = ({ open, onClose, question, answer }) => {
    const cleanAnswer = stripMarkdown(stripHtml(answer || ''));

    return (
        <BootstrapDialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            fullWidth
            maxWidth="md"
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose} sx={{ textAlign: "center" }}>
                Chat Between User and Bot
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom fontWeight="bold">
                    User's Question :
                </Typography>
                <Typography gutterBottom whiteSpace="pre-line" sx={{ textAlign: "justify" }}>
                    {question || 'N/A'}
                </Typography>
                <Typography gutterBottom fontWeight="bold" sx={{ mt: 2 }}>
                    Bot's Answer :
                </Typography>
                <Typography gutterBottom whiteSpace="pre-line" sx={{ textAlign: "justify" }}>
                    {cleanAnswer || 'N/A'}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose}>
                    Close
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
};

export default HistoryBotResponse;
