import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="centered-container">
      <section>
        <Link to="/upload">
          <button type="button">تحميل ملفات</button>
        </Link>
        <Link to="/search">
          <button type="button">البحث</button>
        </Link>
      </section>
    </div>
  );
}
