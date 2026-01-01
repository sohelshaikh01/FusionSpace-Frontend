import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import apiClient from "../api/client";

const SocialContext = createContext();

export const SocialProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRequest = async (apiFunc) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiFunc();
      return { success: true, data: response.data.data };
    } catch (err) {
      const msg = err.response?.data?.message || "Social action failed";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setIsLoading(false);
    }
  };

  const getSearch = useCallback(async (query) => {
    return await handleRequest(() => apiClient.post(`/discovery/search`, { query }));
  }, []);// -- in explore


  const getPublicUserProfile = async (userId) => {
    const result = await handleRequest(() => apiClient.get(`/users/${userId}`));
    if (result.success) setUserProfile(result.data);
    return result;
  }; // --
  // other user profile

  const getPosts = async () => {
    return handleRequest(() => apiClient.get(`/posts`));
  } // !-
  // current user all profile posts

  const getUserPublicPosts = async (userId, page = 1) => {
    return handleRequest(() => apiClient.get(`/users/${userId}/posts?page=${page}`));
  }; // --
  // public post of users

  const followUser = async (userId) => {
    const result = await handleRequest(() => apiClient.post(`/follows/${userId}`));
    if (result.success) {
      // Optimistically update the UI to show "Following"
      if (userProfile && userProfile._id === userId) {
        setUserProfile(prev => ({ ...prev, isFollowing: true }));
      }
    }
    return result;
  }; // --
  // user profile

  const unfollowUser = async (userId) => {
    const result = await handleRequest(() => apiClient.delete(`/follows/${userId}`));
    if (result.success) {
      if (userProfile && userProfile._id === userId) {
        setUserProfile(prev => ({ ...prev, isFollowing: false }));
      }
    }
    return result;
  }; // --
  // user profile

  const getFollowersList = async (userId) => {
    const result = await handleRequest(() => apiClient.get(`/follows/${userId}/followers`));
    if (result.success) setFollowersList(result.data);
    return result;
  }; // --
  // user followerslist

  const getFollowingList = async (userId) => {
    const result = await handleRequest(() => apiClient.get(`/follows/${userId}/following`));
    if (result.success) setFollowingList(result.data);
    return result;
  }; // --
  // user following list

  const value = useMemo(() => ({
    getPosts,
    userProfile,
    followersList,
    followingList,
    isLoading,
    error,
    getSearch,
    getPublicUserProfile,
    getUserPublicPosts,
    followUser,
    unfollowUser,
    getFollowersList,
    getFollowingList,
  }), [userProfile, followersList, followingList, isLoading, error, getSearch]);

  return (
    <SocialContext.Provider value={value}>
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => useContext(SocialContext);