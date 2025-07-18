import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Box, Typography, Container, Paper } from '@mui/material';
import ErrorBoundary from './ErrorBoundary';
import './App.css';

function App() {
  const [textValue, setTextValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTextValue = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/text');
        if (response.data && response.data.value) {
          setTextValue(response.data.value);
        }
      } catch (err) {
        setError('Не удалось загрузить данные с сервера.');
        console.error('Error fetching text value:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTextValue();
  }, []);

  const handleTextChange = async (event) => {
    const newValue = event.target.value;
    setTextValue(newValue);

    try {
      await axios.post('/api/text', { value: newValue });
    } catch (err) {
      setError('Не удалось сохранить данные на сервере.');
      console.error('Error saving text value:', err);
    }
  };

  return (
    <ErrorBoundary>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3, backgroundColor: '#f9f9f9' }}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
            <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
              Ввод текста
            </Typography>
            {loading ? (
              <Typography variant="body1" color="text.secondary">
                Загрузка данных...
              </Typography>
            ) : error ? (
              <Typography variant="body1" color="error">
                {error}
              </Typography>
            ) : (
              <TextField
                label="Введите текст"
                variant="outlined"
                value={textValue}
                onChange={handleTextChange}
                fullWidth
                multiline
                rows={4}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#fff',
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#555',
                    '&.Mui-focused': {
                      color: '#1976d2',
                    },
                  },
                }}
              />
            )}
          </Box>
        </Paper>
      </Container>
    </ErrorBoundary>
  );
}

export default App;
