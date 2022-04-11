import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import AppContext from "../store/context";
import { Star } from "../static/image";

const MovieDetails = () => {
  const ctx = useContext(AppContext);
  const [details, setDetails] = useState({});
  const id = useParams().id;

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
      )
      .then((res) => {
        setDetails(res.data);
      });
    document.title = `${details.original_title} - M.Flix`;
  }, [details.original_title, id]);

  return (
    <div
      className=" text-white"
      style={{
        backgroundImage: `linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.95) 0%,
          rgba(0, 0, 0, 0.4) 55%,
          rgba(0, 0, 0, 0.9) 100%
          ),
          url(https://image.tmdb.org/t/p/w1280${details.backdrop_path})`,
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "calc(100vh - 4.25rem)",
      }}
    >
      <div className="p-2 text-center">
        {ctx.loggedIn && (
          <Link
            to="/movieflix/search"
            className="px-2 py-1 rounded-md bg-slate-500 text-white transition ease-in-out hover:bg-slate-600/70"
          >
            Back to Search
          </Link>
        )}
      </div>
      <div className="flex justify-center md:justify-start gap-6 flex-wrap">
        <div className="flex justify-end md:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w200${details.poster_path}`}
            alt="poster"
          />
        </div>
        <div className="flex flex-col justify-between">
          <h1 className="flex gap-1 justify-center sm:justify-start">
            <img src={Star} alt="rating" className="w-5" />
            {details.vote_average}
          </h1>
          <div className="text-center md:text-left p-6 md:p-1">
            <h1 className="text-5xl">{details.original_title}</h1>
            <ul className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
              {details.genres &&
                details.genres.map((gen) => {
                  return (
                    <li
                      key={gen.id}
                      className=" bg-black/50 px-2 py-1 rounded-lg "
                    >
                      {gen.name}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center p-4 gap-3 bg-black/50">
        {ctx.loggedIn && (
          <>
            {ctx.list.find((movie) => movie.id === details.id) ? (
              <button
                onClick={() => ctx.deleteMovie(details.id)}
                className=" bg-red-500 px-2 py-1 rounded-lg transition ease-in-out hover:bg-red-700/70"
              >
                Remove from list
              </button>
            ) : (
              <button
                onClick={() => ctx.addMovie(details.id, details.original_title)}
                className=" bg-red-500 px-2 py-1 rounded-lg transition ease-in-out hover:bg-red-700/70"
              >
                Add to list
              </button>
            )}
          </>
        )}
        <h1 className="text-2xl">Plot</h1>
        <p className="text-lg md:max-w-prose">{details.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
