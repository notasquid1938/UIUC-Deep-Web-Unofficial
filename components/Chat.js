import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/Chat.module.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const chatContainerRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('generatedUsername');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    fetchMessages().then(() => scrollToBottom());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) {
      return;
    }

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newMessage, username }),
      });
      const data = await response.json();
      setMessages([...messages, data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div className={styles.Title}>
        <h1>Live Chat</h1>
        <p>Talk About Whatever</p>
      </div>
      <div className={styles.Messages} ref={chatContainerRef}>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              <div className={styles.messageUsername}>{message.username}</div>
              <div>{message.text}</div>
              <div>
                <span className={styles.Timestamp}>
                  {formatTimestamp(message.timestamp)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.Submit}>
        <form className= {styles.submitForm} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type your message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
