import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth, usePost } from '../../context';

import Loader from '../common/Loader';
import Button from '../common/Button';
import CreateComment from "../posts/CommentForm";
import CommentCard from '../posts/CommentCard';

const PostDetailPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { currentPost, getPostById, isLoading, togglePostLike, postComments, getComments, deleteAPost } = usePost();
  const { isUser } = useAuth();

  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getPostById(postId);
    getComments(postId);
  }, [postId]);

  useEffect(() => {
    if (currentPost) {
      setLiked(currentPost.isLiked);
      setCount(currentPost.likeCount);
    }
  }, [currentPost]);

  const handleLikeToggle = async () => {
    if (!isUser) return navigate("/login");

    const prevLiked = liked;
    setLiked(!liked);

    const result = await togglePostLike(currentPost._id);

    if (!result.success) setLiked(prevLiked);

    // const prevLiked = liked;
    // const prevCount = count;

    // setLiked(!prevLiked);
    // setCount(prevLiked ? prevCount - 1 : prevCount + 1);

    // const result = await togglePostLike(currentPost._id);

    // if (!result.success) {
    //   setLiked(prevLiked);
    //   setCount(prevCount);
    // }
  };

  const handleDelete = (postId) => {
    deleteAPost(postId);
    navigate("/");
  };

  // Logic remains the same, styling updated to use variables
  const isAuthor = currentPost ? currentPost.owner?._id === isUser?._id : false;

  if (isLoading || !currentPost) return <Loader label="Loading Post..." />;

  return (
    <div className="w-full bg-[var(--bg-main)] min-h-[calc(100vh-var(--nav-h))] flex flex-col md:flex-row gap-8 sm:px-4 transition-colors duration-300">
      
      {/* LEFT: Post Content */}
      <article className="bg-[var(--bg-panel)] p-6 rounded-[var(--radius)] shadow-[var(--shadow-soft)] border border-black/5 dark:border-white/10 w-full h-fit transition-colors">

        <header className="flex justify-between items-center mb-6">
          <div className="flex gap-3 items-center">
            <img 
              src={currentPost.owner?.avatar} 
              className="w-12 h-12 rounded-full border-2 border-[var(--bg-deep)] object-cover" 
              alt="author" 
            />
            <div className='flex flex-col'>
              <Link to={`/profile/${currentPost.owner?._id}`} className="font-black text-[var(--text-strong)] leading-tight hover:text-[var(--accent-primary)] transition-colors">
                @{currentPost.owner?.owner || 'user'}
              </Link>
              <Link to={`${currentPost.communityDetails ? `/communities/${currentPost.communityDetails?._id}` : "/"}`} className="text-[var(--text-soft)] text-[10px] font-bold uppercase tracking-widest mt-0.5">
                In <span className="text-[var(--accent-primary)]">#{currentPost.communityDetails?.communityName || 'Public'}</span>
              </Link>
            </div>
          </div>

          <div className='flex gap-2'>
            {isAuthor ? (
              <>
                <Button btnG className="text-xs uppercase" onClick={() => navigate(`/posts/${postId}/edit`)}>Edit</Button>
                <Button btnG className="text-xs uppercase text-[var(--accent-danger)] border-[var(--accent-danger)]/20" onClick={() => handleDelete(postId)}>Delete</Button>
              </>
            ) : (
              <Button btnG className="text-xs uppercase">Follow</Button>
            )}
          </div>
        </header>

        <div className="text-lg text-[var(--text-normal)] leading-relaxed font-medium mb-6">
          {currentPost.text}
        </div>

        {currentPost.image && (
          <div className="relative rounded-[var(--radius)] overflow-hidden border border-black/5 dark:border-white/5 mb-6 shadow-inner">
            <img src={currentPost.image} alt="post" className="w-full object-cover max-h-[500px]" />
          </div>
        )}

        <footer className="pt-4 border-t border-black/5 dark:border-white/10 flex gap-4">
          <Button 
            onClick={handleLikeToggle} 
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black uppercase text-xs tracking-widest transition-all
              ${liked 
                ? 'bg-[var(--accent-danger)] text-white shadow-[0_4px_0_#b02b38] active:translate-y-1 active:shadow-none' 
                : 'bg-[var(--bg-deep)] text-[var(--text-strong)] border border-black/5'}`}
          >
            <span className={liked ? "scale-125 transition-transform" : ""}>
              {liked ? "❤️" : "🤍"}
            </span> {count}
            <span className="hidden sm:inline">
              Likes</span>
          </Button>
          <Button btnG className="text-xs uppercase tracking-widest">🔗 Share</Button>
        </footer>
      </article>

      {/* RIGHT: Comments Section */}
      <section className="sm:w-full">
        <h3 className="font-black text-[var(--text-strong)] mb-6 text-sm uppercase tracking-[0.2em] flex items-center gap-3">
          Comments
          <div className="h-[2px] flex-1 bg-[var(--text-strong)] opacity-10" />
        </h3>
        
        <div className="bg-[var(--bg-panel)] p-5 rounded-[var(--radius)] mb-8 shadow-[var(--shadow-soft)] border border-black/5 dark:border-white/10">
          <CreateComment postId={postId} />
        </div>

          <div className="space-y-4">
          {postComments?.length > 0 ? (
            postComments.map((comment) => (
              <CommentCard key={comment._id} comment={comment} />
            ))
          ) : (
            <div className="bg-white/50 dark:bg-white/5 rounded-xl py-10 text-center border-2 border-dashed border-black/5 dark:border-white/5">
                <p className="text-gray-400 font-medium">No comments yet. Be the first to reply!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PostDetailPage;