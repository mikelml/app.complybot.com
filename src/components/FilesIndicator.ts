import { Box, styled } from "@mui/material";

const FilesIndicator = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: 10,
  top: "50%",
  transform: "translateY(-50%)",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  [theme.breakpoints.down(700)]: {
    top: "75%",
  },
}));

export default FilesIndicator;
