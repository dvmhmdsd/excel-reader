import { useEffect, useState } from 'react';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
  };

  const dispatchSearchEvent = () => {
    window.electron.ipcRenderer.sendMessage('search', searchQuery);
  };

  useEffect(() => {
    window.electron.ipcRenderer.on('search-results', (arg) => {
      console.log(arg);
    });
  });

  return (
    <>
      <input
        type="text"
        onChange={(e) => handleSearchChange(e.target.value)}
        value={searchQuery}
      />
      <button type="button" onClick={dispatchSearchEvent}>
        إبحث
      </button>
    </>
  );
}
