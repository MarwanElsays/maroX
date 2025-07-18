import { UserInteractionDto } from "@/types/Interactions";
import { Avatar, Box, HStack, Text} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const UsersList: React.FC<{ usersInfo: UserInteractionDto[] }> = ({ usersInfo }) => {

  return (
    <>
      {usersInfo.map((user) => (
        <Link to={`/profile/${user.userId}`} key={user.userId} style={{ width: "100%" }}>
          <HStack
            gap={4}
            p={3}
            borderWidth="1px"
            borderRadius="lg"
            width="800px"
            backgroundColor="blue.100"
            _hover={{ backgroundColor: "blue.200", cursor: "pointer" }}
          >
            <Avatar.Root>
              <Avatar.Fallback>{user.firstName[0]}</Avatar.Fallback>
              <Avatar.Image src={`https://www.gravatar.com/avatar?d=mp`} />
            </Avatar.Root>
            <Box>
              <Text fontWeight="medium" _hover={{ textDecoration: "underline" }}>
                {user.firstName} {user.lastName}
              </Text>
              <Text fontSize="sm" color="gray.500">
                @{user.username}
              </Text>
            </Box>
          </HStack>
        </Link>
      ))}

  </>
  );
};

export default UsersList;