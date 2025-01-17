import {
  Box,
  useMediaQuery,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import {
  GroupsOutlined,
  ChatBubbleOutlineOutlined,
  PhotoLibraryOutlined,
  PersonAddOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "scenes/navbar";
import PublicPostsWidget from "scenes/widgets/PublicPostsWidget";

const FeatureCard = ({ icon, title, description }) => {
  const theme = useTheme();
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        backgroundColor: "transparent",
        border: `1px solid ${
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.1)"
            : "rgba(0,0,0,0.1)"
        }`,
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardContent sx={{ textAlign: "center", p: { xs: 2, sm: 3 } }}>
        {icon}
        <Typography variant="h6" sx={{ my: { xs: 1.5, sm: 2 } }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const PublicHomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const isMediumScreen = useMediaQuery(
    "(min-width: 600px) and (max-width: 999px)"
  );

  const features = [
    {
      icon: (
        <GroupsOutlined
          sx={{ fontSize: 40, color: theme.palette.primary.main }}
        />
      ),
      title: "Connect with Friends",
      description:
        "Build your network and stay connected with people who matter.",
    },
    {
      icon: (
        <ChatBubbleOutlineOutlined
          sx={{ fontSize: 40, color: theme.palette.primary.main }}
        />
      ),
      title: "Share Your Thoughts",
      description: "Express yourself and engage in meaningful conversations.",
    },
    {
      icon: (
        <PhotoLibraryOutlined
          sx={{ fontSize: 40, color: theme.palette.primary.main }}
        />
      ),
      title: "Share Moments",
      description: "Post photos and videos of your favorite memories.",
    },
    {
      icon: (
        <PersonAddOutlined
          sx={{ fontSize: 40, color: theme.palette.primary.main }}
        />
      ),
      title: "Grow Your Network",
      description: "Discover new connections and expand your social circle.",
    },
  ];

  return (
    <Box>
      <Navbar />

      {/* Hero Section */}
      <Container
        maxWidth="lg"
        sx={{
          mt: { xs: 2, sm: 3, md: 4 },
          px: { xs: 1.5, sm: 4, md: "6%" },
          minHeight: { xs: "auto", sm: "50vh", md: "60vh" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={{ xs: 3, sm: 4, md: 6 }} alignItems="center">
          {/* Hero Text */}
          <Grid item xs={12} md={6}>
            <Box
              textAlign={{ xs: "center", md: "left" }}
              mb={{ xs: 3, md: 0 }}
              px={{ xs: 1, sm: 2, md: 0 }}
            >
              <Typography
                variant={isNonMobileScreens ? "h3" : "h4"}
                fontWeight="bold"
                mb={{ xs: 1.5, sm: 2 }}
                fontSize={{ xs: "1.75rem", sm: "2rem", md: "2.5rem" }}
                lineHeight={1.2}
              >
                Connect, Share, and Engage with Your Community
              </Typography>
              <Typography
                variant="body1"
                mb={{ xs: 2, sm: 3 }}
                px={{ xs: 1, sm: 0 }}
                fontSize={{ xs: "1rem", sm: "1.1rem" }}
                color="text.secondary"
              >
                Join millions of people sharing their thoughts, experiences, and
                moments.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/register")}
                sx={{
                  mr: { xs: 0, md: 2 },
                  mb: { xs: 2, md: 0 },
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1.25, sm: 1.5 },
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                Join Now
              </Button>
            </Box>
          </Grid>

          {/* Features Grid */}
          <Grid item xs={12} md={6}>
            <Grid
              container
              spacing={{ xs: 2, sm: 3 }}
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <FeatureCard {...feature} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* Content Section */}
      <Container
        maxWidth="lg"
        sx={{
          mt: { xs: 2, sm: 5, md: 6 },
          mb: { xs: 3, sm: 6, md: 8 },
          px: { xs: 1.5, sm: 4, md: "6%" },
        }}
      >
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          <Grid item xs={12} md={8}>
            <Typography
              variant="h4"
              sx={{
                mb: { xs: 2, sm: 3 },
                fontSize: { xs: "1.5rem", sm: "2rem" },
              }}
            >
              Latest Posts
            </Typography>
            <Box sx={{ mx: { xs: -2, sm: 0 } }}>
              <PublicPostsWidget />
            </Box>
          </Grid>

          {isNonMobileScreens && (
            <Grid item md={4}>
              <Card
                elevation={0}
                sx={{
                  p: { sm: 2, md: 3 },
                  backgroundColor: theme.palette.background.alt,
                  border: `1px solid ${
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.1)"
                  }`,
                  position: "sticky",
                  top: "2rem",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Why Join Connectify?
                </Typography>
                <Typography variant="body1" paragraph>
                  • Create and customize your profile
                </Typography>
                <Typography variant="body1" paragraph>
                  • Connect with friends and family
                </Typography>
                <Typography variant="body1" paragraph>
                  • Share photos and updates
                </Typography>
                <Typography variant="body1" paragraph>
                  • Engage with your community
                </Typography>
                <Button
                  variant="text"
                  fullWidth
                  onClick={() => navigate("/login")}
                  sx={{
                    mt: 2,
                    textTransform: "none",
                    borderRadius: 2,
                  }}
                >
                  Already have an account?
                </Button>
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default PublicHomePage;
