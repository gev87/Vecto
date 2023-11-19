"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";

import Carusel from "@/components/Carusel";
import MyDrawer from "@/components/Drawer";
import database from "@/database";

import { useTheme } from "@mui/material/styles";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import ReactPlayer from "react-player";

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);
  const theme = useTheme();
  const [playVideo, setPlayVideo] = useState(false);
  const { Featured: featuredMovie } = database;
  const [featured, setFeatured] = useState(featuredMovie);
  const durationByMinutes = Math.trunc(featured.Duration / 60);
  const hours = Math.trunc(durationByMinutes / 60);
  const minutes = durationByMinutes - hours * 60;
  const shortInfo = `${featured.ReleaseYear} ${featured.MpaRating} ${hours}h ${minutes}m`;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  const handleMovieSelect = (movie) => {
    setFeatured(movie);
    setTimeout(setPlayVideo, "2000", true);
    sessionStorage.setItem("movieId", movie.Id);
  };

  return (
    <Box
      component="main"
      style={{
        backgroundImage: playVideo ? "" : `url(/${featured.CoverImage})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
        position: "relative",
      }}
    >
      <Box width="100%" height="60%">
        <Box display="flex">
          <CssBaseline />
          <MyDrawer />
          <Box
            component="main"
            sx={{
              p: 3,
              color: "white",
              width: "40%",
              marginLeft: theme.spacing(7),
              marginTop: theme.spacing(2),
            }}
          >
            <Typography
              variant="button"
              sx={{ color: "gray", fontSize: "2rem" }}
            >
              {featured.Category}
            </Typography>
            <Image
              src={`/FeaturedTitleImage.png`}
              alt="featuredImage"
              width={683}
              height={84}
            />
            <Typography mb={3} variant="h6">
              {shortInfo}
            </Typography>
            <Typography paragraph>{featured.Description}</Typography>
            <Box display="flex" mt={1}>
              <Button
                variant="contained"
                style={{
                  background: "white",
                  color: "black",
                  marginRight: theme.spacing(1),
                  borderRadius: theme.spacing(3),
                }}
              >
                <PlayArrowIcon />
                Play
              </Button>
              <Button
                variant="contained"
                style={{ borderRadius: theme.spacing(3) }}
              >
                More Info
              </Button>
            </Box>
          </Box>
        </Box>
        {isClient && playVideo && (
          <ReactPlayer
            url={featured.VideoUrl}
            playing
            width="100%"
            height="98%"
            style={{ position: "absolute", top: 0, left: 0, zIndex: 10000 }}
            onEnded={() => {
              setPlayVideo(false);
            }}
          />
        )}
      </Box>
      {isClient && <Carusel selectMovie={handleMovieSelect} />}
    </Box>
  );
}
