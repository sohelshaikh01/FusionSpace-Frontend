import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const CommunityCard = ({ community }) => {
  return (
    <div className="panel card hover:translate-y-[-2px] transition-transform">
      <div className="flex gap-4">
        <img 
          src={community.avatar} 
          className="w-16 h-16 rounded-lg object-cover border-2 border-black/5" 
          alt="community" 
        />
        <div className="flex-1">
          <Link to={`/communities/${community._id}`} className="block no-underline">
            <h3 className="font-bold text-lg hover:text-[var(--accent-primary)]">
              #{community.communityName}
            </h3>
          </Link>
          <p className="muted small line-clamp-2">{community.description}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-primary)]">
              {community.membersCount} Members
            </span>
            <Link to={`/community/${community._id}`}>
              <Button btnG className="py-1 px-3 text-xs">View</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;