import { createHashRouter, RouterProvider } from "react-router-dom";
import './App.css';

import Root from "./pages/Root";
import Home from "./pages/Home";
import InputPage from "./pages/Input";
import About from "./pages/About";
import Generate from "./pages/Generate"

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "input", element: <InputPage /> },
      { path: "input/display", element: <Generate /> },
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