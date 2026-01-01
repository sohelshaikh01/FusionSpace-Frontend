import React, { createContext, useContext, useState } from "react";
import apiClient from "../api/client"; 

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [feedPosts, setFeedPosts] = useState([]); 
  const [explorePosts, setExplorePosts] = useState({}); 
  const [trendingData, setTrendingData] = useState({}); 
  const [currentPost, setCurrentPost] = useState(null);
  const [postComments, setPostComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleApiCall = async (apiFunc) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiFunc();
      return { success: true, data: response.data.data };
    } catch (err) {
      const message = err.response?.data?.message || "An unknown error occurred.";
      setError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  // --- Discovery ---

  const fetchFeed = async (page = 1) => {
    return handleApiCall(async () => {
      const response = await apiClient.get(`/discovery/feed?page=${page}`);
      const data = response?.data;
      setFeedPosts(data);
      return response;
    });
  }; // --
  
  const fetchExplore = async (page = 1) => {
    return handleApiCall(async () => {
      const response = await apiClient.get(`/discovery/explore?page=${page}`);
      setExplorePosts(response.data.data); 
      return response;
    });
  }; // --

  const fetchTrending = async () => {
    return handleApiCall(async () => {
        const response = await apiClient.get("/discovery/trending");
        setTrendingData(response.data.data);
        return response;
    });
  }; // --

  // --- Post CRUD ---

  const createAPost = async ({ text, imageFile, communityId }) => {
    const formData = new FormData();
    formData.append("text", text);
    if (imageFile) formData.append("imageFile", imageFile); 
    if (communityId) formData.append("communityId", communityId);

    return handleApiCall(async () => {
        const response = await apiClient.post("/posts", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        setFeedPosts(prev => [response.data.data, ...prev]); 
        return response;
    });
  }; // --


  const getPostById = async (postId) => {
    return handleApiCall(async () => {
        const response = await apiClient.get(`/posts/${postId}`);
        setCurrentPost(response.data.data);
        return response;
    });
  }; // --


  // --
  const updateAPost = async (postId, updateData) => {
    return handleApiCall(async () => {
        const response = await apiClient.patch(`/posts/${postId}`, updateData);
        // Update local state if the edited post is currently being viewed
        if (currentPost?._id === postId) setCurrentPost(response.data.data);
        setFeedPosts(prev => prev.map(p => p._id === postId ? response.data.data : p));
        return response;
    });
  }; // --

  const deleteAPost = async (postId) => {
    return handleApiCall(async () => {
        const response = await apiClient.delete(`/posts/${postId}`);
        setFeedPosts(prev => prev.filter(p => p._id !== postId));
        return response;
    });
  }; // --

  const togglePublishStatus = async (postId) => {
    return handleApiCall(async () => {
        const response = await apiClient.patch(`/posts/publish/${postId}`);
        return response;
    });
  }; // !-

  // --- Likes ---

  const togglePostLike = async (postId) => {
    try {
      const response = await apiClient.post(`/likes/toggle/p/${postId}`);
      const { isLiked, likesCount } = response.data.data;
      
      setFeedPosts(prevPosts => 
          prevPosts.map(post => 
              post._id === postId ? { ...post, isLiked, likeCount: likesCount } : post
          )
      );
      if (currentPost?._id === postId) {
          setCurrentPost(prev => ({ ...prev, isLiked, likeCount: likesCount }));
      }
      return { success: true, data: response.data.data };
    } catch (err) {
      return { success: false };
    }
  }; // --

  const toggleCommentLike = async (commentId) => {
    try {
      const response = await apiClient.post(`/likes/toggle/c/${commentId}`);
      const { isLiked, likesCount } = response.data.data;
      setPostComments(prev => 
        prev.map(c => c._id === commentId ? { ...c, isLiked, likeCount: likesCount } : c)
      );
      return { success: true };
    } catch (err) {
      return { success: false };
    }
  }; // !-

  // --- Comments ---
  
  const createComment = async (postId, content) => {
    return handleApiCall(async () => {
        const response = await apiClient.post(`/comments/${postId}`, { content });
        setPostComments(prev => [response.data.data, ...prev]); 
        return response;
    });
  }; // --

  const getComments = async (postId) => {
    return handleApiCall(async () => {
        const response = await apiClient.get(`/comments/${postId}`);
        setPostComments(response.data.data);
        return response;
    });
  }; // --
  
  const editComment = async (commentId, content) => {
    return handleApiCall(async () => {
        const response = await apiClient.patch(`/comments/${commentId}`, { content });
        setPostComments(prev => prev.map(c => c._id === commentId ? response.data.data : c));
        return response;
    });
  }; // --

  const deleteComment = async (commentId) => {
    return handleApiCall(async () => {
        const response = await apiClient.delete(`/comments/${commentId}`);
        setPostComments(prev => prev.filter(c => c._id !== commentId));
        return response;
    });
  }; // --
  
  return (
    <PostContext.Provider
      value={{
        feedPosts, explorePosts, trendingData, currentPost, postComments,
        isLoading, error,
        fetchFeed, fetchExplore, fetchTrending,
        createAPost, getPostById, updateAPost, deleteAPost, togglePublishStatus,
        togglePostLike, toggleCommentLike,
        createComment, getComments, editComment, deleteComment
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);