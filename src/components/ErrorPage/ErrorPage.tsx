import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.css';
import { Button } from '../Button/Button';

export function ErrorPage() {
  return (
    <>
      <p className={styles.text}>The page was not found!</p>
      <Link className={styles.link} to={'/'}>
        <Button type="button">Go Home</Button>
      </Link>
    </>
  );
}
