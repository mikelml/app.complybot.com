import { Paper, styled } from "@mui/material";

interface MessageProps {
  isOwn: boolean;
}

const Message = styled(Paper)<MessageProps>(({ theme, isOwn }) => ({
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
export default Message;