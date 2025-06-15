import { api } from './api';
import type { Word } from '../types/word';

export const fetchSampleWords = async (): Promise<Word[]> => {
  const res = await api.get<Word[]>('/');
  return res.data;
};
