import { Box } from "@mui/material";
import PropTypes from "prop-types";

const UserImage = ({ image, size = "60px", isExternalImage = false }) => {
  const defaultAvatar = "https://picsum.photos/seed/default/200"; // Consistent default avatar

  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={
          image
            ? isExternalImage
              ? image
              : `${import.meta.env.VITE_APP_BASE_URL}/assets/${image}`
            : defaultAvatar
        }
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop
          e.target.src = defaultAvatar;
        }}
      />
    </Box>
  );
};

UserImage.propTypes = {
  image: PropTypes.string,
  size: PropTypes.string,
  isExternalImage: PropTypes.bool,
};

export default UserImage;
