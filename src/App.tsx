import { RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/userSlicer";
import { AppDispatch, RootState } from "./redux/store";
import { RoutesWrapper } from "./Routes/router";
import { getAllCategories } from "./redux/categorySlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const localStorageJwt = localStorage.getItem("jwt");
  
  const {isLoading, jwt } = useSelector((state: RootState) => state.user); 

  useEffect(() => {
      dispatch(getUser({ jwt: localStorageJwt || "" }));
      dispatch(getAllCategories());
  }, [jwt]); 


  if (isLoading) {
    return <div className="mt-20">Loading...</div>;  
  }

  return (
    <>
      <Navbar />
      <RoutesWrapper/>
    </>
  );
}

export default App;
