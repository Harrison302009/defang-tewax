"use client";
import Image from "next/image";
import { Box, Stack, Typography } from "@mui/joy";
import gsap from "gsap";
import { ScrambleTextPlugin, ScrollTrigger } from "gsap/all";
import { useEffect } from "react";
import Layers from "@/components/layers/layers";
import NavBar from "@/components/navbar/navbar";
import { useSession } from "next-auth/react";

export default function Home() {
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    gsap.to(".icon", {
      rotation: 360,
      opacity: 1,
      scrambleText: ".title",
    });
    gsap.to(".description", {
      color: "#fff",
      textShadow:
        " 0 0 2px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 35px #000, 0 0 50px #000, 0 0 75px #000, 0 0 100px #000",
      scrollTrigger: {
        trigger: ".description",
        toggleActions: "restart none none none",
        markers: true,
        start: "52% 25%",
        end: "70% 28%",
        scrub: true,
      },
    });
  }, []);
  const session = useSession();
  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "300vh",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          backgroundColor: "#000",
        }}
      >
        <NavBar />
        <Stack
          sx={{
            display: "flex",
            position: "relative",
            width: "100%",
            flexDirection: "row",
            backgroundColor: "#000",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              position: "relative",
              width: "40%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="plain"
              level="h1"
              className="title"
              sx={{ color: "#fff", fontSize: 50 }}
            >
              Matorex ({session.data?.user.name})
            </Typography>
            <br />
            <Typography
              variant="plain"
              level="h3"
              className="description"
            >
              Be Anywhere, Meet Somewhere
            </Typography>
          </Stack>
          <Stack
            sx={{
              display: "flex",
              position: "relative",
              width: "60%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack className="icon" sx={{ opacity: 0 }}>
              <Image
                src={"/matorexicon.png"}
                alt="icon"
                height={400}
                width={400}
              ></Image>
            </Stack>
          </Stack>
        </Stack>
        <Layers
          image="/p2p.png"
          title="Effortless P2P communication"
          description="Seamlessly connect and chat with friends, family, or colleagues in
            real time! This app empowers you with secure, fast, and intuitive
            peer-to-peer communication—no middleman, just pure connection."
        />
      </Stack>
    </Box>
  );
}
