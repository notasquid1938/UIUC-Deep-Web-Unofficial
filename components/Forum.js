import React, { useState, useEffect } from 'react';
import styles from '../styles/Forum.module.css';

function Forum() {
  const [showPostForm, setShowPostForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [showReplyBox, setShowReplyBox] = useState({});
  const [username, setUsername] = useState('');
  const [votingCooldown, setVotingCooldown] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('generatedUsername');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleShowReplyBox = (postId) => {
    setShowReplyBox({ ...showReplyBox, [postId]: true });
  };
  
  const handleHideReplyBox = (postId) => {
    setShowReplyBox({ ...showReplyBox, [postId]: false });
  }; 

  useEffect(() => {
    fetch('/api/posts')
      .then((response) => response.json())
      .then((data) => {
        const postsData = data.filter((item) => item.type !== 'reply');
        const repliesData = data.filter((item) => item.type === 'reply');
        const repliesMap = {};
        repliesData.forEach((reply) => {
          if (!repliesMap[reply.postId]) {
            repliesMap[reply.postId] = [];
          }
          repliesMap[reply.postId].push(reply);
        });
        const updatedPosts = postsData.map((post) => {
          if (repliesMap[post._id]) {
            post.replies = repliesMap[post._id];
          } else {
            post.replies = [];
          }
          return post;
        });

        setPosts(updatedPosts);
      })
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  const handlePostClick = () => {
    setShowPostForm(!showPostForm);
  };

  const handleVote = (postId, action) => {
    if (votingCooldown) {
      return;
    }
    setVotingCooldown(true);
    setTimeout(() => {
      setVotingCooldown(false);
    }, 2000); 

    fetch('/api/posts', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postId, action }),
    })
      .then((response) => response.json())
      .then((updatedPost) => {
        const updatedPosts = posts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );
        setPosts(updatedPosts);
      })
      .catch((error) => console.error('Error voting:', error));
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, username}),
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts([...posts, data]);
        setShowPostForm(false);
        setTitle('');
        setContent('');
        setUsername('')
      })
      .catch((error) => console.error('Error posting:', error));
  };

  const handleReplySubmit = (postId) => {
    fetch('/api/posts', {
      method: 'OPTIONS',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: "reply", username, postId, text: replyText }),
    })
      .then((response) => response.json())
      .then((updatedPost) => {
        const updatedPosts = posts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );
        setPosts(updatedPosts);
        setShowReplyBox({ ...showReplyBox, [postId]: false });
        setReplyText('');
      })
      .catch((error) => console.error('Error replying:', error));
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
        <form onSubmit={handlePostSubmit} className={styles.Form}>
          <div>
            <label>
              Title:
              <input
                className={styles.title}
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
                className={styles.contentBox}
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
        <div key={post._id}>
          <div className={styles.Post}>
            <div className={styles.PostUsernameContainer}>
              <p className={styles.PostUsername}>{post.username}</p>
            </div>
            <h3 className={styles.PostTitle}>{post.title}</h3>
            <p className={styles.PostContent}>{post.content}</p>
            <div className={styles.forumBottom}>
              <button className={styles.Upvote} onClick={() => handleVote(post._id, 'upvote')}>
                Upvote
              </button>
              <span className={styles.upvoteNumber}>{post.upvotes}</span>
              <button className={styles.Downvote} onClick={() => handleVote(post._id, 'downvote')}>
                Downvote
              </button>
              <span>{post.downvotes}</span>
            </div>
            <div>
              {!showReplyBox[post._id] && (
                <button onClick={() => handleShowReplyBox(post._id)}>Reply</button>
              )}
              {showReplyBox[post._id] && (
                <div className={styles.ReplyForm}>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <button onClick={() => handleReplySubmit(post._id)}>Submit Reply</button>
                  <button onClick={() => handleHideReplyBox(post._id)}>Cancel</button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.RepliesContainer}>
            {post.replies && post.replies.map((reply) => (
              <div className={styles.Reply} key={reply._id}>
                <p className={styles.PostUsername}>{reply.username}</p>
                <p className={styles.PostContent}>{reply.text}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default Forum;