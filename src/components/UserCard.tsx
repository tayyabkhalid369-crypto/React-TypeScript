import React from 'react';
import { User } from '../types/index';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Link to={`/profile/${user.login.uuid}`} state={{ user }} className="group">
      <div className="card p-8 cursor-pointer h-full flex flex-col">
        <div className="flex flex-col items-center flex-1">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <img
              src={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg relative"
            />
          </div>
          
          <div className="text-center mb-6 w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {user.name.first} {user.name.last}
            </h3>
            <p className="text-sm text-sky-600 font-medium mb-2">@{user.login.username}</p>
            <p className="text-xs text-gray-500">{user.name.title}</p>
          </div>

          <div className="space-y-3 w-full text-sm mb-6">
            <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
              <Mail size={16} className="text-sky-600 flex-shrink-0" />
              <span className="truncate text-xs">{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
              <Phone size={16} className="text-sky-600 flex-shrink-0" />
              <span className="text-xs">{user.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
              <MapPin size={16} className="text-sky-600 flex-shrink-0" />
              <span className="text-xs">{user.location.city}, {user.location.country}</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
          <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold ${
            user.gender === 'male'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-pink-100 text-pink-700'
          }`}>
            {user.gender === 'male' ? '👨 Male' : '👩 Female'} • {user.dob.age}
          </span>
          <ArrowRight size={18} className="text-sky-600 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
