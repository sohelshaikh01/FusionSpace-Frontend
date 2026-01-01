import React, { useState } from 'react';
import { usePost } from '../../context/PostContext';
import Button from '../common/Button';

const CommentSection = ({ postId, comments }) => {
  const { createComment } = usePost();
  const [commentText, setCommentText] = useState('');

  const handleSend = async () => {
    if (!commentText.trim()) return;
    const result = await createComment(postId, commentText);
    if (result.success) setCommentText('');
  };

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="font-black text-sm uppercase muted mb-4">Discussion</h3>
      
      {/* Input */}
      <div className="flex gap-3 mb-6">
        <input 
          className="input flex-1"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button btnP onClick={handleSend}>Reply</Button>
      </div>

      {/* List */}
      <div className="flex flex-col gap-4">
        {comments?.length > 0 ? (
          comments.map((c) => (
            <div key={c._id} className="flex gap-3 items-start animate-fade-in">
              <img src={c.owner?.avatar} className="w-8 h-8 rounded-full" alt="user" />
              <div className="bg-gray-50 p-3 rounded-xl flex-1 border border-black/5">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-sm">@{c.owner?.username}</span>
                  <span className="extra-small muted">Just now</span>
                </div>
                <p className="text-sm">{c.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="muted small italic text-center py-4">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;