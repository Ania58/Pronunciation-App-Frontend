import { api } from './api';
import type { Word } from '../types/word';

type PaginatedResponse = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  results: Word[];
};

export const fetchSampleWords = async (): Promise<Word[]> => {
  const res = await api.get<PaginatedResponse>('/words');
   console.log('📦 API response:', res.data);
  return res.data.results; 
};
