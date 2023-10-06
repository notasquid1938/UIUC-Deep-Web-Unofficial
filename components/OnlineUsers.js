import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const OnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    // Update the URL to the Tor onion service WebSocket endpoint
    const socket = io('ws://localhost:80');

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('userCount', (count) => {
      console.log('Received user count:', count);
      setOnlineUsers(count);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      console.log('Disconnecting from WebSocket server');
      socket.disconnect();
    };
  }, []);

  return <div>Online Users: {onlineUsers}</div>;
};

export default OnlineUsers;
