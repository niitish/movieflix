import axios from "axios";
import { Link } from "react-router-dom";
import { Plus, Minus, Star } from "../static/image/";
import { useContext, useState, useEffect } from "react";
import AppContext from "../store/context";

const Search = () => {
  const ctx = useContext(AppContext);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const listAddHandler = (id, title) => {
    if (!ctx.list.find((item) => item.id === id)) ctx.addMovie(id, title);
    else ctx.deleteMovie(id);
  };

  useEffect(() => {
    document.title = "Search - M.Flix";

    const urlPop = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&sort_by=popularity.desc&page=1`;
    const urlSearch = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&query=${query}`;

    const url = query ? urlSearch : urlPop;

    const timer = setTimeout(() => {
      axios.get(url).then((res) => {
        setResults(res.data.results);
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  return (
    <div className="mycontainer">
      <div className="text-center">
        <h1 className="text-3xl">Search for Movies</h1>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          name="search"
          id="search"
          placeholder="Enter a title"
          className=" max-w-screen-sm w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-2 p-1.5"
        />
      </div>
      <ul className="flex flex-wrap gap-6 mt-6 justify-center">
        {results.length === 0 && (
          <h1 className="text-center text-lg">No movies found.</h1>
        )}
        {results.map((item) => {
          return (
            <li
              key={item.id}
              className="border rounded-lg border-gray-600 shadow-sm overflow-hidden shadow-slate-50 bg-slate-800 transition hover:scale-105 sm:w-72 w-11/12"
            >
              {ctx.list.find((movie) => movie.id === item.id) ? (
                <button
                  onClick={() => listAddHandler(item.id, item.original_title)}
                  className="border rounded-full m-1 w-10 bg-white absolute"
                >
                  <img src={Minus} alt="remove" />
                </button>
              ) : (
                <button
                  onClick={() => listAddHandler(item.id, item.original_title)}
                  className="border rounded-full m-1 w-10 bg-white absolute"
                >
                  <img src={Plus} alt="add" />
                </button>
              )}
              <img
                src={`https://image.tmdb.org/t/p/w400/${item.poster_path}`}
                alt={item.title}
                className="max-h-80 w-full object-cover"
              />
              <div className="flex flex-wrap p-2 items-center justify-between">
                <Link to={`/movieflix/search/${item.id}`}>
                  <h1 className="text-xl">{item.title}</h1>
                </Link>
                <h2 className="flex gap-1 text-md bg-slate-600 p-1 rounded-md">
                  <img src={Star} className="w-4" alt="rating" />
                  {item.vote_average}
                </h2>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Search;
