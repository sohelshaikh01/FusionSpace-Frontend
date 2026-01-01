import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/posts/${post._id}`)}
      className="group cursor-pointer bg-[var(--bg-panel)] h-[275px]  sm:h-[360px] lg:h-[360px] flex flex-col overflow-hidden rounded-[var(--radius)] shadow-[var(--shadow-soft)] border border-black/5 dark:border-white/10 transition-all duration-200 active:scale-[0.98]"
    >
      {/* Header Section */}
      <div className="flex gap-3 items-center p-4">
        <img 
          src={post.owner.avatar} 
          className="w-10 h-10 rounded-full border-2 border-[var(--bg-deep)] group-hover:border-[var(--accent-primary)] transition-colors object-cover" 
          alt="avatar" 
        />
        <div className="flex flex-col">
          <Link 
            to={`/profile/${post.owner._id}`} 
            onClick={(e) => e.stopPropagation()} 
            className="text-[var(--text-strong)] hover:text-[var(--accent-primary)] font-black text-sm tracking-tight z-10"
          >
            @{post.owner.username}
          </Link>
          <span className="text-[var(--text-soft)] text-[10px] font-bold uppercase tracking-widest">
            {post.likeCount} Likes
          </span>
        </div>
      </div>

      {/* Content Text - Removed margin bottom */}
      <div className="px-4 pb-4 text-sm font-bold text-[var(--text-normal)] line-clamp-2 leading-relaxed">
        {post.text}
      </div>

      {/* Image Section - Removed margin top and mt-auto */}
      {post.image ? (
        <div className="relative flex-1 w-full overflow-hidden bg-[var(--bg-deep)] border-t border-black/5 dark:border-white/5">
          <img 
            src={post.image} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            alt="post content" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      ) : (
        /* Empty space filler for text-only posts */
        <div className="flex-1 w-full bg-gradient-to-br from-black/5 to-transparent dark:from-white/5" />
      )}
    </div>
  );
};

export default PostCard;