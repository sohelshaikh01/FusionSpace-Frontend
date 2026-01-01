import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, usePost } from '../../context';
import CommentForm from '../posts/CommentForm';
  
const CommentCard = ({ comment }) => {
  const [updating, setUpdating] = useState(false);
  const { isUser } = useAuth();
  const { deleteComment } = usePost();

  // Safety check for ID comparison
  const isAuthor = isUser && comment.ownerId?._id === isUser._id;

  const handleDelete = async () => {
    if (window.confirm("Delete this comment?")) {
      await deleteComment(comment._id);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-[#1A1A1A] rounded-xl border-l-4 border-neutral-700  shadow-sm border-y border-r border-black/5 dark:border-white/5 transition-all">
      {!updating ? (
        <div className="flex justify-between items-start gap-3">
          <div className="flex gap-3 flex-1">
            {/* Added Avatar for consistency with PostCard */}
            <img 
              src={comment.ownerId?.avatar} 
              className="w-8 h-8 rounded-full border border-neutral-700 object-cover shrink-0" 
              alt="avatar" 
            />
            <div className="flex-1 min-w-0">
              <Link 
                to={`/profile/${comment.ownerId?._id}`} 
                className="font-black text-neutral-700 dark:text-white text-xs hover:underline truncate block"
              >
                @{comment.ownerId?.username || "user"}
              </Link>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-0.5 leading-relaxed break-words">
                {comment.content}
              </p>
            </div>
          </div>

          {isAuthor && (
            <div className="flex gap-3 shrink-0 ml-2">
              <button 
                onClick={() => setUpdating(true)} 
                className="text-[10px] font-black uppercase text-gray-400 hover:text-neutral-700 dark:hover:text-white transition-colors"
              >
                Edit
              </button>
              <button 
                onClick={handleDelete} 
                className="text-[10px] font-black uppercase text-gray-400 hover:text-red-500 transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
            <CommentForm comment={comment} setUpdating={setUpdating} />
            <button 
              onClick={() => setUpdating(false)} 
              className="text-[10px] font-bold text-gray-500 dark:text-gray-400 w-fit hover:underline"
            >
              Cancel Edit
            </button>
        </div>
      )}
    </div>
  );
};

export default CommentCard;