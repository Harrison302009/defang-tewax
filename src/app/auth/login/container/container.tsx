"use client";
import { Box, Button, Input, Stack } from "@mui/joy";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginContainer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
      }}
    >
      <Stack sx={{display: "flex", position: "relative", width: "100%", height: "100%", alignItems: "center", justifyContent: "center"}}>
        <Stack sx={{display: "flex", position: "relative", backgroundColor: "rgba(71, 71, 71, 0.69)", width: 500, height: 500, alignItems: "center", justifyContent: "center"}}>
          <form action="">
            <Input
              placeholder="Email"
              variant="soft"
              color="primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <Button variant="soft" color="success" type="sumbit">Submit</Button>
          </form>
          <br />
          <Button variant="soft" onClick={() => signIn("github")}>SIGN IN WITH GITHUB</Button>
          <Button variant="soft" onClick={() => signIn("slack")}>SIGN IN WITH Slack</Button>
        </Stack>
      </Stack>
    </Box>
  );
}
