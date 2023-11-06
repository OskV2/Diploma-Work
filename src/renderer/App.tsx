import { createHashRouter, RouterProvider } from "react-router-dom";
import icon from '../../assets/icon.svg';
import './App.css';

import Input from './components/Input/Input';

import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage";
import UseId from "./pages/UseId";
import GetId from "./pages/GetId";
import DisposablePage from "./pages/DisposablePage";
import About from "./pages/About";

const router = createHashRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "use_id", element: <UseId />, children: [

      ]},
      { path: "get_id", element: <GetId /> },
      { path: "disposable", element: <DisposablePage /> },
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