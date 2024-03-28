import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Authentication from "./pages/Authentication/Authentication";
import Tracker from "./pages/Tracker/Tracker";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchData, sendRequest } from "./store/DataRequest";
let isInitial = true;
function App() {
  const checkChanged = useSelector((state) => state.Display.changed);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.Display.items);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      children: [
        {
          path: "/auth",
          element: <Authentication />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/tracker",
          element: <Tracker />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
  ]);
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (checkChanged) {
      dispatch(sendRequest(items));
    }
  }, [items, dispatch]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
