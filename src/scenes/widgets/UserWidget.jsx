import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  Check,
  Close,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, TextField } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserWidgetSkeleton from "components/UserWidgetSkeleton";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [editLinkedIn, setEditLinkedIn] = useState(false);
  const [linkedinUsername, setLinkedinUsername] = useState("");
  const [editTwitter, setEditTwitter] = useState(false);
  const [twitterUserName, setTwitterUserName] = useState("");
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/users/${userId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <UserWidgetSkeleton />;
  }

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.main,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined sx={{ cursor: "pointer" }} />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            {editTwitter ? (
              <>
                <TextField
                  placeholder="Twitter Username"
                  type="text"
                  value={twitterUserName}
                  onChange={(e) => setTwitterUserName(e.target.value)}
                />
                {twitterUserName && (
                  <>
                    <Check
                      sx={{ color: main, cursor: "pointer" }}
                      onClick={() => setEditTwitter(false)}
                    />
                  </>
                )}
              </>
            ) : (
              <Box>
                {twitterUserName ? (
                  <Link
                    to={`https://twitter.com/${twitterUserName}`}
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      color={main}
                      fontWeight="500"
                      sx={{
                        "&:hover": {
                          color: palette.primary.main,
                          cursor: "pointer",
                        },
                      }}
                    >
                      {`@${twitterUserName}`}
                    </Typography>
                  </Link>
                ) : (
                  <Typography color={main} fontWeight="500">
                    Twitter
                  </Typography>
                )}
                <Typography color={medium}>Social Network</Typography>
              </Box>
            )}
          </FlexBetween>
          {editTwitter ? (
            <Close
              sx={{ color: "red", cursor: "pointer" }}
              onClick={() => {
                setEditTwitter(false);
                setTwitterUserName("");
              }}
            />
          ) : (
            <EditOutlined
              sx={{ color: main, cursor: "pointer" }}
              onClick={() => setEditTwitter(true)}
            />
          )}
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            {editLinkedIn ? (
              <>
                <TextField
                  placeholder="Linkedin Username"
                  type="text"
                  value={linkedinUsername}
                  onChange={(e) => setLinkedinUsername(e.target.value)}
                />
                {linkedinUsername && (
                  <>
                    <Check
                      sx={{ color: main, cursor: "pointer" }}
                      onClick={() => setEditLinkedIn(false)}
                    />
                  </>
                )}
              </>
            ) : (
              <Box>
                {linkedinUsername ? (
                  <Link
                    to={`https://www.linkedin.com/in/${linkedinUsername}/`}
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      color={main}
                      fontWeight="500"
                      sx={{
                        "&:hover": {
                          color: palette.primary.main,
                          cursor: "pointer",
                        },
                      }}
                    >
                      {`@${linkedinUsername}`}
                    </Typography>
                  </Link>
                ) : (
                  <Typography color={main} fontWeight="500">
                    Linkedin
                  </Typography>
                )}
                <Typography color={medium}>Network Platform</Typography>
              </Box>
            )}
          </FlexBetween>
          {editLinkedIn ? (
            <Close
              sx={{ color: "red", cursor: "pointer" }}
              onClick={() => setEditLinkedIn(false)}
            />
          ) : (
            <EditOutlined
              sx={{ color: main, cursor: "pointer" }}
              onClick={() => setEditLinkedIn(true)}
            />
          )}
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
