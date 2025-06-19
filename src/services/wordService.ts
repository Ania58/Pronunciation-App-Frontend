import { api } from './api';
import type { Word } from '../types/word';

type PaginatedResponse = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  results: Word[];
};

export const fetchFilteredWords = async (): Promise<Word[]> => {
  const res = await api.get<PaginatedResponse>('/words');
   console.log('📦 API response:', res.data);
  return res.data.results; 
};

export const fetchAllWords = async (
  page = 1,
  limit = 50,
  sort = 'word',
  order = 'asc',
  query = ''
): Promise<PaginatedResponse> => {
  const res = await api.get<PaginatedResponse>('/words/all', {
    params: { page, limit, sort, order, query },
  });
  return res.data;
};