import { useEffect, useState } from 'react';
import { Container, Stack, Text, Loader, Center } from '@mantine/core';
import { Spacer } from '@chakra-ui/react';
import ArticleCard from '../components/ArticleCard/ArticleCard';
import CreatePost from '@/components/CreatePost/CreatePost';
import { PostResponseDto } from '@/types/PostInfo';
import { usePostsService } from '@/services/PostsService';

export default function TimelinePage() {
  const [posts, setPosts] = useState<PostResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { getAllPosts, getImageUrl } = usePostsService(); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        console.log('posts number:', data);
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false);
      }
    };

   // fetchPosts();
    
  }, []);

  return (
    <Container size="sm" py="xl">
      <Text size="32px" fw={700} ta="center" mb="xl">
        MaroX
      </Text>
      <CreatePost />
      <Spacer h={7} />

      {loading ? (
        <Center mt="xl">
          <Loader />
        </Center>
      ) : (
        <Stack gap="l">
          {posts.map((post, index) => (
            <ArticleCard 
            key={index}
            post={post} 
            imageUrl={post.imageFileName ? getImageUrl(post.authorInfo.userId, post.imageFileName) : undefined} // optional
            badges={[post.status]}
            avatar='https://www.gravatar.com/avatar?d=mp' // default avatar
            />
          ))}
        </Stack>
      )}
    </Container>
  );
}
