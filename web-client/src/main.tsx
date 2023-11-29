import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import { SessionContextProvider } from "./store/context";
import "./global.css";

import "antd/dist/reset.css";

import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContextProvider } from "./store/authContext";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/*",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider>
      <AuthContextProvider>
        <SessionContextProvider>
          <div className="flex align-start min-h-screen">
            <RouterProvider router={router} />
          </div>
        </SessionContextProvider>
      </AuthContextProvider>
    </ConfigProvider>
  </React.StrictMode>
);
