import { ArticleCard } from '../components/ArticleCard/ArticleCard';
import { Container, Stack, Text } from '@mantine/core';
import { timeLineData } from '../data/TimeLineData';
import CreatePost from '@/components/CreatePost/CreatePost';
import { Spacer } from '@chakra-ui/react';

export default function TimelinePage() {
  return (
    <Container size="sm" py="xl">
      <Text size="32px" fw={700} ta="center" mb="xl">
        MaroX
      </Text>
      <CreatePost/>
      <Spacer h={7}/>
      <Stack gap="l">
        {timeLineData.map((event, index) => (
          <ArticleCard key={index} {...event} />
        ))}
      </Stack>
    </Container>
  );
}
