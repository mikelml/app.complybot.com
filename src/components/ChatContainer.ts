import { Box, styled } from "@mui/material";

const ChatContainer = styled(Box)(({ theme }) => ({
    height: "95vh",
    width: "95vw",
    display: "flex",
    margin: "20px auto",
    flexDirection: "column",
    backgroundColor: theme.palette.background.default,
  }));
export default ChatContainer;