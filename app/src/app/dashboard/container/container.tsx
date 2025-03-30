"use client";
import { DeleteAllUsers } from "@/modules/delete-all-users/actions";
import {
  Box,
  Modal,
  ModalDialog,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemButton,
  Avatar,
  ModalClose,
  Button,
} from "@mui/joy";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  image: string;
};
export default function DashboardContainer() {
  const session = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [userInformation, setUserInformation] = useState({});
  const [view, setView] = useState(false);

  useEffect(() => {
    const FetchUsers = async () => {
      const APIContact = await fetch("/api/users", {
        method: "GET",
      });
      if (APIContact.ok) {
        const data: User[] = await APIContact.json();
        setUsers(data);
      }
    };
    const UserInterval = setInterval(() => {
      FetchUsers();
    }, 500);
    return () => clearInterval(UserInterval);
  }, []);
  const UserDelete = async () => {
    const APIContact = await fetch("/api/delete-all-users", {
      method: "DELETE",
    });
    if (APIContact.ok) {
      console.log("it is done");
    } else {
      console.error("Error deleting users");
    }
  }
  if (session.status === "loading") {
    return (
      <Modal open>
        <ModalDialog sx={{ visibility: "hidden" }}>
          <svg
            viewBox="0 0 120 120"
            style={{
              position: "fixed",
              height: 150,
              width: 150,
              transform: "translate(-50%, -50%)",
              top: "50%",
              left: "50%",
              visibility: "visible",
            }}
          >
            <g>
              <circle cx="60" cy="60" r="50" fill="#E0E0E0" />
              <circle cx="40" cy="50" r="10" fill="#90CAF9">
                <animate
                  attributeName="cy"
                  values="50;70;50"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="60" cy="50" r="10" fill="#64B5F6">
                <animate
                  attributeName="cy"
                  values="50;70;50"
                  dur="1.5s"
                  begin="0.3s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="80" cy="50" r="10" fill="#42A5F5">
                <animate
                  attributeName="cy"
                  values="50;70;50"
                  dur="1.5s"
                  begin="0.6s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </svg>
        </ModalDialog>
      </Modal>
    );
  }
  function timeAgo(postTime: string) {
    const now = new Date();
    const postDate = new Date(postTime); // Ensure postTime is parsed as a Date object

    if (isNaN(postDate.getTime())) {
      return "Invalid date"; // Handle invalid date gracefully
    }

    const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
    if (seconds < 1) {
      return "just now";
    } else if (seconds < 60) {
      return `${seconds}s ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes}m ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days}d ago`;
    }
  }
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 300,
          backgroundColor: "#f5f5f5",
          borderRight: "1px solid #ddd",
          padding: 2,
          overflowY: "auto",
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Image
            src={session.data?.user?.image || "/default-profile.png"}
            alt="GitHub Profile Picture"
            height={100}
            width={100}
            style={{ borderRadius: "50%" }}
          />
          <Typography level="h4">{session.data?.user?.name}</Typography>
        </Stack>
        <Typography
          level="title-md"
          sx={{ marginTop: 2, marginBottom: 1, color: "#888" }}
        >
          Contacts
        </Typography>
        <List>
          {["Alice", "Bob", "Charlie"].map((contact) => (
            <ListItem key={contact}>
              <ListItemButton onClick={() => UserDelete()}>
                <Typography level="h4">{contact}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Chat Area */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            padding: 2,
            borderBottom: "1px solid #ddd",
            backgroundColor: "#fff",
          }}
        >
          <Typography level="h4">Chat</Typography>
        </Box>
        <Modal open={view} onClose={() => setView(false)}>
          <ModalDialog>
          <ModalClose />
            <Stack>
                <Avatar src={session.data?.user.image} size="lg" sx={{height: 130, width: 130}} />
                <Typography level="h2">{session.data?.user.name}</Typography>
                <Typography level="title-lg">{session.data?.user.description}</Typography>
                <Typography>
                {session.data?.user.createdAt ? timeAgo(`${session.data?.user.createdAt}`) : "Loading..."} {/* Ensure createdAt is valid */}
                </Typography>
            </Stack>
          </ModalDialog>
        </Modal>
        <Box
          sx={{
            flex: 1,
            padding: 2,
            overflowY: "auto",
            backgroundColor: "#fafafa",
          }}
        >
          <Typography level="title-md" sx={{ color: "#888" }}>
            Start a conversation by selecting a contact.
          </Typography>
          soko
          {users.map((user) => (
            <ListItem
              key={user.id}
              sx={{
                display: "flex",
                position: "relative",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <ListItemButton sx={{ gap: 0.5 }}>
                <Avatar src={session.data?.user.image} />
                <br />
                <Typography level="title-lg">{user.name}</Typography>
              </ListItemButton>
            </ListItem>
          ))}
          <Button variant="soft" onClick={() => DeleteAllUsers()}>DELETE ALL ACCOUNTS</Button>
        </Box>
        <Box
          sx={{
            padding: 2,
            borderTop: "1px solid #ddd",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "20px",
              outline: "none",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
