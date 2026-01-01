import React, { useEffect } from 'react';
import { usePost } from "../../context/PostContext";
import Loader from "../common/Loader";
import PostCard from "../posts/PostCard";
import { Link } from 'react-router-dom';

const TrendingPage = () => {
  const { trendingData, fetchTrending, error, isLoading } = usePost();

  useEffect(() => {
    fetchTrending();
  }, []);

  if (isLoading) return <Loader label="Fetching Trends..." />;

  return (
  <div className="trending-container sm:px-4 min-h-screen">
    {error && <p className="text-[var(--accent-danger)] mb-4">{error}</p>}

    <section className="community-list">
      <h2 className="text-xl text-[var(--accent-primary)] font-black mb-4 uppercase tracking-tight">
        Popular Communities
      </h2>
      <div className="feed-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {trendingData?.trendingCommunities?.map((community) => (
          <Link 
            to={`/communities/${community._id}`} 
            key={community._id} 
            className="flex gap-4 items-center p-3 rounded-[var(--radius)] bg-gradient-to-tr from-red-500 to-red-400 dark:bg-[#1A1A1A] border border-transparent hover:border-[var(--accent-primary)] transition-all shadow-sm"
          >
            <img src={community.avatar} className="w-14 h-14 rounded-lg object-cover border border-black/5 dark:border-white/10" alt="community" />
            <div>
              <div className="font-extrabold text-base text-[var(--text-strong)] dark:text-white">
                #{community.communityName}
              </div>
              <small className="text-[var(--text-soft)] dark:text-gray-400 font-medium">
                {community.membersCount} Members
              </small>
            </div>
          </Link>
        ))}
      </div>
    </section>

    <h2 className="text-xl text-[var(--accent-primary)] font-black mb-4 mt-10 uppercase tracking-tight">
      Trending Posts
    </h2>

    <section className="feed-list grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
      {trendingData?.trendingPosts?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </section>

    {!isLoading && !trendingData?.trendingPosts?.length && (
      <p className="text-2xl font-black mt-10 text-center text-[var(--text-soft)] dark:text-gray-500">
        Trending is currently empty.
      </p>
    )}
  </div>
);
};

export default TrendingPage;