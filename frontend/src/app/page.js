"use client";  // Add this directive at the top of the file

import { useState } from 'react';
import Login from './components/Login';
import Comments from './components/Comments';

export default function Home() {
  const [username, setUsername] = useState(null);

  return (
    <div style={{ padding: '2rem' }}>
      {username ? (
        <Comments username={username} />
      ) : (
        <Login onLogin={(username) => setUsername(username)} />
      )}
    </div>
  );
}
