import { Link } from "react-router-dom";
import { useEffect } from "react";

const Hero = () => {
  useEffect(() => {
    document.title = "Home - M.Flix";
  }, []);

  return (
    <div className="hero">
      <h1 className="text-3xl font-bold leading-tight">
        Share your taste in movies.
      </h1>
      <h2 className="m-3 text-2xl">
        Browse movies, create favourites and much more!
      </h2>
      <div className="actions">
        <Link to="/movieflix/lists/public">
          <button className="transition ease-in-out delay-150 bg-red-500 hover:-translate-y-1 hover:bg-red-800 px-4 py-2 rounded">
            Browse public lists
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
