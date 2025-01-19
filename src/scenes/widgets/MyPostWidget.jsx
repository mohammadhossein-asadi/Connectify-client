import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import LoadingDots from "components/LoadingDots";

const TARGET_WIDTH = 1200; // Standard social media width
const TARGET_HEIGHT = 630; // Standard social media height (1200/1.91 aspect ratio)
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB max upload size

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const [isPosting, setIsPosting] = useState(false);
  const [imageError, setImageError] = useState("");
  const imageRef = useRef(null);

  const processImage = async (file) => {
    setImageError("");

    if (file.size > MAX_IMAGE_SIZE) {
      setImageError("Image size should be less than 10MB");
      return null;
    }

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        let x = 0;
        let y = 0;

        // Calculate dimensions maintaining aspect ratio
        if (width / height > TARGET_WIDTH / TARGET_HEIGHT) {
          // Image is wider than target ratio
          width = (height * TARGET_WIDTH) / TARGET_HEIGHT;
          x = (img.width - width) / 2;
        } else {
          // Image is taller than target ratio
          height = (width * TARGET_HEIGHT) / TARGET_WIDTH;
          y = (img.height - height) / 2;
        }

        canvas.width = TARGET_WIDTH;
        canvas.height = TARGET_HEIGHT;

        const ctx = canvas.getContext("2d");
        // Fill with white background to prevent transparency
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw image centered
        ctx.drawImage(
          img,
          x,
          y,
          width,
          height,
          0,
          0,
          TARGET_WIDTH,
          TARGET_HEIGHT
        );

        canvas.toBlob(
          (blob) => {
            resolve(new File([blob], file.name, { type: "image/jpeg" }));
          },
          "image/jpeg",
          0.9
        );
      };

      img.onerror = () => {
        setImageError("Failed to load image");
        resolve(null);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const processedImage = await processImage(file);
    if (processedImage) {
      setImage(processedImage);
      setIsImage(true);
    }
  };

  const handlePost = async () => {
    if (!post.trim()) {
      return;
    }

    setIsPosting(true);
    try {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", post.trim());
      if (image) {
        formData.append("picture", image);
        formData.append("picturePath", image.name);
      }

      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/posts`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to create post");

      const posts = await response.json();
      dispatch(setPosts({ posts }));
      setImage(null);
      setPost("");
      setIsImage(false);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius={"5px"}
          mt={"1rem"}
          p={"1rem"}
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={handleDrop}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      {imageError && (
        <Typography color="error" sx={{ mt: 1 }}>
          {imageError}
        </Typography>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween
          gap={"0.25rem"}
          color={mediumMain}
          sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          onClick={() => setIsImage(!isImage)}
        >
          <ImageOutlined />
          <Typography
            color={mediumMain}
            sx={{
              "&:hover": { cursor: "pointer", color: medium },
            }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween
              gap={"0.25rem"}
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              <GifBoxOutlined />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween
              gap={"0.25rem"}
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              <AttachFileOutlined />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween
              gap={"0.25rem"}
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              <MicOutlined />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap={"0.25rem"}>
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={(!post && !image) || isPosting}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          {isPosting ? <LoadingDots color={palette.background.alt} /> : "POST"}
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
