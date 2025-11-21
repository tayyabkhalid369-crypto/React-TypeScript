import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { User } from '../types/index';
import { Mail, Phone, Calendar, MapPin, Globe, Key, ArrowLeft, MapIcon, Copy, Check } from 'lucide-react';

interface LocationState {
  user?: User;
}

const flagUrl = (nat: string): string => {
  return `https://flagcdn.com/w320/${nat.toLowerCase()}.png`;
};

const UserProfile: React.FC = () => {
  const location = useLocation();
  const locationState = location.state as LocationState | undefined;
  const [user] = useState<User | null>(locationState?.user || null);
  const [copiedUUID, setCopiedUUID] = useState(false);

  const copyToClipboard = (text: string): void => {
    navigator.clipboard.writeText(text);
    setCopiedUUID(true);
    setTimeout(() => setCopiedUUID(false), 2000);
  };

  if (!user) {
    return (
      <div className="min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 mb-6 font-medium"
          >
            <ArrowLeft size={20} />
            Back to Directory
          </Link>
          <div className="card border-2 border-red-200 bg-red-50 p-6">
            <p className="text-red-700 font-semibold">User not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 mb-8 font-medium transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Directory
        </Link>

        <div className="card overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700"></div>

          <div className="relative px-6 sm:px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-20 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-sky-600 rounded-2xl blur-xl opacity-30"></div>
                <img
                  src={user.picture.large}
                  alt={`${user.name.first} ${user.name.last}`}
                  className="w-40 h-40 rounded-2xl border-4 border-white shadow-lg relative"
                />
              </div>
              <div className="flex-1 pb-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {user.name.first} {user.name.last}
                </h1>
                <p className="text-sky-600 font-semibold text-lg">@{user.login.username}</p>
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    user.gender === 'male'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-pink-100 text-pink-700'
                  }`}>
                    {user.gender === 'male' ? '👨 Male' : '👩 Female'}
                  </span>
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                    {user.dob.age} years old
                  </span>
                </div>
              </div>
              <div className="text-right sm:pb-2">
                <img
                  src={flagUrl(user.nat)}
                  alt={user.nat}
                  className="w-20 h-12 rounded-lg shadow-md mx-auto sm:mx-0"
                  title={`Country: ${user.location.country}`}
                />
                <p className="text-sm text-gray-600 mt-2 font-semibold">{user.nat}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 pt-8 border-t border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Mail size={24} className="text-sky-600" />
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Email</p>
                    <a href={`mailto:${user.email}`} className="text-sky-600 hover:text-sky-700 font-medium break-all mt-1">
                      {user.email}
                    </a>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Phone</p>
                    <a href={`tel:${user.phone}`} className="text-sky-600 hover:text-sky-700 font-medium mt-1">
                      {user.phone}
                    </a>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Mobile</p>
                    <a href={`tel:${user.cell}`} className="text-sky-600 hover:text-sky-700 font-medium mt-1">
                      {user.cell}
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <MapPin size={24} className="text-sky-600" />
                  Location Details
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Address</p>
                    <p className="font-semibold text-gray-900 mt-1">
                      {user.location.street.number} {user.location.street.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {user.location.city}, {user.location.state}
                    </p>
                    <p className="text-sm text-gray-600">
                      {user.location.postcode}, {user.location.country}
                    </p>
                  </div>
                  <div className="bg-sky-50 p-4 rounded-xl border border-sky-200">
                    <p className="text-xs font-semibold text-sky-700 uppercase tracking-wide">Timezone</p>
                    <p className="font-semibold text-sky-900 mt-1">{user.location.timezone.description}</p>
                    <p className="text-sm text-sky-700">{user.location.timezone.offset}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 pt-8 border-t border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Calendar size={24} className="text-sky-600" />
                  Important Dates
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Date of Birth</p>
                    <p className="font-semibold text-gray-900 mt-1">
                      {new Date(user.dob.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Registered</p>
                    <p className="font-semibold text-gray-900 mt-1">
                      {new Date(user.registered.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{user.registered.age} years ago</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Key size={24} className="text-sky-600" />
                  Account Information
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Username</p>
                    <p className="font-mono font-semibold text-gray-900 mt-1 break-all">{user.login.username}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">UUID</p>
                        <p className="font-mono text-sm text-gray-900 mt-1 break-all">{user.login.uuid.substring(0, 20)}...</p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(user.login.uuid)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {copiedUUID ? <Check size={18} className="text-green-600" /> : <Copy size={18} className="text-gray-600" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MapIcon size={24} className="text-sky-600" />
                Location Map
              </h2>
              <div className="bg-sky-50 p-6 rounded-2xl border border-sky-200">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm font-semibold text-sky-700 mb-1">Latitude</p>
                    <p className="font-mono font-semibold text-sky-900">{user.location.coordinates.latitude}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-sky-700 mb-1">Longitude</p>
                    <p className="font-mono font-semibold text-sky-900">{user.location.coordinates.longitude}</p>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps?q=${user.location.coordinates.latitude},${user.location.coordinates.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-primary"
                >
                  <MapIcon size={18} />
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
