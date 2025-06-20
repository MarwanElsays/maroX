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

export interface ArticleCardProps {
  image?: string; // Made optional
  title: string;
  content: string; // Added content prop
  badges: string[];
  author: {
    name: string;
    avatar: string;
  };
  postedAt: string;
  likes: number;
}

export function ArticleCard({
  image,
  title,
  content,
  badges,
  author,
  postedAt,
  likes,
}: ArticleCardProps) {
  const theme = useMantineTheme();

  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      {image && (
        <Card.Section mb="sm">
          <Image src={image} alt={title} height={180} />
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
        {title}
      </Text>

      {content && (
        <Box mt="md" className={classes.content}>
          <Text lineClamp={3}>
            {content}
          </Text>
        </Box>
      )}

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
            {likes} people liked this
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