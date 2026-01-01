import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// All Contexts
import {
  AuthProvider,
  CommunityProvider,
  PostProvider,
  SocialProvider,
  ThemeProvider
} from "./context";

// Pages Import
import AppLayout from "./App";
import AuthLayout from './components/layout/AuthLayout';

import LoginPage from "./pages/LoginPage";
import SignupPage from './pages/SignupPage';
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import TrendingPage from "./pages/TrendingPage";
import ProfilePage from "./pages/ProfilePage";
import CommunityPage from "./pages/CommunityPage";
import CommunityDetailPage from "./pages/CommunityDetailPage";
import PostDetailPage from "./pages/PostDetailPage";

import EditProfile from "./components/profile/EditProfileForm.jsx";

import CreatePost from "./components/posts/CreatePost.jsx";
import EditPost from "./components/posts/EditPost.jsx";
import PageNotFound from "./components/pages/PageNotFound.jsx";
import CreateCommunityModal from './components/communities/CreateCommunityModal.jsx';


// Pages
const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
    ]
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> }, // Uses index instead of path: "/"
      { path: "explore", element: <ExplorePage /> },
      { path: "trending", element: <TrendingPage /> },
      
      // Community Routes
      { path: "communities", element: <CommunityPage /> },
      { path: "communities/create", element: <CreateCommunityModal /> },
      { path: "communities/:communityId", element: <CommunityDetailPage /> },
      
      // Profile Routes
      { path: "profile/edit", element: <EditProfile /> },
      { path: "profile/:userId", element: <ProfilePage /> },
      
      // Post Routes
      { path: "posts/new", element: <CreatePost /> }, // Simpler than "add-post"
      { path: "posts/:postId", element: <PostDetailPage /> },
      { path: "posts/:postId/edit", element: <EditPost /> }, // Nested style naming
      
      { path: "*", element: <PageNotFound /> }
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <SocialProvider>
          <CommunityProvider>
            <PostProvider>
              <RouterProvider router={router} />
            </PostProvider>
          </CommunityProvider>
        </SocialProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);