import { useContext, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Fire from "../Fire";
import AppContext from "../store/context";
import { useNavigate } from "react-router-dom";
import Modal from "./UI/Modal";

const Login = () => {
  const auth = getAuth(Fire);
  const ctx = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const formHandler = (event) => {
    event.preventDefault();
    setError("");

    if (email.trim() === "" || password.trim() === "") {
      setError("Email/Password can't be empty.");
      return;
    }

    if (ctx.modalType === "login") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          const user = userCred.user;
          ctx.login(user);
          navigate("/movieflix/search");
          ctx.setModalType("");
        })
        .catch((error) => {
          if (error.message.includes("wrong-password"))
            setError("Wrong password. Please try again.");
        });
    } else if (ctx.modalType === "signup") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          const user = userCred.user;
          ctx.login(user);
          navigate("/movieflix/search");
          ctx.setModalType("");
        })
        .catch((error) => {
          if (error.message.includes("email-already-in-use"))
            setError("Email already in use.");
        });
    }
  };

  return (
    <Modal
      title={
        (ctx.modalType === "login" && "Please enter your credentials") ||
        "Please enter your details"
      }
      onClose={() => ctx.setModalType("")}
    >
      {/* actually a form */}
      <div className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8">
        <section>
          <label htmlFor="email" className="block mb-2 font-medium text-white">
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-black bg-slate-300 transition hover:bg-slate-100 focus:bg-slate-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@company.com"
            required
          />
        </section>

        <section>
          <label
            htmlFor="password"
            className="block mb-2 font-medium text-white"
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="text-black bg-slate-300 transition hover:bg-slate-100 focus:bg-slate-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </section>
        {error && <p>{error}</p>}
        {(ctx.modalType === "login" && (
          <button
            type="submit"
            onClick={formHandler}
            className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login
          </button>
        )) || (
          <button
            type="submit"
            onClick={formHandler}
            className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Sign up
          </button>
        )}
      </div>
      <section className=" p-4 pt-0 text-sm font-medium text-white">
        {(ctx.modalType === "login" && "Not registered? ") ||
          "Already registered? "}
        {(ctx.modalType === "login" && (
          <button
            type="reset"
            className=" text-white/80 hover:underline"
            onClick={() => ctx.setModalType("signup")}
          >
            Create account.
          </button>
        )) || (
          <button
            type="reset"
            className="text-white/80 hover:underline"
            onClick={() => ctx.setModalType("login")}
          >
            Login.
          </button>
        )}
      </section>
    </Modal>
  );
};

export default Login;
