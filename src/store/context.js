import React from "react";

const AppContext = React.createContext({
  user: {},
  loggedIn: false,
  list: [],
  allList: [],
  allPublic: [],
  visibliity: "",
  modalType: "",
  login: (auth) => {},
  logout: () => {},
  setModalType: (type) => {},
  toggleVisible: (id) => {},
  addMovie: (id, title) => {},
  deleteMovie: (id) => {},
  setList: (data, name) => {},
  postList: (name) => {},
});

export default AppContext;
