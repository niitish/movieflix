import { v4 } from "uuid";
import { getDatabase, ref, set } from "firebase/database";
import { useReducer, useEffect } from "react";
import AppContext from "./context";
import Fire from "../Fire";
import {
  LOGIN,
  LOGOUT,
  SET_MODAL_TYPE,
  TOGGLE_VISIBLE,
  ADD_MOVIE,
  DELETE_MOVIE,
  SET_LIST,
  POST_LIST,
} from "./actions";

const initState = {
  user: {},
  loggedIn: false,
  list: [],
  allList: [],
  allPublic: [],
  visibliity: "private",
  modalType: "",
};

const database = getDatabase(Fire);

const appReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("movieflixAuth", JSON.stringify(action.payload));
      return { ...state, loggedIn: true, user: action.payload };

    case LOGOUT:
      localStorage.clear();
      return { ...state, loggedIn: false, user: {} };

    case SET_MODAL_TYPE:
      return { ...state, modalType: action.payload };

    case TOGGLE_VISIBLE:
      const v = state.visibliity === "public" ? "private" : "public";
      return { ...state, visibliity: v };

    case ADD_MOVIE:
      const newList = [...state.list, { ...action.payload }];
      localStorage.setItem("movieflixList", JSON.stringify(newList));

      return {
        ...state,
        list: newList,
      };

    case DELETE_MOVIE:
      const newList2 = state.list.filter((item) => item.id !== action.payload);
      localStorage.setItem("movieflixList", JSON.stringify(newList2));

      return {
        ...state,
        list: newList2,
      };

    case SET_LIST:
      if (action.payload.name === "public") {
        return { ...state, allPublic: action.payload.list };
      } else if (action.payload.name === "private") {
        return { ...state, allList: action.payload.list };
      } else if (action.payload.name === "local") {
        return { ...state, list: action.payload.list };
      } else return state;

    case POST_LIST:
      const uuid = v4();
      if (state.visibliity === "public") {
        set(ref(database, `/public/${state.user.uid}/${uuid}`), {
          name: action.payload,
          data: {
            ...state.list,
          },
        });
      }

      set(ref(database, `/private/${state.user.uid}/${uuid}`), {
        name: action.payload,
        data: {
          ...state.list,
        },
      });

      localStorage.removeItem("movieflixList");
      return { ...state, list: [] };

    default:
      return state;
  }
};

const ContextProvider = ({ children }) => {
  useEffect(() => {
    const auth = localStorage.getItem("movieflixAuth");
    if (auth) {
      const user = JSON.parse(auth);
      dispatch({ type: LOGIN, payload: user });

      const list = localStorage.getItem("movieflixList");
      if (list) {
        dispatch({
          type: SET_LIST,
          payload: { list: JSON.parse(list), name: "local" },
        });
      }
    }
  }, []);

  const [appState, dispatch] = useReducer(appReducer, initState);

  const login = (auth) => {
    dispatch({ type: LOGIN, payload: auth });
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  const setModalType = (type) => {
    dispatch({ type: SET_MODAL_TYPE, payload: type });
  };

  const toggleVisible = (id) => {
    dispatch({ type: TOGGLE_VISIBLE, payload: id });
  };

  const addMovie = (id, title) => {
    dispatch({ type: ADD_MOVIE, payload: { id, title } });
  };

  const deleteMovie = (id) => {
    dispatch({ type: DELETE_MOVIE, payload: id });
  };

  const setList = (list, name) => {
    dispatch({ type: SET_LIST, payload: { list, name } });
  };

  const postList = (name) => {
    dispatch({ type: POST_LIST, payload: name });
  };

  return (
    <AppContext.Provider
      value={{
        user: appState.user,
        loggedIn: appState.loggedIn,
        list: appState.list,
        allList: appState.allList,
        allPublic: appState.allPublic,
        visibliity: appState.visibliity,
        modalType: appState.modalType,
        login,
        logout,
        setModalType,
        toggleVisible,
        addMovie,
        deleteMovie,
        setList,
        postList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
