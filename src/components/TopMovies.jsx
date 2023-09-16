import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import IMDB from "../assets/icons/IMDB.svg";
import tomato from "../assets/icons/tomato.png";
import Favorite from "../assets/icons/Favorite.svg";

// flex flex-wrap flex-row gap-[calc((100vw-1192px)/3)]
// https://image.tmdb.org/t/p/w500/tmU7GeKVybMWFButWEGl2M4GeiP.jpg

const API_Read_Access_Token = import.meta.env.VITE_API_Read_Access_Token;
const API_Key = import.meta.env.VITE_API_KEY;

const TopMovies = () => {
  const [topTenMovies, setTopTenMovies] = useState([]);
  const fetchTopMovies = async () => {
    const headers = {
      accept: "application/json",
      // Authorization: `Bearer ${VITE_API_Read_Access_Token}`,
      Authorization: `Bearer ${API_Read_Access_Token}`,
    };
    try {
      const response = axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${API_Key}`,
        { headers }
      );

      const topMovieData = (await response).data;
      const top_ten_movie = topMovieData.results.slice(0, 10);

      setTopTenMovies(top_ten_movie);
      console.log(top_ten_movie);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchTopMovies();
  }, []);
  return (
    <section className="px-5 md:px-24 pt-[70px]">
      <h2 className="mb-11 text-4xl font-bold">Top Movies</h2>
      <div className="w-sceen mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 items-center gap-y-10 xl:gap-y-[99px] justify-between xl:gap-x-[calc((100vw-1192px)/3)]">
        {topTenMovies.map((movie, i) => (
          <Link
            to={`/movies/${movie.id}`}
            data-testid="movie-card"
            state={{
              title: movie.title,
              date: movie.release_date,
              runtime: movie.runtime,
              overview: movie.overview,
            }}
            key={i}
            className="w-[250px]"
          >
            <div data-testid="movie-poster" className="bg-black h-[370px]">
              <img
                className=""
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <p
              data-testid="movie-release-date"
              className="text-xs font-bold text-[#9CA3AF] my-3"
            >
              USA, {movie.release_date.toLocaleString("en-GB")} - Current
            </p>
            <h3
              data-testid="movie-title"
              className="text-lg font-bold text-[#111827]"
            >
              {movie.title}
            </h3>
            <div className="text-xs my-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src={IMDB} alt="IMDB Svg" />
                <p className="">{movie.vote_average * 10}.0 / 100</p>
              </div>
              <div className="flex items-center gap-2.5">
                <img src={tomato} alt="Tomato" />
                <p className="">{movie.vote_average * 10}%</p>
              </div>
            </div>
            <p className="text-xs font-bold text-[#9CA3AF]">
              Action, Adventure, Horror
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopMovies;