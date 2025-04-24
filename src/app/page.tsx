"use client";

import { useChat } from "@ai-sdk/react";
import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Paper,
  Badge,
  CircularProgress,
  Stack,
  styled,
} from "@mui/material";
import { IoSend, IoImage, IoDocument, IoHappy } from "react-icons/io5";
import { format } from "date-fns";
import Image from 'next/image';

const ChatContainer = styled(Box)(({ theme }) => ({
  height: "95vh",
  width: "95vw",
  display: "flex",
  margin: "20px auto",
  flexDirection: "column",
  backgroundColor: theme.palette.background.default,
}));

const Header = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const MessageArea = styled(Box)({
  flex: 1,
  overflowY: "auto",
  padding: "16px",
});

const InputArea = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
  display: "flex",
  gap: theme.spacing(1),
  alignItems: "center",
}));

const Message = styled(Paper)(({ theme, isOwn }) => ({
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
  maxWidth: "70%",
  alignSelf: isOwn ? "flex-end" : "flex-start",
  backgroundColor: isOwn
    ? theme.palette.primary.main
    : theme.palette.background.paper,
  color: isOwn
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary,
}));

const Page = () => {
  const { messages, input, handleSubmit, handleInputChange, status } =
    useChat();
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const messageAreaRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);


  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFileUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    const isValidFile =
      type === "pdf"
        ? file.type === "application/pdf" && file.size <= 10 * 1024 * 1024
        : ["image/jpeg", "image/png", "image/gif"].includes(file.type) &&
          file.size <= 5 * 1024 * 1024;

    if (!isValidFile) {
      alert(`Invalid ${type} file. Please check size and format requirements.`);
      return;
    }

    setUploading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (event.target.files) {
        setFiles(event.target.files);
      }

    } catch (error) {
      alert("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();
    if (!input.trim()) return;

    if (files) {
      handleSubmit(event, {
        experimental_attachments: files,
      });
    } else {
      handleSubmit();
    }

    setFiles(undefined);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  return (
    <ChatContainer>
      <Header>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          color="success"
        >
          <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64" />
        </Badge>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            Support Agent
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Online
          </Typography>
        </Box>
      </Header>

      <MessageArea ref={messageAreaRef} >
        <Stack>
          {messages.map((message, i) => (
            <Message key={i} isOwn={message.role === "user"}>
              {message.role === "assistant"
                ? JSON.stringify(message.content)
                : null}
              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {message.content}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {format(new Date(), "HH:mm")}
              </Typography>
              <div>
                {message?.experimental_attachments
                  ?.filter(
                    attachment =>
                      attachment?.contentType?.startsWith('image/') ||
                      attachment?.contentType?.startsWith('application/pdf'),
                  )
                  .map((attachment, index) =>
                    attachment.contentType?.startsWith('image/') ? (
                      <Image
                        key={`${i}-${index}`}
                        src={attachment.url}
                        width={500}
                        height={500}
                        alt={attachment.name ?? `attachment-${index}`}
                      />
                    ) : attachment.contentType?.startsWith('application/pdf') ? (
                      <iframe
                        key={`${i}-${index}`}
                        src={attachment.url}
                        width="500"
                        height="600"
                        title={attachment.name ?? `attachment-${index}`}
                      />
                    ) : null,
                  )}
              </div>
            </Message>
          ))}
          {isTyping && (
            <Box sx={{ display: "flex", gap: 1, p: 1 }}>
              <CircularProgress size={10} />
              <CircularProgress size={10} />
              <CircularProgress size={10} />
            </Box>
          )}
        </Stack>
      </MessageArea>

      <InputArea>
        <input
          type="file"
          accept=".pdf"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={(e) => handleFileUpload(e, "pdf")}
          multiple
        />
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={imageInputRef}
          onChange={(e) => handleFileUpload(e, "image")}
        />

        <IconButton
          color="primary"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          <IoDocument />
        </IconButton>

        <IconButton
          color="primary"
          onClick={() => imageInputRef.current?.click()}
          disabled={uploading}
        >
          <IoImage />
        </IconButton>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={input}
          onChange={handleInputChange}
          onKeyPress={(e) => (e.key === "Enter" && !e.shiftKey) && onHandleSubmit(e)}
          size="small"
          multiline
          rows={2}
          maxRows={6}
          disabled={status !== "ready"}
        />
        <IconButton
          color="primary"
          onClick={onHandleSubmit}
          disabled={!input.trim() || uploading}
        >
          {uploading ? <CircularProgress size={24} /> : <IoSend />}
        </IconButton>
      </InputArea>
    </ChatContainer>
  );
};

export default Page;
