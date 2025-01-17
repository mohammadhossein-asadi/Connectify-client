import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Button,
  Stack,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isAuth = Boolean(useSelector((state) => state.token));
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const primaryDark = theme.palette.primary.dark;
  const primary = theme.palette.primary.main;
  const alt = theme.palette.background.alt;

  const fullName =
    user && user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : "Guest";

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          Connectify
        </Typography>
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          {!isAuth ? (
            <Stack direction="row" spacing={2}>
              <Button
                onClick={() => navigate("/login")}
                sx={{
                  color: dark,
                  "&:hover": { color: primary },
                  padding: "0.5rem 2rem",
                }}
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate("/register")}
                sx={{
                  backgroundColor: primary,
                  color: background,
                  "&:hover": { backgroundColor: primaryLight },
                  padding: "0.5rem 2rem",
                }}
              >
                Register
              </Button>
            </Stack>
          ) : (
            <FlexBetween gap="2rem">
              <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              <Message sx={{ fontSize: "25px" }} />
              <Notifications sx={{ fontSize: "25px" }} />
              <Help sx={{ fontSize: "25px" }} />
              <FormControl variant="standard" value={fullName}>
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    minWidth: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          )}
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <>
          {/* Backdrop with blur */}
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgcolor="rgba(0,0,0,0.5)"
            sx={{
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              zIndex: 9,
              transition: "all 0.3s ease-in-out",
            }}
            onClick={() => setIsMobileMenuToggled(false)}
          />

          {/* Menu */}
          <Box
            position="fixed"
            left="50%"
            top="0"
            width="100%"
            maxWidth="400px"
            height="auto"
            zIndex={10}
            backgroundColor={background}
            sx={{
              transform: "translateX(-50%)",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              borderRadius: "0 0 12px 12px",
              animation: "slideDown 0.3s ease-out forwards",
              "@keyframes slideDown": {
                from: {
                  transform: "translate(-50%, -100%)",
                  opacity: 0,
                },
                to: {
                  transform: "translate(-50%, 0)",
                  opacity: 1,
                },
              },
            }}
          >
            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(false)}
                sx={{ position: "absolute", right: "0.5rem", top: "0.5rem" }}
              >
                <Close />
              </IconButton>
            </Box>

            {/* MENU ITEMS */}
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="1.5rem"
              p="2rem"
              pt="3rem"
            >
              {!isAuth ? (
                <>
                  <Button
                    fullWidth
                    onClick={() => {
                      navigate("/login");
                      setIsMobileMenuToggled(false);
                    }}
                    sx={{
                      color: dark,
                      p: "0.75rem",
                      borderRadius: "4px",
                      "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    fullWidth
                    onClick={() => {
                      navigate("/register");
                      setIsMobileMenuToggled(false);
                    }}
                    sx={{
                      backgroundColor: primary,
                      color: background,
                      p: "0.75rem",
                      borderRadius: "4px",
                      "&:hover": { backgroundColor: primaryLight },
                    }}
                  >
                    Register
                  </Button>
                </>
              ) : (
                <>
                  <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                      <DarkMode sx={{ fontSize: "25px" }} />
                    ) : (
                      <LightMode sx={{ color: dark, fontSize: "25px" }} />
                    )}
                  </IconButton>
                  <Message sx={{ fontSize: "25px" }} />
                  <Notifications sx={{ fontSize: "25px" }} />
                  <Help sx={{ fontSize: "25px" }} />
                  <FormControl variant="standard" value={fullName}>
                    <Select
                      value={fullName}
                      sx={{
                        backgroundColor: neutralLight,
                        minWidth: "150px",
                        borderRadius: "0.25rem",
                        p: "0.25rem 1rem",
                        "& .MuiSvgIcon-root": {
                          pr: "0.25rem",
                          width: "3rem",
                        },
                        "& .MuiSelect-select:focus": {
                          backgroundColor: neutralLight,
                        },
                      }}
                      input={<InputBase />}
                    >
                      <MenuItem value={fullName}>
                        <Typography>{fullName}</Typography>
                      </MenuItem>
                      <MenuItem onClick={() => dispatch(setLogout())}>
                        Sign Out
                      </MenuItem>
                    </Select>
                  </FormControl>
                </>
              )}
            </FlexBetween>
          </Box>
        </>
      )}
    </FlexBetween>
  );
};

export default Navbar;
