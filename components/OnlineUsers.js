import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const OnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {

  }, []);

  return <div>Online Users: {onlineUsers}</div>;
};

export default OnlineUsers;
