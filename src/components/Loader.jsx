import { Box } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            height: "6rem",
            width: "6rem",
            borderRadius: "50%",
            borderTop: "8px solid #e5e7eb",
            borderBottom: "8px solid #e5e7eb",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "6rem",
            width: "6rem",
            borderRadius: "50%",
            borderTop: "8px solid #3b82f6",
            borderBottom: "8px solid #3b82f6",
            animation: "spin 1s linear infinite",
            "@keyframes spin": {
              "0%": {
                transform: "rotate(0deg)",
              },
              "100%": {
                transform: "rotate(360deg)",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Loader;
