import { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { Avatar, Button, TextField, List, ListItem, ListItemAvatar, ListItemText, Typography, Paper, Box, Container } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

const socket = io('http://localhost:4000');

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
    await axios.post('http://localhost:4000/api/comments', {
      username,
      comment,
    });
    setComment('');
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center" pt={4}>
        <Typography variant="h5" gutterBottom>
          Comments Section
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Logged in as: {username}
        </Typography>

        <Paper elevation={3} sx={{ p: 3, width: '100%', mb: 3 }}>
          <TextField
            label="Add a comment"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handlePostComment}
            sx={{ mt: 2 }}
          >
            Post Comment
          </Button>
        </Paper>

        <List sx={{ width: '100%' }}>
          {comments.map((c) => (
            <Paper key={c.id} elevation={1} sx={{ mb: 2, p: 2 }}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: deepPurple[500] }}>
                    {c.username.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center">
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ mr: 1 }}>
                        {c.username}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(c.timestamp).toLocaleString()}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      {c.comment}
                    </Typography>
                  }
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Comments;
