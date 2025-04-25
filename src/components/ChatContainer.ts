import { Box, styled } from "@mui/material";

const ChatContainer = styled(Box)(({ theme }) => ({
    height: "calc(100vh - 64px)",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.default,
  }));
export default ChatContainer;