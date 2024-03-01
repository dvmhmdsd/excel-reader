import { SEARCH_KEY, RENDER_KEY } from '../../constants/main-key.constant';
import { User } from '../../interfaces/user.interface';

interface SearchResultsProps {
  results: User[] | undefined;
}

export default function SearchResultsComponent({
  results,
}: SearchResultsProps) {
  return (
    <ul style={{ listStyle: 'none' }}>
      {results && results?.length > 0
        ? results?.map((user: User) => (
            <li key={user[SEARCH_KEY]}>
              {user[SEARCH_KEY]} - {user[RENDER_KEY]}
            </li>
          ))
        : results && results?.length === 0 && <p>لا توجد نتائج</p>}
    </ul>
  );
}
