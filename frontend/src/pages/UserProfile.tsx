import { ArticleCard } from "@/components/ArticleCard/ArticleCard";
import { timeLineData } from "@/data/TimeLineData";
import { HStack, Image, VStack,Text, SimpleGrid, Tabs, Box, Stack } from "@chakra-ui/react";
import { LuActivity, LuHeart} from "react-icons/lu";

export function UserProfile() {
  return (
    <VStack align={"flex-start"} padding={5} gap={5} width="820px">
      <HStack>
        <Image
          src="src\assets\Zewel.jpg"
          boxSize="140px"
          borderRadius="full"
          fit="cover"
          alt="Naruto Uzumaki"
        />

        <VStack alignItems="flex-start">
          <VStack alignItems="flex-start" gap={0}>
            <Text fontWeight="medium">Marwan Mostafa</Text>
            <Text fontWeight="normal">@Marwan_Mostafa</Text>
          </VStack>
          <HStack gap={5}>
            <VStack alignItems="flex-start" gap={0}>
              <Text fontWeight="normal">900</Text>
              <Text fontWeight="medium">Following</Text>
            </VStack>
            <VStack alignItems="flex-start" gap={0}>
              <Text fontWeight="normal">900</Text>
              <Text fontWeight="medium">Followers</Text>
            </VStack>
            <VStack alignItems="flex-start" gap={0}>
              <Text fontWeight="normal">9</Text>
              <Text fontWeight="medium">Posts</Text>
            </VStack>
          </HStack>
        </VStack>
      </HStack>

      <Box paddingLeft={10}>
        I will become the strongest ninja and protect my village!
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
                timeLineData.map((event, index) => (
                  <ArticleCard key={index} {...event} />
                ))
              }
            </Stack>
          </Tabs.Content>

          <Tabs.Content value="Likes" width={"700px"}>
            <Stack gapY={"l"}>
              {
                timeLineData.map((event, index) => (
                  <ArticleCard key={index} {...event} />
                ))
              }
            </Stack>
          </Tabs.Content>
          
        </Tabs.Root>
      </SimpleGrid>
    </VStack>
  );
}
