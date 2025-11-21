import React, { useState, useEffect, useMemo } from 'react';
import { User } from '../types/index';
import { fetchUsers } from '../api/userApi';
import UserCard from '../components/UserCard';
import Pagination from '../components/Pagination';
import GenderFilter from '../components/GenderFilter';
import SearchBar from '../components/SearchBar';
import { Users } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

const UserListing: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadUsers = async (): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUsers(
          100,
          selectedGender as 'male' | 'female' | undefined
        );
        setUsers(data);
        setCurrentPage(1);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [selectedGender]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchLower = searchQuery.toLowerCase();
      const fullName =
        `${user.name.first} ${user.name.last}`.toLowerCase();
      const email = user.email.toLowerCase();
      const username = user.login.username.toLowerCase();

      return (
        fullName.includes(searchLower) ||
        email.includes(searchLower) ||
        username.includes(searchLower)
      );
    });
  }, [users, searchQuery]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const handleGenderFilterChange = (gender: string | null): void => {
    setSelectedGender(gender);
  };

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-sky-100 rounded-2xl">
              <Users size={32} className="text-sky-600" />
            </div>
            <div>
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900">Users Directory</h1>
              <p className="text-gray-600 mt-2 text-lg">Discover and explore professional profiles</p>
            </div>
          </div>
        </div>

        <div className="card p-10 mb-12 space-y-8">
          <div>
            <label className="block text-base font-semibold text-gray-800 mb-4">Search Users</label>
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <div className="border-t border-gray-200 pt-8">
            <GenderFilter
              selectedGender={selectedGender}
              onFilterChange={handleGenderFilterChange}
            />
          </div>

          {searchQuery && (
            <div className="mt-6 p-5 bg-sky-50 border border-sky-300 rounded-xl">
              <p className="text-sm text-sky-900 font-medium">
                Found <span className="font-bold text-sky-700">{filteredUsers.length}</span> result{filteredUsers.length !== 1 ? 's' : ''} for "<span className="font-semibold">{searchQuery}</span>"
              </p>
            </div>
          )}
        </div>

        {error && (
          <div className="card border-2 border-red-200 bg-red-50 p-8 mb-10">
            <p className="text-red-700 font-semibold text-lg">Error: {error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-80">
            <div className="text-center">
              <div className="w-14 h-14 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-gray-600 font-medium text-lg">Loading users...</p>
            </div>
          </div>
        ) : paginatedUsers.length > 0 ? (
          <>
            <div className="mb-8 text-base text-gray-700 bg-white rounded-lg p-4">
              Showing <span className="font-semibold text-gray-900">{startIndex + 1}</span> to <span className="font-semibold text-gray-900">{Math.min(endIndex, filteredUsers.length)}</span> of <span className="font-semibold text-gray-900">{filteredUsers.length}</span> users
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {paginatedUsers.map((user) => (
                <UserCard key={user.login.uuid} user={user} />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="card p-16 text-center">
            <Users size={56} className="text-gray-300 mx-auto mb-6" />
            <p className="text-gray-600 text-xl font-medium mb-3">No users found</p>
            <p className="text-gray-500 text-base">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserListing;
