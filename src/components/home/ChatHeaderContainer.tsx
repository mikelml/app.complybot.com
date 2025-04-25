"use client";

import React from "react";
import { Box, Typography, Avatar, Badge } from "@mui/material";
import ChatHeader from "../ChatHeader";

const ChatHeaderContainer = () => {
  return (
    <ChatHeader>
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
    </ChatHeader>
  )
};
export default ChatHeaderContainer;
