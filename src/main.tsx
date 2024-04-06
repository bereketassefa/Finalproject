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
import NewProject from "./pages/NewProject.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import ProfileProject from "./components/profile/ProfileProject.tsx";
import ProfileAbout from "./components/profile/ProfileAbout.tsx";
import ProfileBacked from "./components/profile/ProfileBacked.tsx";
import ProfileFavorite from "./components/profile/ProfileFavorite.tsx";
import Campaign from "./components/dashboard/Campaign.tsx";
import Manage from "./components/dashboard/Manage.tsx";
import { SearchResult } from "./pages/SearchResult.tsx";

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
    children: [
      {
        path: "/dash",
        element: <Campaign />,
      },
      {
        path: "/dash/manage",
        element: <Manage />,
      },
    ],
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

    children: [
      {
        path: "/profile",
        element: <ProfileProject />,
      },
      {
        path: "/profile/about",
        element: <ProfileAbout />,
      },
      {
        path: "/profile/backed",
        element: <ProfileBacked />,
      },
      {
        path: "/profile/favorite",
        element: <ProfileFavorite />,
      },
    ],
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
    path: "/search",
    element: (
      <Layout>
        <SearchResult />
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
    path: "/new",
    element: (
      <Layout>
        <NewProject />
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
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
