import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSocial, useAuth } from "../../context";
import Loader from "../common/Loader";
import Button from "../common/Button";
import { ChevronDown } from "lucide-react";

const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { isUser: currentUser, isAuthenticated } = useAuth();
  const { 
    userProfile, getPublicUserProfile, followUser, unfollowUser,
    getFollowersList, getFollowingList, getUserPublicPosts
  } = useSocial();

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [publicPosts, setPublicPosts] = useState([]);

  const targetId = userId === "me" ? currentUser?._id : userId;
  const isOwnProfile = !userId || userId === currentUser?._id;

  useEffect(() => {
    setIsInitialized(false);
    if (targetId) {
      getPublicUserProfile(targetId);
      const fetchPosts = async () => {
        const response = await getUserPublicPosts(targetId);
        if (response?.success) setPublicPosts(response.data.posts || []);
      };
      fetchPosts();
      loadSocialLists();
    }
  }, [targetId]);

  useEffect(() => {
    if (userProfile && !isInitialized) {
      setIsFollowing(userProfile.isFollowing);
      setIsInitialized(true);
    }
  }, [userProfile, isInitialized]);

  const loadSocialLists = async () => {
    const [fer, fing] = await Promise.all([
      getFollowersList(targetId),
      getFollowingList(targetId)
    ]);
    if (fer.success) setFollowers(fer.data);
    if (fing.success) setFollowing(fing.data);
  };

  const handleFollowToggle = async () => {
    if (!isAuthenticated) return navigate("/login");

    const prev = isFollowing;
    setIsFollowing(!isFollowing);

    const result = prev ? await unfollowUser(targetId) : await followUser(targetId);
    // Change State

    if (!result.success) {
      setIsFollowing(prev);
    } else {
      loadSocialLists();
    }
  };

  if (!userProfile || userProfile.user?._id !== targetId && isInitialized) {
    return <Loader label="Scanning Profile..." />;
  }

  const toggleAccordion = (type) => setOpenAccordion(openAccordion === type ? null : type);

  return (
    <div className="w-full bg-[var(--bg-main)] min-h-[calc(100vh-var(--nav-h))] px-4 transition-colors duration-300">
      
      {/* Profile Header Card */}
      <div className="bg-[var(--bg-panel)] p-6 sm:p-8 rounded-[var(--radius)] shadow-[0_7px_20px_rgba(0,0,0,0.10)] dark:shadow-[0_7px_20px_rgba(0,0,0,0.50)]  border border-black/5 dark:border-white/10 mb-8 transition-colors">
        <div className="flex flex-col lg:flex-row items-center gap-4 md:gap-6">
          <img
            src={userProfile.user.avatar}
            className="w-28 md:w-32 h-28 md:h-32 rounded-full object-cover border-4 border-[var(--bg-deep)] shadow-sm"
            alt="avatar"
          />

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-strong)] uppercase tracking-tighter leading-none">
              {userProfile.user.fullName}
            </h1>
            <p className="text-[var(--accent-primary)] font-black text-sm mt-1 uppercase tracking-widest">@{userProfile.user.username}</p>
            <p className="mt-2 text-[var(--text-soft)] text-sm max-w-md font-medium leading-relaxed">
              {userProfile.user.bio || "No bio yet."}
            </p>
            
            <div className="mt-4 flex gap-8 justify-center md:justify-start border-t border-black/5 dark:border-white/5 pt-2">
               <div className="text-[10px] font-black text-[var(--text-soft)] uppercase tracking-widest">Posts <span className="text-[var(--text-strong)] block text-xl">{publicPosts.length}</span></div>
               <div className="text-[10px] font-black text-[var(--text-soft)] uppercase tracking-widest">Followers <span className="text-[var(--text-strong)] block text-xl">{followers.length}</span></div>
               <div className="text-[10px] font-black text-[var(--text-soft)] uppercase tracking-widest">Following <span className="text-[var(--text-strong)] block text-xl">{following.length}</span></div>
            </div>
          </div>

          <div className="w-full md:w-2/3 lg:w-auto px-8">
            {isOwnProfile ? (
              <Button btnG onClick={() => navigate("/profile/edit")} className="w-full sm:px-10 uppercase text-xs tracking-widest">
                Edit Profile
              </Button>
            ) : (
              <Button 
                btnP 
                onClick={handleFollowToggle}
                className={`w-full sm:px-10 uppercase text-xs tracking-widest transition-all ${isFollowing ? 'bg-[var(--bg-deep)] text-[var(--text-strong)] shadow-none translate-y-0.5' : ''}`}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Social Accordions Sidebar */}
        <aside className="w-full lg:w-[280px] flex flex-col gap-4">
          {['Followers', 'Following'].map((label) => {
            const type = label === 'Followers' ? 'fer' : 'fing';
            const list = label === 'Followers' ? followers : following;
            return (
              <div key={type} className="rounded-[var(--radius)] bg-[var(--bg-panel)] border border-black/5 dark:border-white/10 shadow-[var(--shadow-soft)] overflow-hidden">
                <button 
                  onClick={() => toggleAccordion(type)} 
                  className="w-full p-4 flex justify-between items-center bg-[var(--bg-deep)] dark:bg-white/5 font-black text-[10px] uppercase tracking-[0.2em] text-[var(--text-strong)]"
                >
                  {label}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openAccordion === type ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out ${openAccordion === type ? 'max-h-80 overflow-y-auto pb-4 pt-2' : 'max-h-0'}`}>
                  {list.length > 0 ? list.map(f => (
                    <Link key={f?._id} to={`/profile/${f?._id}`} className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--accent-primary)]/10 group transition-colors">
                      <img src={f?.avatar} className="w-8 h-8 rounded-full border border-[var(--bg-deep)]" alt="av" />
                      <span className="text-xs font-bold text-[var(--text-strong)] group-hover:text-[var(--accent-primary)]">@{f?.username}</span>
                    </Link>
                  )) : <p className="text-[10px] text-center text-[var(--text-soft)] font-black py-4 uppercase">None yet</p>}
                </div>
              </div>
            );
          })}
        </aside>

        {/* User Posts Feed */}
        <section className="flex-1">
          <h3 className="font-black text-[var(--text-strong)] mb-6 text-sm uppercase tracking-[0.2em] flex items-center gap-3 px-1">
            Public Posts
            <div className="h-[2px] flex-1 bg-[var(--text-strong)] opacity-10" />
          </h3>

          {publicPosts.length === 0 ? (
            <div className="py-24 flex flex-col items-center justify-center bg-[var(--bg-panel)] rounded-[var(--radius)] border-2 border-dashed border-[var(--bg-deep)] text-center opacity-70">
              <div className="text-5xl mb-4 grayscale opacity-30">🗞️</div>
              <p className="text-[var(--text-soft)] font-black uppercase text-xs tracking-widest">This user hasn't posted signal yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {publicPosts.map((post) => (
                <div 
                  key={post._id}
                  onClick={() => navigate(`/posts/${post._id}`)}
                  className="group cursor-pointer flex flex-col bg-[var(--bg-panel)] h-[360px] overflow-hidden rounded-[var(--radius)] shadow-[0_7px_20px_rgba(0,0,0,0.10)] dark:shadow-[0_7px_20px_rgba(0,0,0,0.50)]  border border-black/5 dark:border-white/5 active:scale-[0.98] transition-all"
                >
                  <div className="p-4 flex gap-3 items-center">
                    <img src={post.owner.avatar} className="w-8 h-8 rounded-full border border-[var(--bg-deep)] object-cover" alt="avatar" />
                    <div className="flex flex-col">
                      <span className="text-[var(--text-strong)] font-black text-xs">@{post.owner.username}</span>
                      <span className="text-[var(--accent-primary)] text-[9px] font-black uppercase tracking-widest">❤️ {post.likeCount} Likes</span>
                    </div>
                  </div>
                  <div className="px-4 pb-4 text-[var(--text-normal)] text-sm font-bold line-clamp-2 leading-tight">
                    {post.text}
                  </div>
                  {post.image ? (
                    <div className="flex-1 w-full bg-[var(--bg-deep)] overflow-hidden border-t border-black/5">
                      <img src={post.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="post" />
                    </div>
                  ) : (
                    <div className="flex-1 bg-gradient-to-br from-black/5 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;