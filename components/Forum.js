import React, { useState, useEffect } from 'react';
import styles from '../styles/Forum.module.css';

function Forum() {
  const [showPostForm, setShowPostForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch existing forum posts
    fetch('/api/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  const handlePostClick = () => {
    // Toggle the showPostForm state when the button is clicked
    setShowPostForm(!showPostForm);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts([...posts, data]);
        setShowPostForm(false);
        setTitle('');
        setContent('');
      })
      .catch((error) => console.error('Error posting:', error));
  };

  return (
    <div>
      <div className={styles.Title}>
        <h1>Forum</h1>
        <p>Post Whatever</p>
        <button onClick={handlePostClick}>
          {showPostForm ? 'Cancel' : 'Add Post'}
        </button>
      </div>

      {showPostForm && (
        <form onSubmit={handlePostSubmit}>
          <div>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Content:
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      )}

        <div className={styles.Posts}>
          {posts.map((post) => (
            <div className={styles.Post} key={post._id}>
              <h3 className={styles.PostTitle}>{post.title}</h3>
              <p className={styles.PostContent}>{post.content}</p>
            </div>
          ))}
        </div>

    </div>
  );
}

export default Forum;
