import { Box, styled } from "@mui/material";

const InputArea = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
    display: "flex",
    gap: theme.spacing(1),
    alignItems: "center",
  }));
  
export default InputArea;