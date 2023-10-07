import React, { useState, useEffect } from 'react';

function OnlineUsers() {

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
      } catch (error) {
        console.error('Error sending "NEW USER" message:', error);
      }
    };
    sendNewUserMessage()
  }, []);
}

export default OnlineUsers;
