import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import { usePost } from '../../context/PostContext';

const CommentForm = ({ postId, comment, setUpdating }) => {
  const [content, setContent] = useState(comment ? comment.content : "");
  const { createComment, editComment, isLoading } = usePost();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      if (comment) {
        console.log("Content is", content);
        await editComment(comment._id, content);
        setUpdating(false); // Close edit mode on success
      } else {
        console.log(content);
        await createComment(postId, content.trim());
        setContent(""); // Reset input
      }
    } catch (err) {
      console.error("Comment action failed:", err);
    }
  };
    
  return (
    <form onSubmit={handleSubmit} className="flex gap-3 w-full items-end">
       <Input
            name="comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="text"
            className="flex-1 bg-white dark:bg-[#262626] border-black/5 dark:border-white/10 text-gray-700 dark:text-white" 
            placeholder={comment ? "Edit your reply..." : "Write a quick reply..."} 
        />

        <Button 
            type="submit" 
            btnP 
            disabled={isLoading || !content.trim()}
            className="whitespace-nowrap"
        >    
            {isLoading ? "..." : comment ? "Save" : "Reply"}
        </Button>
    </form>
  );
}

export default CommentForm;