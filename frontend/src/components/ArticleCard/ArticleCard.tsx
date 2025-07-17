import { IconBookmark, IconHeart, IconShare } from "@tabler/icons-react";
import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Group,
  Image,
  Text,
  useMantineTheme,
  Box,
} from "@mantine/core";
import classes from "./ArticleCard.module.css";
import { ArticleCardProps } from "@/types/ArticleCardProps";

export function ArticleCard({
  post,
  image = "https://source.unsplash.com/random/800x600?post",
  badges = [post.status],
  author = {
    name: "Unknown Author",
    avatar: "https://www.gravatar.com/avatar?d=mp",
  },
  postedAt = "Some time ago",
}: ArticleCardProps) {
  const theme = useMantineTheme();

  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      {image && (
        <Card.Section mb="sm">
          <Image src={image} alt={post.title} height={180} />
        </Card.Section>
      )}

      <Group gap="xs" mt={image ? "sm" : "xs"}>
        {badges.map((badge, index) => (
          <Badge key={index} w="fit-content" variant="light">
            {badge}
          </Badge>
        ))}
      </Group>

      <Text fw={700} className={classes.title} mt="xs">
        {post.title}
      </Text>

      <Box mt="md" className={classes.content}>
        <Text lineClamp={3}>{post.content}</Text>
      </Box>

      <Group mt="lg">
        <Avatar src={author.avatar} radius="sm" />
        <div>
          <Text fw={500}>{author.name}</Text>
          <Text fz="xs" c="dimmed">
            {postedAt}
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.footer}>
        <Group justify="space-between">
          <Text fz="xs" c="dimmed">
            {post.likesCount} people liked this
          </Text>
          <Group gap={0}>
            <ActionIcon variant="subtle" color="gray">
              <IconHeart size={20} color={theme.colors.red[6]} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray">
              <IconBookmark
                size={20}
                color={theme.colors.yellow[6]}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray">
              <IconShare size={20} color={theme.colors.blue[6]} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}
