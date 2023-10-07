import React, { useState, useEffect, useRef } from 'react';

function OnlineUsers() {
  const intervalRef = useRef(null); // Ref to hold the interval ID
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const getUsernameFromLocalStorage = () => {
      const storedUsername = localStorage.getItem('generatedUsername');
      setUsername(storedUsername);
    };

    getUsernameFromLocalStorage();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (username) {
      const sendNewUserMessage = async () => {
        try {
          const response = await fetch('/api/usercount', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: 'NEW USER', username }),
          });
          console.log('User Joined:', username);

          // Only set up the interval if it hasn't been set up already
          if (!intervalRef.current) {
            intervalRef.current = setInterval(async () => {
              try {
                const stillOnlineResponse = await fetch('/api/usercount', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ message: 'STILL ONLINE', username }),
                });
                console.log('Still online:', username);
              } catch (error) {
                console.error('Error sending "STILL ONLINE" message:', error);
              }
            }, 2000); // 2000 milliseconds (2 seconds)
          }
        } catch (error) {
          console.error('Error sending "NEW USER" message:', error);
        }
      };

      sendNewUserMessage();
    }
  }, [username]);

  return null; // You may return some JSX here if needed
}

export default OnlineUsers;
