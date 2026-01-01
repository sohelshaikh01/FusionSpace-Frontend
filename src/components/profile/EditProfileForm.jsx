import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import Input from "../common/Input";
import Button from "../common/Button";

const EditProfile = () => {
    const { isUser, error, isLoading, updateMyProfile } = useAuth();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        fullName: isUser?.fullName || "",
        email: isUser?.email || ""
    });

    // -- Update form if isUser data arrives after component mounts
    useEffect(() => {
        if (isUser) {
            setFormData({
                fullName: isUser.fullName || "",
                email: isUser.email || ""
            });
        }
    }, [isUser]);

    // -- Redirect if not logged in
    useEffect(() => {
        if (!isLoading && !isUser) {
            navigate("/");
        }
    }, [isUser, navigate, isLoading]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await updateMyProfile(formData);
        if (result.success) {
            navigate(`/profile/${isUser?._id}`);
        }
    };

    return (
        <div className="w-full px-4 pt-10 min-h-screen bg-[#F2F2F2] dark:bg-[var(--bg-main)]">
            <form 
                onSubmit={handleSubmit} 
                className="p-6 sm:p-10 flex flex-col items-center gap-4 mx-auto max-w-xl bg-white dark:bg-[#1A1A1A] border border-black/5 dark:border-white/10 rounded-[var(--radius)] shadow-[var(--shadow-soft)]"
            >
                <h1 className="font-black text-2xl text-gray-700 dark:text-white uppercase tracking-widest">
                    Edit Profile
                </h1>

                {error && (
                    <p className="text-[var(--accent-danger)] bg-red-50 dark:bg-red-900/20 border border-red-100 p-2 rounded-lg w-full text-center text-sm font-bold">
                        {error}
                    </p>
                )}

                <Input
                    label="FullName:"
                    name="fullName"
                    type="text"
                    placeholder="Update FullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full"
                    required 
                />

                <Input
                    label="Email:"
                    name="email"
                    type="email"
                    placeholder="Update Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full"
                    required 
                />

                <Button 
                    btnP 
                    className="mt-4 w-full" 
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Updating..." : "Update Profile"}
                </Button>
            </form>
        </div>
    );
};

export default EditProfile;