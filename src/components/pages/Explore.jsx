import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../common/Loader';
import PostCard from "../posts/PostCard";
import HeadingCard from "../posts/HeadingCard";

import { usePost } from "../../context/PostContext";
import { useAuth } from "../../context/AuthContext";
import { useSocial } from '../../context/SocialContext';

const ExplorePage = () => {
  const { explorePosts, fetchExplore, isLoading, error } = usePost();
  const { getSearch } = useSocial();
  const { isAuthenticated } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState({ users: [], communities: [] });
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isAuthenticated) fetchExplore();
  }, [isAuthenticated]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setIsSearching(false);
      return;
    }
    const response = await getSearch(searchTerm);
    if (response.success) {
      setResults(response.data);
      setIsSearching(true);
    }
  };

  if (isLoading) return <Loader label="Fetching Explore Page..." />;

  return (
    <div className="w-full bg-[var(--bg-main)] min-h-[calc(100vh-var(--nav-h))] sm:p-4 sm:px-6 transition-colors duration-300">
      {isAuthenticated ? (
        <div className="max-w-7xl mx-auto">
          {/* Search Bar Section */}
          <form onSubmit={handleSearch} className="mb-10 flex gap-2">
            <input
              type="text"
              placeholder="Search users or communities..."
              className="flex-1 bg-[var(--bg-panel)] border border-white/10 p-3 rounded-[var(--radius)] text-[var(--text-strong)] shadow-[0_7px_20px_rgba(0,0,0,0.10)] dark:shadow-[0_7px_20px_rgba(0,0,0,0.50)] outline-none focus:border-[var(--accent-primary)]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-[var(--accent-primary)] px-5 rounded-[var(--radius)] font-black text-white uppercase text-xs tracking-widest shadow-[0_4px_0_#c75014] active:translate-y-1 active:shadow-none"
            >
              Search
            </button>
            {isSearching && (
              <button 
                type="button"
                onClick={() => { setIsSearching(false); setSearchTerm(""); }}
                className="text-[var(--text-soft)] px-3 py-2 border border-black/10 uppercase text-[12px] font-bold bg-gray-200 mt-1 rounded-md"
              >
                Clear
              </button>
            )}
          </form>

          {error && (
            <p className="text-white bg-[var(--accent-danger)] p-3 rounded-[var(--radius)] mb-8 font-black text-center shadow-[0_4px_0_#b02b38] uppercase text-xs tracking-widest">
              {error}
            </p>
          )}

          {isSearching ? (
            /* Search Results View */
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-black text-[var(--text-strong)] mb-8 uppercase tracking-widest">Results for "{searchTerm}"</h2>
              
              <div className="grid gap-8">
                {/* Users Results */}
                <section>
                  <h3 className="text-[var(--accent-focus)] text-xs font-black mb-4 uppercase tracking-widest">People</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.users?.map(user => (
                      <Link to={`/profile/${user._id}`} key={user._id} className="bg-[var(--bg-panel)] p-4 rounded-[var(--radius)] border border-white/5 hover:border-[var(--accent-primary)] transition-all shadow-[0_7px_20px_rgba(0,0,0,0.10)] dark:shadow-[0_7px_20px_rgba(0,0,0,0.50)] flex items-center gap-4">
                        <img src={user.avatar} className="w-10 h-10 bg-[var(--bg-deep)] rounded-full flex items-center justify-center font-bold text-[var(--accent-primary)]" />
                        <span className="font-bold text-[var(--text-strong)]">{user.username}</span>
                      </Link>
                    ))}
                    {results.users?.length === 0 && <p className="text-[var(--text-soft)] text-sm">No users found.</p>}
                  </div>
                </section>

                {/* Communities Results */}
                <section>
                  <h3 className="text-[var(--accent-focus)] text-xs font-black mb-4 uppercase tracking-widest">Communities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.communities?.map(comm => (
                      <Link to={`/communities/${comm._id}`} key={comm._id} className="bg-[var(--bg-panel)] p-4 rounded-[var(--radius)] shadow-[0_7px_20px_rgba(0,0,0,0.10)] dark:shadow-[0_7px_20px_rgba(0,0,0,0.50)] border border-white/5 hover:border-[var(--accent-primary)] transition-all">
                        <span className="font-bold text-[var(--text-strong)]"># {comm.communityName}</span>
                      </Link>
                    ))}
                    {results.communities?.length === 0 && <p className="text-[var(--text-soft)] text-sm">No communities found.</p>}
                  </div>
                </section>
              </div>
            </div>
          ) : (
            /* Default Explore View */
            <>
              <section className="mb-14">
                <h2 className="text-sm md:text-base text-[var(--accent-focus)] font-black mb-8 flex items-center justify-center gap-4 uppercase tracking-[0.2em]">
                  <div className="h-[2px] w-8 md:w-12 bg-[var(--accent-focus)] opacity-30" />
                  Trending Headlines
                  <div className="h-[2px] w-8 md:w-12 bg-[var(--accent-focus)] opacity-30" />
                </h2>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                  {explorePosts?.trendingHeadlines?.map((post) => (
                    <HeadingCard key={post.postId} post={post} />
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-sm md:text-base text-[var(--text-strong)] font-black mb-8 text-center uppercase tracking-[0.2em]">
                  Explore Feed
                </h2>
                <div className="feed-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {explorePosts?.exploreFeed?.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      ) : (
        /* Unauthenticated View remains the same */
        <section className="flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-500">
          {/* ... existing code ... */}
          <div className="bg-[var(--bg-panel)] p-8 sm:p-12 rounded-[var(--radius)] shadow-[var(--shadow-soft)] border border-black/5 dark:border-white/10 max-w-lg transition-colors">
            <div className="w-20 h-20 bg-[var(--bg-deep)] rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <svg className="w-10 h-10 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-black text-[var(--text-strong)] mb-4 tracking-tight">
              Discover What's New
            </h1>
            
            <p className="text-[var(--text-soft)] mb-10 text-lg font-medium leading-relaxed">
              Explore trending headlines and global conversations. Sign in to join the discussion.
            </p>

            <Link
              to="/login"
              className="inline-block w-full bg-[var(--accent-primary)] text-white font-black py-4 px-8 rounded-[var(--radius)] shadow-[0_4px_0_#c75014] transition-all active:translate-y-1 active:shadow-none uppercase tracking-widest text-xs"
            >
              Login to Explore
            </Link>
            
            <p className="mt-8 text-sm text-[var(--text-soft)]">
              New here? <Link to="/signup" className="text-[var(--accent-focus)] font-black hover:underline underline-offset-4 transition">Create an account</Link>
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

export default ExplorePage;

