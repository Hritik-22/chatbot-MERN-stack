import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
    Box,
    TextField,
    IconButton,
    Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { chatbot } from "../Api/api";
import MetaData from "../meta/MetaData";
import ChatMessage from "./ChatMessage";


const ChatInput = () => {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, SetError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;

        const newMessages = [...messages, { sender: "user", text: question }];
        setMessages(newMessages);
        setLoading(true);
        setQuestion("");

        try {
            const { data } = await chatbot({ prompt: question });
            setMessages([...newMessages, { sender: "bot", text: data.htmlContent }]);
        } catch (err) {
            SetError(err.response?.data?.message || "Something went wrong.");
            setMessages([...newMessages, { sender: "bot", text: err.response?.data?.message || "Something went wrong." }]);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                bgcolor: "#1e1e1e",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                position: "relative",
            }}
        >
            <MetaData title={"chat screen"} />
            {/* Chat messages container */}
            <Box
                sx={{
                    flex: 1,
                    width: "100%",
                    maxWidth: "900px",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                    px: 2,
                    py: 1,
                    mb: "65px",
                }}
            >
                {messages.map((msg, idx) => (
                    <ChatMessage key={idx} isUser={msg.sender === "user"}>
                        {msg.text}
                    </ChatMessage>
                ))}

                {loading && (
                    <Box sx={{ alignSelf: "flex-start", px: 2, py: 1, color: "white", fontStyle: "italic" }}>
                        Thinking...
                    </Box>
                )}
            </Box>

            {/* Chat input */}
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    margin: "0 auto",
                    bgcolor: "#2c2c2c",
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: 5,
                    width: "100%",
                    maxWidth: 800,
                    px: 2,
                    mb: 0.5,
                }}
            >
                <TextField
                    variant="standard"
                    placeholder={error || "How can I help you...?"}
                    fullWidth
                    value={question}
                    disabled={Boolean(error)}
                    onChange={(e) => setQuestion(e.target.value)}
                    InputProps={{
                        disableUnderline: true,
                        style: {
                            color: "white",
                            lineHeight: 1.5,
                        },
                    }}
                />

                <IconButton type="submit">
                    <SearchIcon sx={{ color: "white" }} />
                </IconButton>
            </Box>
        </Box>
    );
};

export default ChatInput;
