import { Link } from 'react-router-dom';
import styles from './style.module.css';

export default function Home() {
  return (
    <div className={styles.Hello}>
      <Link to="/upload">
        <button type="button">تحميل ملفات</button>
      </Link>
      <Link to="/search">
        <button type="button">البحث</button>
      </Link>
    </div>
  );
}
