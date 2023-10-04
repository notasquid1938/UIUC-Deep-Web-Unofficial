import React, { useState, useEffect } from 'react';

function OnlineUsersCounter() {
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const username = localStorage.getItem('generatedUsername');
    const sendNewUserMessage = async () => {
      try {
        const response = await fetch('/api/online-users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: 'NEW USER', username }),
        });
        const data = await response.json();
        console.log('User Joined:', username);
        setOnlineUsersCount((prevCount) => prevCount + 1);
      } catch (error) {
        console.error('Error sending "NEW USER" message:', error);
      }
    };

    const sendUserLeftMessage = async () => {
      try {
        const response = await fetch('/api/online-users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: 'USER LEFT', username }),
        });
        console.log('User Left:', username);
        setOnlineUsersCount((prevCount) => prevCount - 1);
      } catch (error) {
        console.error('Error sending "USER LEFT" message:', error);
      }
    };
    let onlineTimer;

    const startOnlineTimer = () => {
      onlineTimer = setInterval(() => {
        const lastActivityTime = localStorage.getItem('lastActivityTime');
        const currentTime = Date.now();
        if (lastActivityTime && currentTime - parseInt(lastActivityTime) > 5000) {
          setIsOnline(false);
          sendUserLeftMessage();
          console.log('User is now offline:', username);
        }
      }, 1000);
    };

    const resetOnlineTimer = () => {
      clearInterval(onlineTimer);
      startOnlineTimer();
    };

    sendNewUserMessage();
    startOnlineTimer();

    return () => {
      sendUserLeftMessage();
      clearInterval(onlineTimer);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        fetch('/api/online-users', {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setOnlineUsersCount(data.count);
          });
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('lastActivityTime', Date.now().toString());
  }, []);

  return (
    <div>
      <div>Users Online: {onlineUsersCount}</div>
      <div>User Status: {isOnline ? 'Online' : 'Offline'}</div>
    </div>
  );
}

export default OnlineUsersCounter;
