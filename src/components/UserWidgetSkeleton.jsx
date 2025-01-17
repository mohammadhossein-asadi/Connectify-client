import { Box, Skeleton } from "@mui/material";
import WidgetWrapper from "./WidgetWrapper";

const UserWidgetSkeleton = () => {
  return (
    <WidgetWrapper>
      <Box display="flex" alignItems="center" gap="1rem" mb="1.5rem">
        <Skeleton variant="circular" width={70} height={70} />
        <Box flex="1">
          <Skeleton variant="text" width="60%" height={32} />
          <Skeleton variant="text" width="40%" height={25} />
        </Box>
      </Box>
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <Skeleton variant="text" width="60%" height={24} />
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <Skeleton variant="text" width="60%" height={24} />
        </Box>
      </Box>
      <Box p="1rem 0">
        <Skeleton variant="text" width="40%" height={24} mb={1} />
        <Skeleton variant="text" width="60%" height={24} />
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidgetSkeleton;
