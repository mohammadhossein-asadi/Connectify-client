import { Box, Skeleton } from "@mui/material";
import WidgetWrapper from "./WidgetWrapper";

const PostSkeleton = () => {
  return (
    <WidgetWrapper mb="2rem">
      <Box display="flex" alignItems="center" gap="1rem" mb="1rem">
        <Skeleton variant="circular" width={55} height={55} />
        <Box flex="1">
          <Skeleton variant="text" width="40%" height={24} />
          <Skeleton variant="text" width="20%" height={20} />
        </Box>
      </Box>
      <Skeleton variant="text" width="100%" height={20} />
      <Skeleton variant="text" width="80%" height={20} />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={300}
        sx={{ my: 2 }}
      />
      <Box display="flex" justifyContent="space-between" mt="0.25rem">
        <Skeleton variant="text" width="20%" height={30} />
        <Skeleton variant="text" width="20%" height={30} />
      </Box>
    </WidgetWrapper>
  );
};

export default PostSkeleton;
