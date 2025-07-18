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
  imageUrl,
  badges = [post.status],
  author = {
    name: "Unknown Author",
    avatar: "https://www.gravatar.com/avatar?d=mp",
  }
}: ArticleCardProps) {
  const theme = useMantineTheme();

  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      {post.imageFileName && (
        <Card.Section mb="sm">
          <Image src={imageUrl} alt={post.title} height={180} />
        </Card.Section>
      )}

      <Group gap="xs" mt={post.imageFileName ? "sm" : "xs"}>
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
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString()
              : ""}
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
