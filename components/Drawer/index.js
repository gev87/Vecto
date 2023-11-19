import React, { useState } from "react";

import Image from "next/image";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";



const MyDrawer = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const drawerWidth = "20%";

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: `linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%)`,
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7), 
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
    background: `rgba(0, 0, 0, 0)`, 
  });

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    position: "fixed", 
    zIndex: 1200, 
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

 

  return (
    <Box onMouseOver={handleDrawerOpen} onMouseOut={handleDrawerClose}>
      <Drawer variant="permanent" open={open}>
        <Box justifyContent={"space-between"} display="flex" flexDirection="column">
        <List style={{ marginTop: theme.spacing(10) }}>
          {[
            "Search",
            "Home",
            "TV Shows",
            "Movies",
            "Genres",
            "Watch Later",
          ].map((text) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block", color: "white" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src={`/icons/${text}.png`}
                    alt={text}
                    width={24}
                    height={24}
                  />
                </ListItemIcon>
                {open && <ListItemText primary={text} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {open && (
          <List>
            {["LANGUAGE", "GET HELP", "EXIT"].map((text, index) => (
              <ListItem
                key={text}
                disablePadding
                sx={{ display: "block", color: "gray" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
        </Box>
      </Drawer>
    </Box>
  );
};
export default MyDrawer;
