import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import { useState, useEffect } from "react";

const LoginPage = ({ register = false }) => {
  const [pageType, setPageType] = useState(register ? "register" : "login");
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    setPageType(register ? "register" : "login");
  }, [register]);

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Connectify
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          {pageType === "login"
            ? "Welcome back to Connectify!"
            : "Join Connectify today!"}
        </Typography>
        <Form pageType={pageType} setPageType={setPageType} />
      </Box>
    </Box>
  );
};

export default LoginPage;
