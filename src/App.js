import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Authentication from "./pages/Authentication/Authentication";
import Tracker from "./pages/Tracker/Tracker";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";

function App() {
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
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
