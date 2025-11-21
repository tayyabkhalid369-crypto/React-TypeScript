import React, { useState, useEffect, useMemo } from 'react';
import { User } from '../types/index';
import { fetchUsers } from '../api/userApi';
import UserCard from '../components/UserCard';
import Pagination from '../components/Pagination';
import GenderFilter from '../components/GenderFilter';
import SearchBar from '../components/SearchBar';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Users Directory</h1>
          <p className="text-gray-600">Browse and explore user profiles</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8 space-y-6">
          <SearchBar onSearch={handleSearch} />
          <GenderFilter
            selectedGender={selectedGender}
            onFilterChange={handleGenderFilterChange}
          />

          {searchQuery && (
            <div className="text-sm text-gray-600">
              Found {filteredUsers.length} result
              {filteredUsers.length !== 1 ? 's' : ''} for "{searchQuery}"
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500 text-lg">Loading users...</div>
          </div>
        ) : paginatedUsers.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserListing;
