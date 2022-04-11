import { Link } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../store/context";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { SearchIcon, PublicIcon, PrivateIcon } from "../static/image";

const Navbar = () => {
  const ctx = useContext(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    ctx.logout();
    navigate("/movieflix");
  };

  return (
    <header className="p-4 bg-black text-white flex justify-between items-center">
      <Link to="/movieflix" className="text-3xl text-red-500 font-semibold">
        M.FLIX
      </Link>
      <nav className="flex gap-3 items-center">
        <Link to="/movieflix/search">
          <img className="w-6" src={SearchIcon} alt="private" />
        </Link>
        <Link to="/movieflix/lists/public">
          <img className="w-6" src={PublicIcon} alt="private" />
        </Link>
        {ctx.loggedIn && (
          <>
            <Link to="/movieflix/lists/private">
              <img className="w-6" src={PrivateIcon} alt="private" />
            </Link>
            <button
              className="rounded py-1 px-3 transition ease-in-out delay-150 bg-red-500 hover:scale-110 hover:bg-red-700"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}

        {!ctx.loggedIn && (
          <>
            <button
              className="border rounded py-1 px-3"
              onClick={() => ctx.setModalType("signup")}
            >
              Sign up
            </button>
            <button
              className="rounded py-1 px-3 transition ease-in-out delay-150 bg-red-500 hover:scale-110 hover:bg-red-700"
              onClick={() => ctx.setModalType("login")}
            >
              Login
            </button>
          </>
        )}
      </nav>
      {ctx.modalType && <Login />}
    </header>
  );
};

export default Navbar;
