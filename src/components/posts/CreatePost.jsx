import React from 'react';
import PostForm from './PostForm';

const CreatePost = () => {
  return (
    <div className='w-full sm:p-4 bg-[var(--bg-main)] min-h-[calc(100vh-var(--nav-h))] transition-colors duration-300'>
       <div className="max-w-2xl mx-auto">
            <PostForm />
       </div>
    </div>
  )
}

export default CreatePost;