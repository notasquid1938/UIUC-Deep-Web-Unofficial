import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import Forum from '../components/Forum';
import Chat from '../components/Chat';
import styles from '../styles/Index.module.css';
import OnlineUsers from '../components/OnlineUsers';

function HomePage() {
  return (
    <div>
      <OnlineUsers />
      <Banner />
      <div className={styles.Container}>
        <div className={styles.Forum}>
          <Forum />
        </div>
        <div className={styles.Chat}>
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
