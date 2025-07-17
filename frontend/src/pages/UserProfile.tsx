import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ArticleCard } from "@/components/ArticleCard/ArticleCard";
import { HStack, Image, VStack, Text, SimpleGrid, Tabs, Box, Stack } from "@chakra-ui/react";
import { LuActivity, LuHeart } from "react-icons/lu";
import { UserProfileInfo } from "@/types/UserProfileInfo";

export function UserProfile() {
  const { userId } = useParams(); 
  const [userProfileInfo, setUserProfileInfo] = useState<UserProfileInfo | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getUserProfile/${userId}`);
        setUserProfileInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    if (userId) {
      fetchUserProfile(); // 🔄 Run when userId is ready
    }
  }, [userId]);

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
              <Text fontWeight="normal">{userProfileInfo.numOfFollowing}</Text>
              <Text fontWeight="medium">Following</Text>
            </VStack>
            <VStack alignItems="flex-start" gap={0}>
              <Text fontWeight="normal">{userProfileInfo.numOfFollowers}</Text>
              <Text fontWeight="medium">Followers</Text>
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
        <Tabs.Root defaultValue="Posts" variant="outline" width={"700px"}>
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
                    // image={post.imageUrl} // optional
                    badges={[post.status]} // optional
                    author={{ name: userProfileInfo.firstName + " " + userProfileInfo.lastName
                      , avatar:  "https://www.gravatar.com/avatar?d=mp" }} // optional
                    // postedAt={post.createdAt} // optional
                  />
                ))
              }
            </Stack>
          </Tabs.Content>

          <Tabs.Content value="Likes" width={"700px"}>
            <Stack gapY={"l"}>
              No likes to show.
            </Stack>
          </Tabs.Content>
        </Tabs.Root>
      </SimpleGrid>
    </VStack>
  );
}
