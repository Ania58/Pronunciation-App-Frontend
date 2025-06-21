import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function WordSearchBar() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/words/${search.trim().toLowerCase()}`);
      setSearch('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-4 flex gap-2">
      <input
        type="text"
        value={search}
        placeholder="Search for a word"
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full max-w-xs"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Search
      </button>
    </form>
  );
}