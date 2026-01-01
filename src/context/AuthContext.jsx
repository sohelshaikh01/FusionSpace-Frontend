import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../api/client.js";

const AuthContext = createContext({})

export const AuthProvider = ({children}) => {

    const [isUser, setIsUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await apiClient.get("/users/me");
                const userData = response.data?.data;

                if (userData) {
                    setIsUser(userData);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                setIsUser(null);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };
        
        checkAuthStatus();
    }, []);

    // --
    const loginUser =async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await apiClient.post("/users/login", {
                email,
                password
            });
                    
            const userData = response.data?.data?.user || response.data?.data;

            if (userData) {
                setIsUser(userData);
                setIsAuthenticated(true);
                return { success: true };
            } else {
                throw new Error("User data missing in response");
            }
        }
        catch (error) {
            const message = error.response?.data?.message || "Login failed";
            setError(message);
            return { success: false, message };
        }
        finally {
            setIsLoading(false);
        }
    }

    // --
    const registerUser = async (userData) => { 
        setIsLoading(true);
        setError(null);
        
        try {
            const formData = new FormData();
            formData.append("fullName", userData.fullName);
            formData.append("email", userData.email);
            formData.append("username", userData.username);
            formData.append("password", userData.password);
            formData.append("bio", userData.bio || "");
            if (userData.avatar) {
                formData.append("avatar", userData.avatar);
            }

            const response = await apiClient.post("/users/register", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const registeredUser = response.data?.data?.user || response.data?.data;

            if (registeredUser) {
                setIsUser(registeredUser);
                setIsAuthenticated(true);
                return { success: true };
            } else {
                throw new Error("User data missing in response");
            }

        } catch (err) {
            const message = err.response?.data?.message || "Registration failed";
            setError(message);
            return { success: false, message };
        } finally {
            setIsLoading(false);
        }
    };

    // --
    const logoutUser = async () => {
        setIsLoading(true);
        try {
            await apiClient.post("/users/logout");
            setIsUser(null);
            setIsAuthenticated(false);
        }
        catch (err) {
            console.error("Logout failed", err);
        }
        finally {
            setIsLoading(false);
        }
    }

    const getCurrentUserProfile = async () => {
        setIsLoading(true);
        try {
            const response = await apiClient.get("/users/me");
            
            const userData = response.data?.data;

            if (userData) {
                setIsUser(userData);
                setIsAuthenticated(true);
                return { success: true, data: userData };
            }
        }
        catch (error) {
            console.error("Failed to get current user:", error.response?.data?.message);
            setIsAuthenticated(false);
            setIsUser(null);
            return { success: false };
        }
        finally {
            setIsLoading(false);
        }
    };

    const updateMyProfile = async (updateData) => {
        setError(null);
        setIsLoading(true);
        try {
            const response = await apiClient.patch("/users/me", updateData);
            
            const updatedUser = response?.data?.data;

            if (!updatedUser) {
                throw new Error("Update failed: No data received");
            }

            setIsUser(updatedUser); 
            
            return { success: true }; 
            
        } catch (error) {
            const message = error.response?.data?.message || error.message || "Update failed";
            setError(message);
            return { success: false, message };
        } finally {
            setIsLoading(false);
        }
    };

    
    return(
        <AuthContext.Provider
            value={{
                isUser,
                isAuthenticated,
                isLoading,
                error,
                loginUser,
                registerUser,
                logoutUser,
                getCurrentUserProfile,
                updateMyProfile
            }}
        >
            { children }
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);