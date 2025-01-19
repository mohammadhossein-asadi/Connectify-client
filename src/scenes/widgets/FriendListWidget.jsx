import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../state";
import PropTypes from "prop-types";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user?.friends) || [];
  const [error, setError] = useState(null);

  const getFriends = async () => {
    if (!userId || !token) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/users/${userId}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch friends");
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        dispatch(setFriends({ friends: data }));
      } else {
        throw new Error("Invalid friends data received");
      }
    } catch (error) {
      console.error("Error fetching friends:", error);
      setError("Could not load friends list");
    }
  };

  useEffect(() => {
    getFriends();
  }, [userId, token]); // Added token as dependency

  if (error) {
    return (
      <WidgetWrapper>
        <Typography color="error">{error}</Typography>
      </WidgetWrapper>
    );
  }

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      {Array.isArray(friends) && friends.length > 0 ? (
        <Box display="flex" flexDirection="column" gap="1.5rem">
          {friends.map((friend) => {
            // Ensure all required props are present
            if (!friend?._id) return null;

            return (
              <Friend
                key={friend._id} // Using just friend._id as it should be unique
                friendId={friend._id}
                name={
                  `${friend.firstName || ""} ${friend.lastName || ""}`.trim() ||
                  "Unknown User"
                }
                subtitle={friend.occupation || ""}
                userPicturePath={friend.picturePath || ""}
              />
            );
          })}
        </Box>
      ) : (
        <Typography color={palette.neutral.medium}>
          No friends yet. Start connecting with others!
        </Typography>
      )}
    </WidgetWrapper>
  );
};

FriendListWidget.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default FriendListWidget;
