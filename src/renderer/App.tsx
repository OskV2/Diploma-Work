import { createHashRouter, RouterProvider } from "react-router-dom";
import './App.css';

import Root from "./pages/Root";
import Home from "./pages/Home";
import Disposable from "./pages/Disposable";
import About from "./pages/About";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "disposable", element: <Disposable /> },
      { path: "about", element: <About /> }
    ],
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;