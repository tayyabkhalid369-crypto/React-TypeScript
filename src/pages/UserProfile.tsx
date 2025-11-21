import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { User } from '../types/index';
import { Mail, Phone, Calendar, MapPin, Globe, Key, ArrowLeft } from 'lucide-react';

interface LocationState {
  user?: User;
}

const flagUrl = (nat: string): string => {
  return `https://flagcdn.com/w320/${nat.toLowerCase()}.png`;
};

const UserProfile: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const location = useLocation();
  const locationState = location.state as LocationState | undefined;
  const [user] = useState<User | null>(locationState?.user || null);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-2xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft size={20} />
            Back to Directory
          </Link>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            User not found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Directory
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>

          <div className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6 -mt-16 mb-6">
              <img
                src={user.picture.large}
                alt={`${user.name.first} ${user.name.last}`}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {user.name.title} {user.name.first} {user.name.last}
                </h1>
                <p className="text-gray-600 text-lg">@{user.login.username}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {user.gender === 'male' ? '👨 Male' : '👩 Female'} - Age {user.dob.age}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <img
                  src={flagUrl(user.nat)}
                  alt={user.nat}
                  className="w-16 h-10 rounded shadow"
                  title={`Country: ${user.location.country}`}
                />
                <p className="text-sm text-gray-600 mt-1">{user.nat}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="text-blue-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">
                        {user.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-blue-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <a href={`tel:${user.phone}`} className="text-blue-600 hover:underline">
                        {user.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-blue-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Cell</p>
                      <a href={`tel:${user.cell}`} className="text-blue-600 hover:underline">
                        {user.cell}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">
                        {user.location.street.number} {user.location.street.name}
                      </p>
                      <p className="text-gray-600">
                        {user.location.city}, {user.location.state}
                      </p>
                      <p className="text-gray-600">
                        {user.location.postcode}, {user.location.country}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center gap-3">
                      <Globe className="text-blue-600" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Timezone</p>
                        <p className="font-medium text-gray-900">{user.location.timezone.description}</p>
                        <p className="text-sm text-gray-600">{user.location.timezone.offset}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Important Dates</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="text-blue-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Date of Birth</p>
                      <p className="font-medium text-gray-900">
                        {new Date(user.dob.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="text-blue-600" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Registered</p>
                      <p className="font-medium text-gray-900">
                        {new Date(user.registered.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-sm text-gray-600">{user.registered.age} years ago</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Information</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <Key className="text-blue-600" size={20} />
                    <div className="flex-1 break-all">
                      <p className="text-gray-600">UUID</p>
                      <p className="font-mono text-gray-900">{user.login.uuid}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <Key className="text-blue-600" size={20} />
                    <div className="flex-1">
                      <p className="text-gray-600">Username</p>
                      <p className="font-mono text-gray-900">{user.login.username}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Coordinates</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Latitude: {user.location.coordinates.latitude}</p>
                <p className="text-sm text-gray-600">Longitude: {user.location.coordinates.longitude}</p>
                <a
                  href={`https://www.google.com/maps?q=${user.location.coordinates.latitude},${user.location.coordinates.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm mt-2 inline-block"
                >
                  View on Google Maps →
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
