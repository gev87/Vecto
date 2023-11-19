/* eslint-disable @next/next/no-img-element */
import React from "react";

import database from "@/database";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./styles.css";
import "swiper/css/navigation";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";


export default function Carusel({ selectMovie }) {
  const theme = useTheme();
  const lastSelectedMovieId = sessionStorage.getItem("movieId");
  const { TendingNow: trending } = database;
  let trandingMovies;
  if (lastSelectedMovieId) {
    let position;
    let lastSelectedMovie = trending.find((movie, index) => {
      if (movie.Id === lastSelectedMovieId) {
        position = index;
        return true;
      }
    });
    if (lastSelectedMovie) {
      trandingMovies = [
        lastSelectedMovie,
        ...trending.slice(0, position),
        ...trending.slice(position + 1),
      ];
    }
  } else {
    trandingMovies = trending.sort((a, b) => {
      const dateA = new Date(a.Date);
      const dateB = new Date(b.Date);
      return dateB - dateA;
    });
  }

  return (
    <div style={{ marginLeft: theme.spacing(7) }}>
      <Typography variant="h5" align="left" color="white" paragraph>
        Trending Now
      </Typography>

      <Swiper
        loop
        grabCursor
        slidesPerView={8}
        spaceBetween={10}
        scrollbar={{
          el: ".swiper-scrollbar",
          draggable: true,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1,
        }}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        {trandingMovies.slice(0, 50).map((movie) => {
          return (
            <SwiperSlide key={movie.Id}>
              <img
                onClick={() => selectMovie(movie)}
                alt="background"
                src={movie.CoverImage}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
