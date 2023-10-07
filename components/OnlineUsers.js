import React, { useState, useEffect, useRef } from 'react';

function OnlineUsers() {
  const intervalRef = useRef(null); // Ref to hold the interval ID

  useEffect(() => {
    const username = localStorage.getItem('generatedUsername');

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
          }, 5000); // 5000 milliseconds (5 seconds)
        }
      } catch (error) {
        console.error('Error sending "NEW USER" message:', error);
      }
    };

    sendNewUserMessage();

    // Clean up the interval when the component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
}

export default OnlineUsers;
