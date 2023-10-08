import React from 'react';
import styles from '../styles/Banner.module.css';
import GitHubButton from '../components/Github';
import  {Username} from '../components/Username';

function Banner() {
  return (
    <div className={styles.banner}>
      <Username/>
      <GitHubButton/>
      <h1>Unofficial UIUC Deep Web</h1>
      <p>Established 2019</p>
    </div>
  );
}

export default Banner;

