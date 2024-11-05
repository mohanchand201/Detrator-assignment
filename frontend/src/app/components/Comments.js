import { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { Button, TextField, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";

const socket = io('http://localhost:4000');
const imgLink = "/public/user-regular-24.png"

const Comments = ({ username }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get('http://localhost:4000/api/comments');
      setComments(response.data);
    };
    fetchComments();

    socket.on('newComment', (newComment) => {
      setComments((prevComments) => [newComment, ...prevComments]);
    });

    return () => socket.off('newComment');
  }, []);

  const handlePostComment = async () => {
    const response = await axios.post('http://localhost:4000/api/comments', {
      username,
      comment,
    });
    setComment('');
  };

  return (
    <div>
     <Typography variant="h6">Logged in as: {username}</Typography> 
     {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path></svg> */}
      <TextField
        label="Add a comment"
        variant="outlined"
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handlePostComment}>
        Post
      </Button>

      <List>
        {comments.map((c) => (
          <ListItem key={c.id}>
            <ListItemText
              primary={`${c.username} (${new Date(c.timestamp).toLocaleString()})`}
              secondary={c.comment}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Comments;
