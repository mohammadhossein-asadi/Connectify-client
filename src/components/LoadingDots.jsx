import { Box } from "@mui/material";

const LoadingDots = ({ color = "currentColor", size = 8, gap = 4 }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: `${gap}px`,
      }}
    >
      {[0, 1, 2].map((index) => (
        <Box
          key={index}
          component="span"
          sx={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: "50%",
            backgroundColor: color,
            display: "inline-block",
            animation: "dotAnimation 1.4s ease-in-out infinite",
            animationDelay: `${index * 0.16}s`,
            "@keyframes dotAnimation": {
              "0%": { transform: "scale(0)" },
              "40%": { transform: "scale(1)" },
              "80%": { transform: "scale(0)" },
              "100%": { transform: "scale(0)" },
            },
          }}
        />
      ))}
    </Box>
  );
};

export default LoadingDots;
