import { useEffect, useState } from "react";
import PostWidget from "./PostWidget";
import PostSkeleton from "components/PostSkeleton";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const WELCOME_POSTS = [
  {
    _id: "welcome1",
    userId: {
      _id: "connectify_team",
      firstName: "Connectify",
      lastName: "Team",
      picturePath:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500",
    },
    description:
      "Welcome to Connectify! 🌟 We're excited to have you here. Our platform is designed to help you connect, share, and engage with amazing people from around the world. Start exploring and sharing your story today!",
    location: "Global",
    picturePath:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200",
    likes: { user1: true, user2: true },
    comments: ["Excited to be here!", "Great platform!"],
  },
  {
    _id: "travel1",
    userId: {
      _id: "sarah_explorer",
      firstName: "Sarah",
      lastName: "Chen",
      picturePath:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500",
    },
    description:
      "Just witnessed the most breathtaking sunset in Bali! 🌅 The way the colors reflect off the ocean is pure magic. Sometimes the best moments are the unplanned ones. #TravelDiary #BaliLife",
    location: "Bali, Indonesia",
    picturePath:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200",
    likes: { user3: true, user4: true },
    comments: ["Paradise found! 😍", "The colors are incredible!"],
  },
  {
    _id: "fitness1",
    userId: {
      _id: "marcus_fit",
      firstName: "Marcus",
      lastName: "Johnson",
      picturePath:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500",
    },
    description:
      "Morning workout complete! 💪 Remember, fitness is not about being better than someone else, it's about being better than you used to be. Start your journey today! #FitnessMotivation #HealthyLifestyle",
    location: "Los Angeles, USA",
    picturePath:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200",
    likes: { user5: true, user6: true },
    comments: ["This is inspiring!", "Thanks for the motivation 🏃‍♂️"],
  },
  {
    _id: "art1",
    userId: {
      _id: "emma_artist",
      firstName: "Emma",
      lastName: "Garcia",
      picturePath:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500",
    },
    description:
      "Latest artwork finished! 🎨 Exploring the intersection of nature and urban life through watercolors. Art has the power to bridge worlds and tell stories. What story do you see? #ArtistOnSocial #Watercolor",
    location: "Barcelona, Spain",
    picturePath:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200",
    likes: { user7: true, user8: true },
    comments: ["Beautiful work!", "The colors are amazing 😍"],
  },
  {
    _id: "food1",
    userId: {
      _id: "chef_david",
      firstName: "David",
      lastName: "Kim",
      picturePath:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500",
    },
    description:
      "Sunday brunch done right! 🍳 Homemade avocado toast with poached eggs and microgreens. Food tastes better when shared with friends. #BrunchGoals #FoodLover",
    location: "Melbourne, Australia",
    picturePath:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1200",
    likes: { user9: true, user10: true },
    comments: ["Looks delicious!", "Recipe please! 🙏"],
  },
  {
    _id: "music1",
    userId: {
      _id: "lisa_musician",
      firstName: "Lisa",
      lastName: "Taylor",
      picturePath:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500",
    },
    description:
      "Music is the universal language of mankind 🎵 Just finished recording a new acoustic cover. Can't wait to share it with you all! #MusicLife #AcousticCover",
    location: "London, UK",
    picturePath:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200",
    likes: { user11: true, user12: true },
    comments: ["Beautiful setup!", "Can't wait to hear it 🎸"],
  },
  {
    _id: "nature1",
    userId: {
      _id: "alex_nature",
      firstName: "Alex",
      lastName: "Rivera",
      picturePath:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
    },
    description:
      "Found this hidden waterfall after a 3-hour hike! 🏞️ Nature never ceases to amaze me. Sometimes you have to get lost to find the most beautiful places. #NatureLover #Hiking",
    location: "Costa Rica",
    picturePath:
      "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200",
    likes: { user13: true, user14: true },
    comments: ["Paradise! 😍", "Adding this to my bucket list!"],
  },
  {
    _id: "tech1",
    userId: {
      _id: "maya_tech",
      firstName: "Maya",
      lastName: "Patel",
      picturePath:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=500",
    },
    description:
      "Just launched my first AI project! 🚀 Technology has the power to make our lives better. Excited to share more about this journey. #TechInnovation #AI",
    location: "Singapore",
    picturePath:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200",
    likes: { user15: true, user16: true },
    comments: ["This is amazing!", "Future is here 🤖"],
  },
];

const PublicPostsWidget = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <>
        {[1, 2].map((n) => (
          <PostSkeleton key={n} />
        ))}
      </>
    );
  }

  return (
    <>
      {WELCOME_POSTS.map(
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
            postUserId={userId._id}
            name={`${userId.firstName} ${userId.lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userId.picturePath}
            likes={likes}
            comments={comments}
            isPublicView={true}
          />
        )
      )}
    </>
  );
};

export default PublicPostsWidget;
