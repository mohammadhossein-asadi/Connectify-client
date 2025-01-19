import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import PropTypes from "prop-types";

const Friend = ({
  friendId,
  name,
  subtitle,
  userPicturePath,
  isPublicView = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user) || {};
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user?.friends) || [];

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend =
    Array.isArray(friends) && friends.find((friend) => friend._id === friendId);

  const isSelf = friendId === _id;

  const patchFriend = async () => {
    if (!_id || !token) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/users/${_id}/${friendId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update friend status");
      }

      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error("Error updating friend status:", error);
    }
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage
          image={userPicturePath}
          isExternalImage={userPicturePath?.startsWith("http")}
        />
        <Box
          onClick={() => {
            if (!isPublicView) {
              navigate(`/profile/${friendId}`);
              navigate(0);
            }
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: !isPublicView ? palette.primary.light : "inherit",
                cursor: !isPublicView ? "pointer" : "default",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {!isPublicView && !isSelf && (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

Friend.propTypes = {
  friendId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  userPicturePath: PropTypes.string,
  isPublicView: PropTypes.bool,
};

export default Friend;
