import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth, useCommunity } from '../../context';
import Loader from '../common/Loader';
import Button from '../common/Button';
import { ChevronDown } from 'lucide-react';

const CommunityDetail = () => {
  const { communityId } = useParams();
  const { currentCommunity, getCommunityDetails, getCommunityPosts, joinCommunity, leaveCommunity, deleteCommunity } = useCommunity();
  const { isUser, isAuthenticated } = useAuth(); // Integrated isAuthenticated
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [isMember, setIsMember] = useState(false);
  const [isMembersOpen, setIsMembersOpen] = useState(false);

  useEffect(() => {
    getCommunityDetails(communityId);
    (async () => {
      const response = await getCommunityPosts(communityId);
      if (response?.data) setCommunityPosts(response.data.posts);
    })();
  }, [communityId]);

  useEffect(() => {
    if (currentCommunity) setIsMember(currentCommunity.isMember);
  }, [currentCommunity]);

  if (!currentCommunity || currentCommunity._id !== communityId) {
    return <Loader label="Entering Community..." />;
  }

  // Use isUser for author check
  const isAuthor = currentCommunity.ownerId?._id === isUser?._id;

  const handleJoinAction = async () => {
    if (!isAuthenticated) return navigate("/login");
    const previousStatus = isMember;
    setIsMember(!isMember);
    const result = isMember ? await leaveCommunity(communityId) : await joinCommunity(communityId);
    if (!result.success) setIsMember(previousStatus);
  };

  const confirmDelete = async () => {
    const result = await deleteCommunity(communityId);
    setShowDeleteModal(false);
    if (result.success) navigate("/communities");
  };

  return (
    <div className="w-full bg-[var(--bg-main)] min-h-[calc(100vh-var(--nav-h))] px-4 sm:px-8 sm:p-0 transition-colors duration-300">
      
      {/* Delete Modal - Retro Tactile Style */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[var(--bg-panel)] w-full max-w-sm p-8 rounded-[var(--radius)] shadow-[var(--shadow-soft)] border border-black/10 dark:border-white/10 animate-in zoom-in duration-200">
            <h2 className="text-xl font-black text-[var(--text-strong)] uppercase tracking-tight">Delete Community?</h2>
            <p className="text-[var(--text-soft)] mt-2 text-sm">
              This action is permanent for <span className="text-[var(--text-strong)] font-black">#{currentCommunity.communityName}</span>.
            </p>
            <div className="flex gap-3 mt-8">
              <Button btnG className="flex-1 uppercase text-xs tracking-widest" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
              <Button btnD className="flex-1 uppercase text-xs tracking-widest" onClick={confirmDelete}>Delete</Button>
            </div>
          </div>
        </div>
      )}

      {/* Header Panel */}
      <div className="bg-[var(--bg-panel)] p-5 sm:p-8 rounded-[var(--radius)] shadow-[var(--shadow-soft)] border border-black/5 dark:border-white/10">
        <div className="flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">

          <div className="flex items-start gap-4 sm:gap-8">
            <img 
              src={currentCommunity.avatar} 
              className="w-20 h-20 sm:w-32 sm:h-32 rounded-[var(--radius)] border-2 border-[var(--bg-deep)] shadow-sm object-cover shrink-0" 
              alt="logo" 
            />
            <div className="flex-1">
              <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-strong)] uppercase tracking-tighter leading-none">
                #{currentCommunity.communityName}
              </h1>
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-deep)] dark:bg-white/5 rounded-full border border-black/5">
                <span className="text-[10px] sm:text-xs font-black text-[var(--text-strong)] uppercase tracking-widest">👤 {currentCommunity.membersCount} Members</span>
              </div>
              <p className="hidden sm:block text-[var(--text-soft)] mt-4 text-sm max-w-lg font-medium leading-relaxed">{currentCommunity.description}</p>
            </div>
          </div>

          <p className="sm:hidden text-[var(--text-soft)] text-xs font-medium px-1">{currentCommunity.description}</p>

          <div className="w-full sm:w-auto">
            {isAuthor ? (
              <Button btnD className="w-full sm:w-auto text-xs uppercase tracking-widest px-8" onClick={() => setShowDeleteModal(true)}>Delete Space</Button>
            ) : (
              <Button 
                btnP 
                className={`w-full sm:w-auto sm:px-10 text-xs uppercase tracking-widest ${isMember ? 'opacity-70 shadow-none translate-y-0.5' : ''}`} 
                onClick={handleJoinAction}
              >
                {isMember ? "Joined" : "Join Community"}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        {/* Sidebar Info */}
        <aside className="w-full lg:w-[280px] flex flex-col gap-4">
          <div className="p-5 rounded-[var(--radius)] bg-[var(--bg-panel)] border border-black/5 dark:border-white/10 shadow-[var(--shadow-soft)]">
            <div className="font-black text-[var(--text-strong)] border-b border-black/5 pb-3 text-[10px] uppercase tracking-[0.2em] opacity-60">Administrator</div>
            <Link to={`/profile/${currentCommunity.ownerId?._id}`} className="flex items-center gap-3 mt-4 group">
              <img src={currentCommunity.ownerId?.avatar} className="w-10 h-10 rounded-full border-2 border-[var(--bg-deep)] group-hover:border-[var(--accent-primary)] transition-colors" alt="admin" />
              <div className="flex flex-col">
                <strong className="text-sm text-[var(--text-strong)] font-black tracking-tight">@{currentCommunity.ownerId?.username}</strong>
                <small className="text-[var(--accent-primary)] text-[9px] uppercase font-black tracking-tighter">Founder</small>
              </div>
            </Link>
          </div>

          {/* Members Accordion */}
          <div className="rounded-[var(--radius)] bg-[var(--bg-panel)] border border-black/5 dark:border-white/10 shadow-[var(--shadow-soft)] overflow-hidden">
            <button 
              onClick={() => setIsMembersOpen(!isMembersOpen)}
              className="w-full flex items-center justify-between p-4 bg-[var(--bg-deep)] dark:bg-white/5"
            >
              <span className="font-black text-[var(--text-strong)] text-[10px] uppercase tracking-[0.2em]">Community Members</span>
              <ChevronDown className={`w-4 h-4 text-[var(--text-strong)] transition-transform duration-300 ${isMembersOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <div className={`transition-all duration-300 ease-in-out ${isMembersOpen ? 'max-h-[400px] overflow-y-auto pb-4 pt-2' : 'max-h-0'}`}>
              {currentCommunity?.members?.filter(m => m._id !== currentCommunity.ownerId?._id).map((member) => (
                <Link 
                  key={member._id} 
                  to={`/profile/${member._id}`} 
                  className="flex items-center gap-3 px-4 py-2 hover:bg-[var(--accent-primary)]/10 transition-colors group"
                >
                  <img src={member.avatar} className="w-8 h-8 rounded-full border border-[var(--bg-deep)] object-cover" alt={member.username} />
                  <strong className="text-xs text-[var(--text-strong)] font-bold group-hover:text-[var(--accent-primary)]">@{member.username}</strong>
                </Link>
              ))}
              {currentCommunity?.membersCount <= 1 && <p className="text-[10px] text-center text-[var(--text-soft)] font-bold py-4 uppercase">No other members yet</p>}
            </div>
          </div>
        </aside>

        {/* Community Feed */}
        <section className="flex-1">
          <h3 className="font-black text-[var(--text-strong)] mb-6 text-sm uppercase tracking-[0.2em] flex items-center gap-3 px-1">
            Recent Activity
            <div className="h-[2px] flex-1 bg-[var(--text-strong)] opacity-10" />
          </h3>

          {communityPosts.length === 0 ? (
            <div className="py-24 flex flex-col items-center justify-center bg-[var(--bg-panel)] rounded-[var(--radius)] border-2 border-dashed border-[var(--bg-deep)] text-center opacity-70">
              <div className="text-5xl mb-4 grayscale">📻</div>
              <p className="text-[var(--text-soft)] font-black uppercase text-xs tracking-widest">Signal is quiet... be the first to post!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {communityPosts.map((post) => (
                <div 
                  key={post._id}
                  onClick={() => navigate(`/posts/${post._id}`)}
                  className="group cursor-pointer flex flex-col bg-[var(--bg-panel)] h-[360px] overflow-hidden rounded-[var(--radius)] shadow-[var(--shadow-soft)] border border-black/5 dark:border-white/5 active:scale-[0.98] transition-all"
                >
                  <div className="p-4 flex gap-3 items-center">
                    <img src={post.owner.avatar} className="w-8 h-8 rounded-full border border-[var(--bg-deep)] object-cover" alt="avatar" />
                    <div className="flex flex-col">
                      <span className="text-[var(--text-strong)] font-black text-xs">@{post.owner.owner}</span>
                      <span className="text-[var(--accent-primary)] text-[9px] font-black uppercase">❤️ {post.likeCount} Likes</span>
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

export default CommunityDetail;