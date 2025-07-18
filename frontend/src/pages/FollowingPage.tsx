import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Text, VStack, Spinner } from "@chakra-ui/react";
import { userService } from "@/services/UsersService";
import { UserInteractionDto } from "@/types/Interactions";
import UsersList from "@/components/UsersList";

export function FollowingPage() {
  const { userName, userId } = useParams();
  const [following, setFollowing] = useState<UserInteractionDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await userService.getFollowing(Number(userId));
        setFollowing(response);
      } catch (error) {
        console.error("Failed to fetch following:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchFollowing();
    }
  }, [userId]);

  if (loading) return <Spinner size="lg" color="blue.500" />;

  return (
    <VStack align="start" p={5} gap={2}>
      <Text fontSize="2xl" fontWeight="bold">
        {userName}'s Following
      </Text>

      {following.length === 0 ? (
        <Text>{userName} doesn't Follow anyone</Text>
      ) : (
        <UsersList usersInfo={following} />
      )}
    </VStack>
  );
}
