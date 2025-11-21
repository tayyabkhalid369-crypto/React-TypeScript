import React from 'react';
import { User } from '../types/index';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Link to={`/profile/${user.login.uuid}`} state={{ user }}>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 cursor-pointer h-full">
        <div className="flex flex-col items-center">
          <img
            src={user.picture.large}
            alt={`${user.name.first} ${user.name.last}`}
            className="w-24 h-24 rounded-full mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-900">
            {user.name.title} {user.name.first} {user.name.last}
          </h3>
          <p className="text-sm text-gray-600 mb-4">@{user.login.username}</p>
          
          <div className="space-y-2 w-full text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail size={16} />
              <span className="truncate">{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone size={16} />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={16} />
              <span>{user.location.city}, {user.location.country}</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t w-full">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              {user.gender === 'male' ? '👨 Male' : '👩 Female'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
