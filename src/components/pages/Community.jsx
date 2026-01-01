import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../common/Loader';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { useCommunity } from '../../context/CommunityContext';

export const Community = () => {

  const { myCommunities, fetchMyCommunities, isLoading } = useCommunity();
  const { isAuthenticated, error } = useAuth();


  useEffect(() => {
    if (isAuthenticated) fetchMyCommunities();
  }, [isAuthenticated]);

  if (isLoading) return <Loader label="Loading Communities..." />;

  return (
    <div className="w-full bg-[var(--bg-main)] min-h-[calc(100vh-var(--nav-h))] sm:px-6 sm:py-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        
        {isAuthenticated ? (
          <>
            {error && (
              <p className="text-white bg-[var(--accent-danger)] p-3 rounded-[var(--radius)] mb-6 font-black text-center shadow-[0_4px_0_#b02b38] uppercase text-xs tracking-widest">
                {error}
              </p>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <h2 className="text-2xl font-black text-[var(--text-strong)] uppercase tracking-tight">
                My Communities
              </h2>
              <Link to="/communities/create" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-[var(--accent-primary)] text-white shadow-[0_4px_0_#c75014] rounded-xl px-6 font-black py-3 active:translate-y-1 active:shadow-none transition-all uppercase text-xs tracking-widest">
                  ＋ Create New
                </Button>
              </Link>
            </div>

            {!myCommunities?.length ? (
              <div className="py-24 flex flex-col items-center justify-center bg-[var(--bg-panel)] rounded-[var(--radius)] border border-dashed border-[var(--bg-deep)] dark:border-white/10 shadow-inner text-center">
                <div className="text-5xl mb-4 grayscale opacity-40">👥</div>
                <p className="text-[var(--text-soft)] font-black text-lg md:text-xl tracking-tight">
                  No Communities joined yet.
                </p>
                <Link to="/explore" className="text-[var(--accent-focus)] font-bold text-sm mt-2 hover:underline">
                  Discover interesting spaces
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {myCommunities.map((community) => (
                  <Link 
                    key={community._id} 
                    to={`/communities/${community._id}`} 
                    className="group p-5 rounded-[var(--radius)] bg-[var(--bg-panel)] shadow-[var(--shadow-soft)] border border-black/5 dark:border-white/5 hover:border-[var(--accent-primary)] transition-all active:scale-[0.98]"
                  >
                    <div className="flex gap-4 items-center">
                      <img 
                        src={community.avatar} 
                        className="w-16 h-16 rounded-xl border-2 border-[var(--bg-deep)] group-hover:border-[var(--accent-primary)] object-cover transition-colors" 
                        alt="community avatar" 
                      />
                      <div className="flex-1">
                        <div className="font-black text-[var(--text-strong)] group-hover:text-[var(--accent-primary)] transition-colors text-lg tracking-tight">
                          #{community.communityName}
                        </div>
                        <div className="text-[10px] font-black mt-1.5 text-[var(--accent-primary)] flex items-center gap-2 uppercase tracking-widest">
                          <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
                          {community.membersCount} Members
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : (
          /* Improved Unauthenticated State */
          <section className="flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-500">
            <div className="max-w-md w-full bg-[var(--bg-panel)] p-8 sm:p-10 rounded-[var(--radius)] shadow-[var(--shadow-soft)] border border-black/5 dark:border-white/10 transition-colors">
              <div className="w-20 h-20 bg-[var(--bg-deep)] rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <svg className="w-10 h-10 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>

              <h1 className="text-3xl font-black text-[var(--text-strong)] mb-4 tracking-tight">
                Find Your People
              </h1>
              <p className="text-[var(--text-soft)] mb-10 font-medium leading-relaxed">
                Discover unique communities, share your interests, and start new conversations.
              </p>

              <div className="flex flex-col gap-4">
                <Link
                  to="/login"
                  className="bg-[var(--accent-primary)] text-white font-black py-4 rounded-[var(--radius)] shadow-[0_4px_0_#c75014] transition-all active:translate-y-1 active:shadow-none uppercase tracking-widest text-xs"
                >
                  Sign in to Join
                </Link>
                <p className="text-sm text-[var(--text-soft)]">
                  Want to build your own? <Link to="/signup" className="text-[var(--accent-focus)] font-black hover:underline underline-offset-4">Sign up now</Link>
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Community;