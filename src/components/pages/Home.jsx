import React, { useEffect } from 'react';
import { useAuth } from "../../context";
import { usePost } from '../../context';
import Loader from '../common/Loader';
import PostCard from '../posts/PostCard';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { feedPosts, fetchFeed, isLoading, error } = usePost();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) fetchFeed();
  }, [isAuthenticated]);

  if (isLoading && !feedPosts?.length) {
    return <Loader label="Syncing Feed..." />;
  }

  return (
  <div className="home-page-container sm:px-4 w-full bg-[var(--bg-main)] min-h-[calc(100vh-var(--nav-h))] flex flex-col transition-colors duration-300">
    
    {/* Error Banner with Tactile Style */}
    {isAuthenticated && error && (
      <div className="max-w-3xl mx-auto w-full mt-4">
        <p className="text-white bg-[var(--accent-danger)] p-3 rounded-[var(--radius)] font-black text-center shadow-[0_4px_0_#b02b38] uppercase text-xs tracking-widest">
          {error}
        </p>
      </div>
    )}

    {/* Authenticated Feed */}
    {isAuthenticated ? (
      <section className="feed-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {feedPosts && feedPosts.length > 0 ? (
          feedPosts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          !isLoading && (
            <div className="col-span-full py-24 flex flex-col items-center justify-center bg-[var(--bg-panel)] rounded-[var(--radius)] border border-dashed border-[var(--bg-deep)] dark:border-white/10 shadow-inner">
              <div className="text-5xl mb-4 grayscale opacity-50">📭</div>
              <p className="text-[var(--text-soft)] font-black text-lg md:text-xl tracking-tight">
                Your feed is empty
              </p>
              <p className="text-[var(--text-soft)] text-sm mt-1 opacity-70">
                Follow some users to see what's happening!
              </p>
            </div>
          )
        )}
    </section>
      ) : (
        /* Improved Unauthenticated State */
        <section className="flex-1 flex flex-col items-center justify-center text-center px-6 animate-in fade-in duration-500">
          <div className="max-w-md w-full bg-[var(--bg-panel)] p-8 sm:p-10 rounded-[var(--radius)] shadow-[var(--shadow-soft)] border border-black/5 dark:border-white/10 transition-colors">
            {/* Retro Icon Wrap */}
            <div className="mb-6 text-6xl drop-shadow-md">👋</div>
            
            <h1 className="text-3xl font-black text-[var(--text-strong)] mb-4 tracking-tight">
              Welcome to the Feed
            </h1>
            
            <p className="text-[var(--text-soft)] mb-8 font-medium leading-relaxed">
              Join our community to see what's happening. Sign in to see posts from people you follow.
            </p>
            
            <div className="flex flex-col gap-4">
              <Link
                to="/login"
                className="bg-[var(--accent-primary)] text-white font-black py-3.5 px-6 rounded-[var(--radius)] shadow-[0_4px_0_#c75014] transition-all active:translate-y-1 active:shadow-none uppercase tracking-widest text-xs"
              >
                Login to Your Account
              </Link>
              
              <Link
                to="/signup"
                className="text-[var(--text-soft)] hover:text-[var(--text-strong)] font-bold transition-colors text-sm"
              >
                Don't have an account? <span className="text-[var(--accent-focus)] underline underline-offset-4">Sign up</span>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;