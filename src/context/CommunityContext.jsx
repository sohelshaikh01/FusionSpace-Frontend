import React, { createContext, useContext, useState, useCallback } from "react";
import apiClient from "../api/client";

const CommunityContext = createContext();

export const CommunityProvider = ({ children }) => {
  const [myCommunities, setMyCommunities] = useState([]);
  const [currentCommunity, setCurrentCommunity] = useState(null);
  const [communityMembers, setCommunityMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRequest = async (requestFn) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await requestFn();
      return { success: true, data: response.data.data };
    } catch (err) {
      const msg = err.response?.data?.message || "Community action failed";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setIsLoading(false);
    }
  };

  // --- Actions ---
  const createCommunity = async (formData) => {
    return handleRequest(() => 
      apiClient.post("/community", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
    );
  }; // --
 
  const fetchMyCommunities = useCallback(async () => {
    const result = await handleRequest(() => apiClient.get("/community"));
    if (result.success) setMyCommunities(result.data);
    return result;
  }, []); //--
  
  const getCommunityDetails = async (communityId) => {
    const result = await handleRequest(() => apiClient.get(`/community/${communityId}`));
    // FIX: Set result.data, not the whole result object
    if (result.success) setCurrentCommunity(result.data); 
    return result;
  }; // --

  const getCommunityPosts = async (communityId, page = 1) => {
    return handleRequest(() => apiClient.get(`/community/${communityId}/posts?page=${page}`));
  }; // !- used till

  const joinCommunity = async (communityId) => {
    const result = await handleRequest(() => apiClient.post(`/community-members/${communityId}/joins`));
    if (result.success) getCommunityDetails(communityId);
    return result;
  }; // --

  const leaveCommunity = async (communityId) => {
    const result = await handleRequest(() => apiClient.delete(`/community-members/${communityId}/joins`));
    if (result.success) getCommunityDetails(communityId);
    return result;
  }; // --

  const getCommunityMembers = async (communityId) => {
    const result = await handleRequest(() => apiClient.get(`/community-members/${communityId}/members`));
    if (result.success) setCommunityMembers(result.data);
    return result;
  }; // !-

  const updateCommunity = async (communityId, updateData) => {
    return handleRequest(() => apiClient.patch(`/community/${communityId}`, updateData));
  }; // !-

  const deleteCommunity = async (communityId) => {
    return handleRequest(() => apiClient.delete(`/community/${communityId}`));
  }; // --

  return (
    <CommunityContext.Provider
      value={{
        myCommunities,
        currentCommunity,
        setCurrentCommunity,
        communityMembers,
        isLoading,
        error,
        createCommunity,
        fetchMyCommunities,
        getCommunityDetails,
        getCommunityPosts,
        joinCommunity,
        leaveCommunity,
        getCommunityMembers,
        updateCommunity,
        deleteCommunity,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => useContext(CommunityContext);