import { useState, useContext, useRef } from "react";
import { Saved, Minus } from "../static/image";
import AppContext from "../store/context";
import Modal from "./UI/Modal";

const MovieCart = () => {
  const ctx = useContext(AppContext);
  const listNameRef = useRef();
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    const listName = listNameRef.current.value.trim();

    if (!listName) {
      alert("Please enter a list name");
      return;
    }

    if (!ctx.loggedIn) {
      alert("Please login to save your list.");
      return;
    }

    ctx.postList(listNameRef.current.value.trim());
  };

  return (
    <>
      {ctx.list.length > 0 && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 rounded-lg p-1 w-12 bg-red-400 z-10"
        >
          <img src={Saved} alt="saved" />
        </button>
      )}
      {open && (
        <Modal title="Your list" onClose={() => setOpen(false)}>
          {(ctx.list.length > 0 && (
            <div className="flex flex-col p-4 pb-3 gap-3">
              <input
                ref={listNameRef}
                type="text"
                autoFocus
                placeholder="Enter list name"
                className="text-black bg-slate-300 transition hover:bg-slate-100 focus:bg-slate-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />

              <ul className="flex flex-col gap-2">
                {ctx.list.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-lg flex justify-between items-center p-2 bg-slate-500 transition hover:bg-slate-400"
                  >
                    <h1 className=" w-4/5">{item.title}</h1>
                    <button
                      type="button"
                      onClick={() => ctx.deleteMovie(item.id)}
                      className="bg-transparent transition ease-in-out hover:bg-white rounded-lg p-1.5 inline-flex items-center w-8"
                    >
                      <img src={Minus} alt="remove" />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between">
                <button
                  onClick={() => ctx.toggleVisible()}
                  type="button"
                  className="bg-black font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center transition ease-in-out hover:bg-slate-800"
                >
                  {ctx.visibliity.toUpperCase()}
                </button>
                <button
                  onClick={handleSave}
                  className="rounded text-white bg-red-500 px-2 py-1"
                >
                  Save
                </button>
              </div>
            </div>
          )) || <h1 className="p-4 pt-0">Nothing here yet</h1>}
        </Modal>
      )}
    </>
  );
};

export default MovieCart;
