import { useEffect, useContext, useState } from "react";
import AppContext from "../store/context";
import { Link } from "react-router-dom";
import { get, child, ref, getDatabase } from "firebase/database";
import Fire from "../Fire";
import Modal from "./UI/Modal";
import axios from "axios";

const PrivateLists = () => {
  const ctx = useContext(AppContext);
  const [fetch, setFetch] = useState("");
  const [open, setOpen] = useState(-1);
  const [images, setImages] = useState([]);

  useEffect(() => {
    document.title = "Private Lists - M.Flix";

    setFetch("Loading...");
    const database = getDatabase(Fire);
    const dbRef = ref(database);
    get(child(dbRef, `/private/${ctx.user.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) return snapshot.val();
      })
      .then((res) => {
        let data = [];
        for (const key in res) {
          data = [...data, res[key]];
        }

        for (const x in data) {
          const id = data[x].data[0].id;
          axios
            .get(
              `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
            )
            .then((res) => {
              setImages((imgs) => [...imgs, res.data.poster_path]);
            });
        }
        ctx.setList(data, "private");
        setFetch("");
      })
      .catch((err) => {
        console.log(err);
        setFetch("Error occured while fetching.");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mycontainer bg-neutral-800">
      <div className="text-center">
        <h1 className="text-3xl">Your lists</h1>
        <p className="mb-3">All the lists you've created so far.</p>
        <Link to="/movieflix/search">
          <button className="transition ease-in-out delay-150 bg-red-500 hover:-translate-y-1 hover:bg-red-800 px-3 py-1 rounded">
            Create new
          </button>
        </Link>
      </div>
      <div className="p-4 flex flex-col items-center">
        {fetch && <h1 className="text-white text-lg text-center">{fetch}</h1>}
        <ul className="flex flex-wrap gap-6 mt-2 justify-center">
          {open !== -1 && (
            <Modal title={ctx.allPublic[open].name} onClose={() => setOpen(-1)}>
              <ul className="flex flex-col px-4 pb-3 gap-3">
                {ctx.allList[open].data.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-lg flex justify-between items-center p-3 bg-slate-500 transition hover:bg-slate-400"
                  >
                    <Link to={`/movieflix/search/${item.id}`}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Modal>
          )}
          {(ctx.allList.length > 0 &&
            ctx.allList.map((item, i) => {
              return (
                <li
                  key={i}
                  onClick={() => {
                    setOpen(i);
                  }}
                  className="border rounded-lg border-gray-600 shadow-sm overflow-hidden shadow-slate-50 bg-slate-800 transition hover:scale-105 sm:w-72 w-11/12"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w400/${images[i]}`}
                    alt="poster"
                    className="max-h-80 w-full object-cover"
                  />
                  <div className="flex flex-wrap justify-between items-center p-2">
                    <h1 className="text-lg">{item.name}</h1>
                    <h1 className="text-lg bg-red-400 px-2 py-1 rounded">
                      {item.data.length}
                    </h1>
                  </div>
                </li>
              );
            })) || <h1>Nothing here yet.</h1>}
        </ul>
      </div>
    </div>
  );
};

export default PrivateLists;
