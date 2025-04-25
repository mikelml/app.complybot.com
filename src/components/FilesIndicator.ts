import { Box, styled } from "@mui/material";

const FilesIndicator = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(12),
  top: "50%",
  transform: "translateY(-50%)",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export default FilesIndicator;
