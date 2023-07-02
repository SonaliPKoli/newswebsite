// context creation
//provider
//consumer removed and replaces=d by useContext hook
//useContext hook
import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
let API = "https://hn.algolia.com/api/v1/search?";
const initialState = {
  isLoading: true,
  query: "",
  nbPages: 0,
  page: 0,
  hits: [],
};
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchApiData = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await fetch(url);
      const data = await res.json();

      dispatch({
        type: "GET_STORIES",
        payload: {
          hits: data.hits,
          nbPages: data.nbPages,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  // to remove the  posst
  const removePost = (POST_ID) => {
    dispatch({ type: "REMOVE_POST", payload: POST_ID });
  };
  //search
  const searchPost = (searchQuery) => {
    dispatch({ type: "SEARCH_POST", payload: searchQuery });
  };
  //pagination
  const getNextPage = () => {
    dispatch({ type: "NEXT_PAGE" });
  };
  const getPrevPage = () => {
    dispatch({ type: "PREV_PAGE" });
  };
  useEffect(() => {
    fetchApiData(`${API}query=${state.query}&page=${state.page}`);
  }, [state.query,state.page]);
  return (
    <AppContext.Provider value={{ ...state, removePost, searchPost,getNextPage,getPrevPage }}>
      {children}
    </AppContext.Provider>
  );
};
//custom hook creation
const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider, useGlobalContext };
