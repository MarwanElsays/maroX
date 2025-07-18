import { useState, useRef, useCallback } from "react";
import { Box, Textarea, Input, Button, IconButton, Flex } from "@chakra-ui/react";
import { FiImage, FiX } from "react-icons/fi";
import Cropper from "react-easy-crop";
import { postsService } from "@/services/PostsService";
import { PostRequestDto } from "@/types/PostInfo";
import { toaster } from "../ui/toaster";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<CropArea | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageDataUrl = reader.result as string;

      const img = new Image();
      img.onload = () => {
        setAspectRatio(img.width / img.height);
        setImageSrc(imageDataUrl);
      };
      img.src = imageDataUrl;
    };

    reader.readAsDataURL(file);
  };


  const handleRemoveImage = () => {
    setImageSrc(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCropComplete = useCallback((_: unknown, croppedAreaPixels: CropArea) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const handleSubmit = async () => {
    if (!content && !imageSrc) return;
    setIsSubmitting(true);

    try {
      let imageFile: File | undefined;
      
      if (imageSrc && croppedArea) {
        const croppedBlob = await getCroppedImg(imageSrc, croppedArea);
        imageFile = new File([croppedBlob], 'post-image.jpg', { type: 'image/jpeg' });
      }

      const postData: PostRequestDto = {
        postId: 0,
        title,
        content,
        authorId: Number(localStorage.getItem("userId") || "0"),
        status: "PUBLISHED",
        imageFile,
      };

      await postsService.createPost(postData);
      
      toaster.success({
        title: "Post created successfully",
        duration: 3000,
        closable: true,
      });

      setTitle("");
      setContent("");
      handleRemoveImage();
    } catch (error) {
      toaster.error({
        title: "Failed to create post",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        duration: 3000,
        closable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box p={4} borderRadius="lg" bg="rgba(246, 249, 254, 1)" boxShadow="sm" width="100%" maxW="700px">
      <Input
        placeholder="Title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        mb={3}
        variant="flushed"
        fontSize="lg"
        fontWeight="semibold"
      />
      
      <Textarea
        placeholder="What's happening?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        resize="none"
        minH="120px"
        fontSize="md"
      />

      {imageSrc && (
        <Box mt={3} position="relative" height="300px" width="100%" borderRadius="md" overflow="hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            // aspect={aspectRatio} // dynamic aspect ratio
            aspect={1} // fallback to 1 if aspectRatio is undefined
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
            cropShape="rect"
            // cropSize={{ width: 250, height: 250 }}
            showGrid={true}
            style={{
              containerStyle: { width: "100%", height: "100%" },
              cropAreaStyle: { border: "2px solid white" },
            }}
          />
          <IconButton
            aria-label="Remove image"
            size="sm"
            position="absolute"
            top={2}
            right={2}
            onClick={handleRemoveImage}
            bg="blackAlpha.600"
            color="white"
            _hover={{ bg: "blackAlpha.800" }}
            zIndex={10}
          >
            <FiX />
          </IconButton>
        </Box>
      )}

      <Flex mt={3} justify="space-between" align="center">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          hidden
        />
        <IconButton
          aria-label="Upload image"
          onClick={() => fileInputRef.current?.click()}
          variant="ghost"
          colorScheme="blue"
        >
          <FiImage />
        </IconButton>

        <Button
          colorScheme="blue"
          borderRadius="full"
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={(!content && !imageSrc) || isSubmitting}
        >
          Post
        </Button>
      </Flex>
    </Box>
  );
}

type CropArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

async function getCroppedImg(imageSrc: string, pixelCrop: CropArea): Promise<Blob> {
  const image = new Image();
  image.src = imageSrc;
  
  await new Promise((resolve) => {
    image.onload = resolve;
  });

  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Could not get canvas context');

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Canvas is empty')), 'image/jpeg', 0.9);
  });
}