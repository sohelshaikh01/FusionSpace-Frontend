import React from 'react';
import { Link } from 'react-router-dom';
import { BiLike } from 'react-icons/bi';

const HeadingCard = ({ post }) => {
  return (
    <Link 
      to={`/posts/${post.postId}`} 
      className="rounded-xl p-4 bg-slate-300 dark:bg-[#1A1A1A] border border-[var(--glass-border)] dark:border-white/5 shadow-sm hover:border-[var(--accent-focus)] transition-all"
    >
      <h2 className="font-black text-neutral-800 dark:text-white leading-tight">{post.headline}</h2>
      <p className="flex items-center gap-2 text-sm text-[var(--accent-focus)] mt-2 font-bold">
        <BiLike size={17} /> {post.likeCount} likes
      </p>
    </Link>
  );
};

export default HeadingCard;