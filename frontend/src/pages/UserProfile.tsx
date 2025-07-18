import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArticleCard } from "@/components/ArticleCard/ArticleCard";
import { HStack, Image, VStack, Text, SimpleGrid, Tabs, Box, Stack } from "@chakra-ui/react";
import { LuActivity, LuHeart } from "react-icons/lu";
import { UserProfileInfo } from "@/types/UserTypes";
import { userService } from "@/services/UsersService";
import { PostResponseDto } from "@/types/PostInfo";
import { postsService } from "@/services/PostsService";

export function UserProfile() {
  const { userId } = useParams(); 
  const [userProfileInfo, setUserProfileInfo] = useState<UserProfileInfo | null>(null);

  const [likedPosts, setLikedPosts] = useState<PostResponseDto[]>([]);
  const [isLikesLoading, setIsLikesLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Posts");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await userService.getUserProfile(Number(userId));
        console.log("posts length:", profileData.posts.length);
        setUserProfileInfo(profileData)
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  useEffect(() => {
    const fetchLikedPosts = async () => {
      if (activeTab === "Likes" && userId) {
        try {
          setIsLikesLoading(true);
          const likedPosts = await postsService.getUserLikedPosts(Number(userId));
          setLikedPosts(likedPosts);
        } catch (error) {
          console.error("Failed to fetch liked posts:", error);
        } finally {
          setIsLikesLoading(false);
        }
      }
    };

    fetchLikedPosts();
  }, [activeTab, userId]);


  if (!userProfileInfo) {
    return <Text>Loading profile...</Text>;
  }

  return (
    <VStack align={"flex-start"} padding={5} gap={5} width="820px">
      <HStack>
        <Image
          src="src/assets/Zewel.jpg"
          boxSize="140px"
          borderRadius="full"
          fit="cover"
          alt="User"
        />

        <VStack alignItems="flex-start">
          <VStack alignItems="flex-start" gap={0}>
            <Text fontWeight="medium">{userProfileInfo.firstName} {userProfileInfo.lastName}</Text>
            <Text fontWeight="normal">@{userProfileInfo.username}</Text>
          </VStack>
          <HStack gap={5}>
            <VStack alignItems="flex-start" gap={0}>
              <Link to={`/following/${userProfileInfo.username}/${userId}`}>
                <Text fontWeight="normal" _hover={{ textDecoration: "underline", cursor: "pointer" }}>
                  {userProfileInfo.numOfFollowing}
                </Text>
                <Text fontWeight="medium" _hover={{ textDecoration: "underline", cursor: "pointer" }}>
                  Following
                </Text>
              </Link>
            </VStack>
            <VStack alignItems="flex-start" gap={0}>
              <Link to={`/followers/${userProfileInfo.username}/${userId}`}>
                <Text fontWeight="normal" _hover={{ textDecoration: "underline", cursor: "pointer" }}>
                  {userProfileInfo.numOfFollowers}
                </Text>
                <Text fontWeight="medium" _hover={{ textDecoration: "underline", cursor: "pointer" }}>
                  Followers
                </Text>
              </Link>
            </VStack>
            <VStack alignItems="flex-start" gap={0}>
              <Text fontWeight="normal">{userProfileInfo.posts.length}</Text>
              <Text fontWeight="medium">Posts</Text>
            </VStack>
          </HStack>
        </VStack>
      </HStack>

      <Box paddingLeft={10}>
        Welcome to {userProfileInfo.firstName}'s profile!
      </Box>

      <SimpleGrid columns={2} gap="14" width="full">
        <Tabs.Root
          defaultValue="Posts"
          value={activeTab}
          onValueChange={(details) => setActiveTab(details.value)}
          variant="outline"
          width={"700px"}
        >
          <Tabs.List>
            <Tabs.Trigger value="Posts">
              <LuActivity fill="black" />
              Posts
            </Tabs.Trigger>
            <Tabs.Trigger value="Likes">
              <LuHeart fill="red"/>
              Likes
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="Posts" width={"700px"}>
            <Stack gapY={"l"}>
              {
                userProfileInfo.posts.map((post, index) => (
                  <ArticleCard
                    key={index}
                    post={post}
                    imageUrl={post.imageFileName ? postsService.getImageUrl(Number(userId), post.imageFileName) : undefined} // optional
                    badges={[post.status]} // optional
                    author={{ name: userProfileInfo.firstName + " " + userProfileInfo.lastName
                      , avatar:  "https://www.gravatar.com/avatar?d=mp" }}
                  />
                ))
              }
            </Stack>
          </Tabs.Content>

          <Tabs.Content value="Likes" width={"700px"}>
            <Stack gapY={"l"}>
              {isLikesLoading ? (
                <Text>Loading liked posts...</Text>
              ) : likedPosts.length === 0 ? (
                <Text>No likes to show.</Text>
              ) : (
                likedPosts.map((post, index) => (
                  <ArticleCard
                    key={index}
                    post={post}
                    imageUrl={post.imageFileName ? postsService.getImageUrl(Number(userId), post.imageFileName) : undefined} // optional
                    badges={[post.status]}
                    author={{ name: userProfileInfo.firstName + " " + userProfileInfo.lastName
                      , avatar:  "https://www.gravatar.com/avatar?d=mp" }}
                  />
                ))
              )}
            </Stack>
          </Tabs.Content>
        </Tabs.Root>
      </SimpleGrid>
    </VStack>
  );
}
