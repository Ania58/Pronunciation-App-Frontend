export interface Word {
  id: string;
  word: string;
  ipa?: string;
  arpabet?: string;
  difficulty?: string;
  category?: string;
  language: string;
}
