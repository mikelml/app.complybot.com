"use client";

import React, { useState } from "react";
import {
  IconButton,
  TextField,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import InputArea from "../InputArea";
import { IoClose, IoDocument, IoImage, IoSend } from "react-icons/io5";
import FilesIndicator from "../FilesIndicator";

interface ChatHeaderContainerProps {
  input: string;
  onHandleSubmit: (event: React.KeyboardEvent | React.MouseEvent) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  files: FileList | null;
  setFiles: React.Dispatch<React.SetStateAction<FileList | null>>;
  fileInputRef: React.RefObject<HTMLInputElement>;
  imageInputRef: React.RefObject<HTMLInputElement>;
  status: boolean;
}

const ChatHeaderContainer: React.FC<ChatHeaderContainerProps> = ({
  input,
  onHandleSubmit,
  handleInputChange,
  files,
  setFiles,
  fileInputRef,
  imageInputRef,
  status,
}) => {
  const [uploading, setUploading] = useState(false);

interface HandleFileUploadEvent {
    target: {
        files: FileList | null;
    };
}

const handleFileUpload = async (
    event: HandleFileUploadEvent,
    type: "pdf" | "image"
): Promise<void> => {
    const file = event.target.files?.[0];
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
        console.error("Error uploading file:", error);
    } finally {
        setUploading(false);
    }
};
  const handleRemoveAttachment = () => {
    setFiles(null);
    fileInputRef.current.value = "";
    imageInputRef.current.value = "";
  }

  return (
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

      <Box sx={{ position: "relative", flex: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={input}
          onChange={handleInputChange}
          onKeyPress={(e) =>
            e.key === "Enter" && !e.shiftKey && onHandleSubmit(e)
          }
          size="small"
          multiline
          rows={2}
          maxRows={6}
          disabled={status !== true}
        />
        {files && files.length > 0 && (
          <FilesIndicator>
            <Typography variant="caption" color="primary">
              {files?.length} attachment(s)
            </Typography>
            <IconButton
              size="small"
              onClick={() => handleRemoveAttachment()}
              sx={{ padding: 0.5 }}
            >
              <IoClose size={14} />
            </IconButton>
          </FilesIndicator>
        )}
      </Box>
      <IconButton
        color="primary"
        onClick={onHandleSubmit}
        disabled={!input.trim() || uploading}
      >
        {uploading ? <CircularProgress size={24} /> : <IoSend />}
      </IconButton>
    </InputArea>
  );
};
export default ChatHeaderContainer;
