import { createHashRouter, RouterProvider } from "react-router-dom";
import './App.css';

import Root from "./pages/Root";
import Home from "./pages/Home";
import UseId from "./pages/UseId";
import GetId from "./pages/GetId";
import Disposable from "./pages/Disposable";
import About from "./pages/About";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "use_id", element: <UseId />, children: [
        // add children for using ID
      ]},
      { path: "get_id", element: <GetId /> },
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