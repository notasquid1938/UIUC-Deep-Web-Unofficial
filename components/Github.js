import Link from 'next/link';
import styles from '../styles/Github.module.css';

const GitHubButton = () => {
  return (
    <div className={styles.container}>
        <Link legacyBehavior href="https://github.com/notasquid1938/UIUC-Deep-Web-Unofficial">
        <a target="_blank" rel="noopener noreferrer" className={styles.githubButton}>
            Visit GitHub Repository
        </a>
        </Link>
    </div>
  );
};

export default GitHubButton;
