import { Box, Stack, Typography } from "@mui/joy";
import Image from "next/image";

export default function Layers({image, title, description}: {image: string; title: string; description: string}) {
  return (
    <Stack
      sx={{
        display: "flex",
        position: "relative",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          position: "relative",
          width: "80%",
          backgroundColor: "rgb(45,3,3)",
          backdropFilter: "blur(5px)",
          flexDirection: "row",
          borderRadius: 30,
        }}
      >
        <Stack
          sx={{
            display: "flex",
            position: "relative",
            width: "45%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={image}
            alt="p2p proof"
            height={500}
            width={400}
            style={{ borderRadius: 30 }}
          ></Image>
        </Stack>
        <Stack
          sx={{
            display: "flex",
            position: "relative",
            width: "55%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack>
          <Typography variant="plain" level="h1">
            {title}
          </Typography>
          <br />
          <Typography variant="plain" level="h3">
            {description}
          </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
