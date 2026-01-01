import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostForm from "../posts/PostForm.jsx";
import { usePost } from '../../context/PostContext.jsx';
import Loader from '../common/Loader';

const EditPost = () => {
    const [post, setPost] = useState(null);
    const { postId } = useParams();
    const { getPostById } = usePost();

    useEffect(() => {
        if (postId) {
            const fetchPost = async () => {
                const result = await getPostById(postId);
                if (result.success) {
                    setPost(result.data);
                }
            };
            fetchPost();
        }
    }, [postId]); // Only re-run if postId changes

    if (!post) return <Loader label="Loading Post Data..." />;

    return (
        <div className="w-full sm:p-4 bg-[#F2F2F2] dark:bg-[var(--bg-main)] min-h-screen">
            <div className="max-w-2xl mx-auto">
                <PostForm post={post} />
            </div>
        </div>
    );
}

export default EditPost;



// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import PostForm from "../forms/PostForm.jsx";
// import { usePost } from '../../context/PostContext.jsx';
// import Loader from '../common/Loader';

// const EditPost = () => {
//     const [post, setPost] = useState(null);
//     const { postId } = useParams();
//     const { getPostById } = usePost();

//     useEffect(() => {
//         if (postId) {
//             const fetchPost = async () => {
//                 const result = await getPostById(postId);
//                 if (result.success) {
//                     setPost(result.data);
//                 }
//             };
//             fetchPost();
//         }
//     }, [postId, getPostById]);

//     if (!post) return <Loader label="Loading Post Data..." />;

//     return (
//         <div className="w-full px-4 py-8 bg-[var(--bg-main)] min-h-[calc(100vh-var(--nav-h))] transition-colors duration-300">
//             <div className="max-w-2xl mx-auto">
//                 <h1 className="text-2xl font-black text-[var(--text-strong)] mb-8 uppercase tracking-[0.2em] flex items-center gap-3">
//                   <span className="opacity-50">📝</span> Edit Post
//                 </h1>
//                 <PostForm post={post} />
//             </div>
//         </div>
//     );
// }

// export default EditPost;