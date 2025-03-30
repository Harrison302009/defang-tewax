import { Button, Dropdown, Menu, MenuButton, MenuItem, Stack, Typography } from "@mui/joy";
import { useState } from "react";

export default function NavBar() {
    const [hovered, setHovered] = useState(false);
    return (
        <Stack sx={{display: "flex", position: "relative", width: "100%", height: "4%", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 1}}>
            <Stack>
                <Button variant="plain" color="danger" sx={{transition: "0.3s ease-in-out"}}>Premium</Button>
            </Stack>
            <Stack>
            <Button variant="plain" color="danger" sx={{transition: "0.3s ease-in-out"}}>Discover</Button>
            </Stack>
            <br />
            <Stack>
            <Dropdown open={hovered}>
                <MenuButton onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)}>Security</MenuButton>
                <Menu sx={{display: "grid", gridTemplateColumns: "repeat(2, 230px)"}} color="danger" variant="soft" onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)}>
                    <MenuItem orientation="vertical">Terms of Use</MenuItem>
                    <MenuItem orientation="vertical">Privacy Policy</MenuItem>
                    <MenuItem orientation="vertical">Parental Guidelines</MenuItem>
                    <MenuItem orientation="vertical">Safety News</MenuItem>
                </Menu>
            </Dropdown>
            </Stack>
        </Stack>
    )
}