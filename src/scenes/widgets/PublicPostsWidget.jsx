import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";
import PostSkeleton from "components/PostSkeleton";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const WELCOME_POSTS = [
  {
    _id: "welcome1",
    userId: {
      _id: "guest",
      firstName: "Connectify",
      lastName: "Team",
      picturePath: "",
    },
    description: "Welcome to Connectify! Join our community to:",
    location: "Global",
    picturePath: "",
    likes: {},
    comments: [],
  },
  {
    _id: "welcome2",
    userId: {
      _id: "guest",
      firstName: "Connectify",
      lastName: "Features",
      picturePath: "",
    },
    description:
      "✨ Share your stories\n🤝 Connect with friends\n💬 Engage in discussions\n❤️ Like and comment on posts",
    location: "Features",
    picturePath: "",
    likes: {},
    comments: [],
  },
  {
    _id: "nature1",
    userId: {
      _id: "nature_enthusiast",
      firstName: "Sarah",
      lastName: "Parker",
      picturePath: "https://picsum.photos/seed/sarah/200",
    },
    description:
      "Just witnessed this breathtaking sunset at Yosemite National Park! 🌅 Nature's beauty never fails to amaze me. Who else loves chasing sunsets? #NaturePhotography #Wanderlust",
    location: "Yosemite, CA",
    picturePath: "https://picsum.photos/seed/sunset/800/600",
    likes: { user1: true, user2: true, user3: true },
    comments: ["Stunning view! 😍", "This is absolutely magical!"],
  },
  {
    _id: "tech1",
    userId: {
      _id: "tech_lover",
      firstName: "Alex",
      lastName: "Chen",
      picturePath: "https://picsum.photos/seed/alex/200",
    },
    description:
      "Just got my hands on the latest Tesla Model S Plaid! The future of automotive technology is here. Zero to 60 in under 2 seconds is absolutely mind-blowing! 🚗⚡ #TeslaLife #ElectricVehicles",
    location: "Silicon Valley",
    picturePath: "https://picsum.photos/seed/tesla/800/600",
    likes: { user4: true, user5: true },
    comments: ["Dream car! 🔥", "Congratulations! Those specs are incredible"],
  },
  {
    _id: "travel1",
    userId: {
      _id: "wanderlust",
      firstName: "Emma",
      lastName: "Wilson",
      picturePath: "https://picsum.photos/seed/emma/200",
    },
    description:
      "Lost in the magical streets of Santorini 🇬🇷 The white buildings, blue domes, and stunning sea views make this place feel like a dream. Who's been here? Share your favorite spots! #TravelDreams #Greece",
    location: "Santorini, Greece",
    picturePath: "https://picsum.photos/seed/santorini/800/600",
    likes: { user7: true, user8: true, user9: true, user10: true },
    comments: [
      "Paradise on Earth! 🌊",
      "The colors are incredible!",
      "Adding this to my bucket list ✈️",
    ],
  },
];

const PublicPostsWidget = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.posts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/posts`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        // Show welcome content when posts can't be fetched
        dispatch(setPosts({ posts: WELCOME_POSTS }));
        return;
      }

      const data = await response.json();
      if (!data || data.length === 0) {
        setError("No posts available at the moment. Be the first to share!");
      } else {
        dispatch(setPosts({ posts: data }));
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      // Don't show error to user, show welcome content instead
      dispatch(setPosts({ posts: WELCOME_POSTS }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <>
        {[1, 2].map((n) => (
          <PostSkeleton key={n} />
        ))}
      </>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" p={3}>
        <Typography variant="h6" gutterBottom>
          {error}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/register")}
          sx={{ mt: 2 }}
        >
          Join Now
        </Button>
      </Box>
    );
  }

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          description,
          location,
          picturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId._id || "guest"}
            name={`${userId?.firstName || "Guest"} ${
              userId?.lastName || "User"
            }`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userId?.picturePath || ""}
            likes={likes || {}}
            comments={comments || []}
            isPublicView={true}
          />
        )
      )}
    </>
  );
};

export default PublicPostsWidget;
