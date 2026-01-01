import React from 'react';
import { Link } from 'react-router-dom';

const MemberList = ({ members = [] }) => {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-xs font-black muted uppercase tracking-widest mb-2">
        Active Members — {members.length}
      </h4>
      {members.length > 0 ? (
        members.map((member) => (
          <Link 
            key={member._id} 
            to={`/profile/${member._id}`} 
            className="member-pad flex items-center gap-3 p-2 hover:bg-black/5 rounded transition-colors no-underline"
          >
            <img 
              src={member.avatar} 
              className="w-8 h-8 rounded border border-black/10" 
              alt="avatar" 
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-none">{member.username}</span>
              <span className="extra-small muted">{member.fullName}</span>
            </div>
          </Link>
        ))
      ) : (
        <p className="muted small italic">No members found.</p>
      )}
    </div>
  );
};

export default MemberList;