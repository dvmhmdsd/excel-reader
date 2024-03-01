import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../../interfaces/user.interface';
import SearchResultsComponent from '../../components/SearchResults.component';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<User[]>();

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
  };

  const dispatchSearchEvent = () => {
    window.electron.ipcRenderer.sendMessage('search', searchQuery);
  };

  const navigate = useNavigate();
  useEffect(() => {
    window.electron.ipcRenderer.on('search-results', (arg) => {
      setSearchResults(arg as User[]);
      setSearchQuery('');
    });
  });

  return (
    <div className="centered-container">
      <section>
        <input
          type="number"
          onChange={(e) => handleSearchChange(e.target.value)}
          value={searchQuery}
        />
        <button type="button" onClick={dispatchSearchEvent}>
          إبحث
        </button>
        <button
          type="button"
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
          }}
          onClick={() => navigate('/')}
        >
          الرجوع
        </button>
      </section>

      <SearchResultsComponent results={searchResults} />
    </div>
  );
}
