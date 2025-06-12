import { Paper, IconButton, Box, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";

// Custom renderer for code blocks
const CodeBlock = ({ language, value }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                backgroundColor: "#1e1e1e",
                color: "#d4d4d4",
                fontFamily: "Source Code Pro, monospace",
                fontSize: 14,
                p: 2,
                whiteSpace: "pre-wrap",
                borderRadius: 1,
                overflowX: "auto",
                position: "relative",
                m: 2,
            }}
        >
            <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                <Tooltip title={copied ? "Copied!" : "Copy"}>
                    <IconButton
                        size="small"
                        onClick={handleCopy}
                        sx={{ color: "#d4d4d4", bgcolor: "#333", ":hover": { bgcolor: "#444" } }}
                    >
                        <ContentCopyIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
            <code className={`language-${language}`}>{value}</code>
        </Paper>
    );
};
export default CodeBlock;
