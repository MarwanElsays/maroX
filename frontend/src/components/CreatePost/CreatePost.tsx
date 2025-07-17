import { Textarea } from "@chakra-ui/react"
import { rgba } from "@mantine/core";

export default function CreatePost() {
  return (
    <Textarea autoresize bgColor={rgba("#F6F9FE",1)} placeholder="What's happening?"/>
  );
}