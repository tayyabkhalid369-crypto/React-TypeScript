import { ApiResponse, User } from '../types/index';

const API_BASE = 'https://randomuser.me/api/';

export const fetchUsers = async (
  count: number = 10,
  gender?: 'male' | 'female'
): Promise<User[]> => {
  const params = new URLSearchParams({
    results: count.toString(),
  });

  if (gender) {
    params.append('gender', gender);
  }

  const response = await fetch(`${API_BASE}?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const data: ApiResponse = await response.json();
  return data.results;
};

export const fetchUsersSeeded = async (
  seed: string,
  count: number = 10,
  gender?: 'male' | 'female'
): Promise<User[]> => {
  const params = new URLSearchParams({
    seed,
    results: count.toString(),
  });

  if (gender) {
    params.append('gender', gender);
  }

  const response = await fetch(`${API_BASE}?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const data: ApiResponse = await response.json();
  return data.results;
};
