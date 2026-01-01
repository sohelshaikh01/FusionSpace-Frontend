import React, { useState } from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { usePost } from '../context/PostContext';

const LikeButton = ({ postId, isLiked, likeCount }) => {
  const { togglePostLike } = usePost();
  const [localLoading, setLocalLoading] = useState(false);

  const handleLike = async (e) => {
    e.stopPropagation(); // Prevents navigating to post details when liking
    setLocalLoading(true);
    await togglePostLike(postId);
    setLocalLoading(false);
  };

  return (
    <button 
      onClick={handleLike}
      disabled={localLoading}
      className={`flex items-center gap-1.5 font-bold transition-all active:scale-90 ${
        isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-400'
      }`}
    >
      {isLiked ? <HiHeart size={20} /> : <HiOutlineHeart size={20} />}
      <span className="text-sm">{likeCount}</span>
    </button>
  );
};

export default LikeButton;