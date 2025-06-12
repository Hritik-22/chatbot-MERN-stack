import { Paper } from "@mui/material";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";
const ChatMessage = ({ isUser, children }) => (
    <Paper
        sx={{
            bgcolor: isUser ? "#4a4a4a" : "#252323",
            color: "white",
            maxWidth: "100%",
            width: "fit-content",
            alignSelf: isUser ? "flex-end" : "flex-start",
            my: 1,
            p: 2,
            borderRadius: 3,
            lineHeight: "25px",
            textAlign: "justify",
            wordBreak: "break-word",
        }}
    >
        <ReactMarkdown
            components={{
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                        <CodeBlock language={match[1]} value={String(children).replace(/\n$/, "")} />
                    ) : (
                        <code style={{ backgroundColor: "#444", padding: "2px 4px", borderRadius: 4 }} {...props}>
                            {children}
                        </code>
                    );
                },
            }}
        >
            {children}
        </ReactMarkdown>
    </Paper>
);

export default ChatMessage;