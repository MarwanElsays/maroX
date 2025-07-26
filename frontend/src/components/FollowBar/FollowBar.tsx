import { usersToFollow } from "@/data/UsersToFollowData";
import { Avatar, Button, HStack, Stack, Text, Box } from "@chakra-ui/react";
import styles from "./FollowBar.module.css";
import { Link } from "react-router-dom";

export default function FollowBar() {
  return (
    <Box className={styles.container} borderRadius={"lg"}>
      <Stack
        gap="3"
        p="4"
        borderRadius="md"
      >
        <Text fontWeight="bold" fontSize={20} color={"#FFFFFF"}>
          Who to follow
        </Text>
        {usersToFollow.map((user) => (
          <HStack key={user.email} className={styles.followItem}>
            <HStack className={styles.userInfo}>
              <Link to={`/profile/${user.id}`}>
                <Avatar.Root>
                  <Avatar.Fallback name={user.name} />
                  <Avatar.Image src={user.avatar} />
                </Avatar.Root>
              </Link>
              <Stack className={styles.textContainer}>
                <Link to={`/profile/${user.id}`}>
                  <Text textStyle="sm" fontWeight="bold">
                    {user.name}
                  </Text>
                </Link>
                <Text textStyle="sm">
                  {user.email}
                </Text>
              </Stack>
            </HStack>
            
            <Button
              className={styles.followButton}
              size="sm"
              borderRadius={"lg"}
              onClick={() => alert(`Followed ${user.name}`)}
            >
              Follow
            </Button>
          </HStack>
        ))}
      </Stack>
    </Box>
  );
}