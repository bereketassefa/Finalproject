import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./assets/fonts/Montserrat-ExtraBold.ttf";
import Errorpage from "./components/Errorpage.tsx";
import Campaign from "./components/dashboard/Campaign.tsx";
import Manage from "./components/dashboard/Manage.tsx";
import Layout from "./components/layout.tsx";
import Practice from "./components/practice.tsx";
import ProfileAbout from "./components/profile/ProfileAbout.tsx";
import ProfileBacked from "./components/profile/ProfileBacked.tsx";
import ProfileFavorite from "./components/profile/ProfileFavorite.tsx";
import ProfileProject from "./components/profile/ProfileProject.tsx";
import { ThemeProvider } from "./components/themeProvider.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";
import { Dashboard } from "./pages/Dashboard.tsx";
import Home from "./pages/Home.tsx";
import { Login } from "./pages/Login.tsx";
import NewProject from "./pages/NewProject.tsx";
import Profile from "./pages/Profile.tsx";
import ProjectDetail from "./pages/ProjectDetail.tsx";
import SearchResult from "./pages/SearchResult.tsx";
import { Signup } from "./pages/SignUp.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProfileSetting from "./components/profile/ProfileSetting.tsx";
import Follower from "./components/Follower.tsx";
import Following from "./components/Following.tsx";
import Success from "./components/Success.tsx";
import Failed from "./components/Failed.tsx";
import SearchByTag from "./pages/SearchByTag.tsx";

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
    path: "/dash/:id",
    element: <Dashboard />,
    children: [
      {
        path: "/dash/:id",
        element: <Campaign />,
      },
      // {
      //   path: "/dash/:id/manage",
      //   element: <Manage />,
      // },
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
    path: "/profile/:id",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),

    children: [
      {
        path: "/profile/:id",
        element: <ProfileProject />,
      },
      // {
      //   path: "/profile/:id/about",
      //   element: <ProfileAbout />,
      // },
      {
        path: "/profile/:id/backed",
        element: <ProfileBacked />,
      },
      {
        path: "/profile/:id/favorite",
        element: <ProfileFavorite />,
      },
      {
        path: "/profile/:id/setting",
        element: <ProfileSetting />,
      },
      {
        path: "/profile/:id/follower",
        element: <Follower />,
      },
      {
        path: "/profile/:id/following",
        element: <Following />,
      },
    ],
  },
  {
    path: "/project/:id",
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
    path: "/payment/success",
    element: <Success />,
  },
  {
    path: "/payment/failed",
    element: <Failed />,
  },
  {
    path: "/searchbytag/:tag",
    element: (
      <Layout>
        <SearchByTag />
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
