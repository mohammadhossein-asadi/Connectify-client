import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import PropTypes from "prop-types";

const Friend = ({
  friendId = "",
  name,
  subtitle,
  userPicturePath,
  isPublicView = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = user?.friends || [];
  const _id = user?._id;

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    if (!_id || !token) return;

    const response = await fetch(
      `https://connectify-dn5y.onrender.com/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
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
      {!isPublicView && (
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
  friendId: PropTypes.string,
  name: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  userPicturePath: PropTypes.string,
  isPublicView: PropTypes.bool,
};

Friend.defaultProps = {
  friendId: "",
  subtitle: "",
  userPicturePath: "",
  isPublicView: false,
};

export default Friend;
