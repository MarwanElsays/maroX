import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Text, VStack, Spinner } from "@chakra-ui/react";
import { UserInteractionDto } from "@/types/Interactions";
import UsersList from "@/components/UsersList";
import { useUsersService } from "@/services/UsersService";

export function FollowersPage() {
  const { userName, userId } = useParams();
  const [followers, setFollowers] = useState<UserInteractionDto[]>([]);
  const [loading, setLoading] = useState(true);
  const {getFollowers} = useUsersService();

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await getFollowers(Number(userId));
        setFollowers(response);
      } catch (error) {
        console.error("Failed to fetch followers:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchFollowers();
    }
  }, [userId]);

  if (loading) return <Spinner size="lg" color="blue.500" />;

  return (
    <VStack align="start" p={5} gap={2}>
      <Text fontSize="2xl" fontWeight="bold">
        {userName}'s Followers
      </Text>

      {followers.length === 0 ? (
        <Text>No followers found.</Text>
      ) : (
        <UsersList usersInfo={followers} />
      )}
    </VStack>
  );
}
