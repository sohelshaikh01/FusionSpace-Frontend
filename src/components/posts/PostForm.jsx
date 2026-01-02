import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePost, useCommunity } from "../../context";
import Input from "../common/Input";
import Button from "../common/Button";

const PostForm = ({ post }) => {
    const navigate = useNavigate();
    const { createAPost, updateAPost, isLoading, error } = usePost();
    const { fetchMyCommunities } = useCommunity();

    const [myCommunities, setMyCommunities] = useState([]);
    const [formData, setFormData] = useState({
        text: "",
        imageFile: null,
        communityId: "",
    });

    useEffect(() => {
        if (post) {
            setFormData({
                text: post.text || "",
                imageFile: null,
                communityId: post.communityId?._id || post.communityId || "",
            });
        }
    }, [post]);

    useEffect(() => {
        (async () => {
            const result = await fetchMyCommunities();
            if (result?.data) setMyCommunities(result.data);
        })();
    }, [fetchMyCommunities]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: files ? files[0] : value 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (post) {
            const result = await updateAPost(post._id, formData);
            if (result?.success) navigate(`/posts/${post._id}`);
        } else {
            const result = await createAPost(formData);
            if (result?.success) navigate(`/posts/${result.data?._id}`);
        }
    };

    return (
        <div className="flex flex-col mx-auto max-w-2xl w-full p-6 sm:p-10 bg-[var(--bg-panel)] border border-black/5 dark:border-white/10 rounded-[var(--radius)] shadow-[var(--shadow-soft)] transition-colors">
            
            <div className="mb-8">
                <h2 className="text-2xl text-center font-black text-[var(--text-strong)]">
                    {post ? "Edit Post" : "Create a New Post"}
                </h2>
                <p className="text-[var(--text-soft)] text-center text-sm font-medium mt-1">
                    {post ? "Update your post content and image." : "Share your thoughts with the community."}
                </p>
            </div>

            {error && (
                <p className="mb-6 text-sm text-white bg-[var(--accent-danger)] p-3 rounded-[var(--radius)] font-bold text-center shadow-[0_4px_0_#b02b38]">
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <Input
                    name="text"
                    label="Post Content"
                    placeholder="What's on your mind?"
                    type="text"
                    value={formData.text}
                    onChange={handleChange}
                    required
                />

                <Input
                    type="file"
                    name="imageFile"
                    label={post ? "Change Post Image" : "Upload Post Image"}
                    onChange={handleChange}
                    accept="image/*"
                    required={!post}
                />

                {!post && (
                    <div className="flex flex-col gap-2">
                        <label className="text-[var(--text-strong)] text-sm font-bold pl-1">
                            Select Community
                        </label>
                        <select
                            name="communityId"
                            value={formData.communityId}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-[var(--radius)] border text-sm outline-none transition-all
                                     bg-[var(--bg-panel)] dark:bg-[#1f1f1f] text-[var(--text-strong)]
                                     border-[var(--bg-deep)] dark:border-white/10 shadow-sm
                                     focus:border-[var(--accent-focus)] focus:ring-4 focus:ring-[var(--accent-focus)]/10"
                        >
                            <option value="">Choose a community</option>
                            {myCommunities.map((comm) => (
                                <option key={comm._id} value={comm._id}>
                                    #{comm.communityName}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <Button 
                    type="submit" 
                    btnP
                    className="w-full py-3.5 mt-4 font-black uppercase tracking-widest text-xs"
                    disabled={isLoading}
                >
                    {isLoading ? "Saving..." : post ? "Update Post" : "Publish Post"}
                </Button>
            </form>
        </div>
    );
};

export default PostForm;