import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./assets/fonts/Montserrat-ExtraBold.ttf";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home.tsx";
import { Dashboard } from "./pages/Dashboard.tsx";
import { Login } from "./pages/Login.tsx";
import { Signup } from "./pages/SignUp.tsx";
import Layout from "./components/layout.tsx";
import Errorpage from "./components/Errorpage.tsx";
import Profile from "./pages/Profile.tsx";
import ProjectDetail from "./pages/ProjectDetail.tsx";
import { ThemeProvider } from "./components/themeProvider.tsx";
import Practice from "./components/practice.tsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/dash",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
  },
  {
    path: "/project",
    element: (
      <Layout>
        <ProjectDetail />
      </Layout>
    ),
  },
  {
    path: "/trial",
    element: (
      <Layout>
        <Practice />
      </Layout>
    ),
  },
  {
    path: "*",
    element: <Errorpage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
      <RouterProvider router={router} />
        </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
