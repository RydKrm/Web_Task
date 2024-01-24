import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import RootLayout from "./Layout/RootLayout";
import Home from "./pages/Home/Home";




const routers = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ]
  }
])

function App() {
  return <RouterProvider router={routers} />;
}

export default App;