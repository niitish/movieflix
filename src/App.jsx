import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AppContext from "./store/context";
import "./static/scss/app.scss";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import PublicLists from "./components/PublicLists";
import Search from "./components/Search";
import MovieCart from "./components/MovieCart";
import MovieDetails from "./components/MovieDetails";
import Footer from "./components/Footer";
import PrivateLists from "./components/PrivateLists";

const App = () => {
  const ctx = useContext(AppContext);

  return (
    <>
      <div className="app">
        <Navbar />
        <MovieCart />
      </div>
      <main>
        <Routes>
          <Route path="/movieflix" element={<Hero />} />
          {ctx.loggedIn && (
            <Route path="/movieflix/lists/private" element={<PrivateLists />} />
          )}
          <Route path="/movieflix/lists/public" element={<PublicLists />} />
          <Route path="/movieflix/search" element={<Search />} />
          <Route path="/movieflix/search/:id" element={<MovieDetails />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
