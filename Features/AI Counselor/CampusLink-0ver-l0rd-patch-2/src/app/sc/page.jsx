"use client";

import React, { useState } from 'react';
import useSpeechToText from '@/hooks/useSpeechToText';
import { Box, TextField, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ReactCoolScrollbar } from "react-cool-scrollbar"; // Scroller component
import "react-cool-scrollbar/dist/style.css"; // Style files
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

// Styled components for colored text box and button
const ColoredTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'steelblue',
      borderRadius: '20px',
    },
    '&:hover fieldset': {
      borderColor: 'steelblue',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'steelblue',
    },
    '& input': {
      color: 'steelblue',
    },
    '& .MuiInputBase-input::placeholder': {
      color: '#b0c4de',
      opacity: 1,
    },
  },
});

const ColoredButton = styled(Button)({
  backgroundColor: 'black',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '20px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s, box-shadow 0.3s, transform 0.3s',
  '&:hover': {
    backgroundColor: '#76c7a1',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-2px)',
  },
  '&:active': {
    boxShadow: 'none',
    transform: 'translateY(0)',
  },
});

const MentalHealthChat = () => {
  const [messages, setMessages] = useState([
    { sender: 'AI', text: 'Hello, how may I be at your service today?' }
  ]);
  
  const [input, setInput] = useState('');

  // Hardcoded API key
  const API_KEY = "AIzaSyBFc81RLqaAMES4dWcpsreKQ_vePCikwSg";

  // Initialize Google Generative AI with the hardcoded API key
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleSend = async () => {
    if (!input) return;

    // Add user's message to chat
    setMessages((prevMessages) => [...prevMessages, { sender: 'User', text: input }]);

    try {
      // Prepare the prompt with guidance
      const prompt = `Please act as a mental health counselor and base your answers on Scientific books written about mental health highly considering the current issue like technology(social-media). Also try to focus on what young people go through in the current circumstances. User question: ${input}`;

      // Call the Gemini AI API
      const result = await model.generateContent(prompt);

      // Extract AI's response text
      const textReply = result.response.text();

      // Add AI's response to chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'AI', text: textReply },
      ]);
    } catch (error) {
      console.error('Error handling AI response:', error.message);
      setMessages((prevMessages) => [...prevMessages, { sender: 'Error', text: error.message }]);
    } finally {
      // Clear input field
      setInput('');
    }
  };

  // Function to handle key down event
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default form submission behavior
      handleSend(); // Call the send function
    }
  };
  // For the speech to text
  
  const{isListening, transcript, startListening, stopListening} = useSpeechToText({continuous:true})

  const startStopListening = () => {
    isListening ? stopVoiceInput() : startListening() 
  }

  const stopVoiceInput = () => {
    setInput(prevVal => prevVal + (transcript.length ? (prevVal.length ? ' ': '' ) + transcript: '' ))
    stopListening()
  }

  return (
    <Box sx={{ padding: 4, maxWidth: 600, margin: '0 auto', borderRadius: 2 }}>
      <Box sx={{ 
        backgroundColor: 'Gray', 
        padding: 2, 
        borderRadius: '10px', 
        mb: 2,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%', 
        maxWidth: '500px',
        // marginLeft: 'px', // Move the box a few pixels to the right
      }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: 'black' }}>
          Mental Health Chat
        </Typography>
      </Box>

      <Box sx={{ 
        backgroundColor: 'white', 
        padding: 5,
        marginBottom: 3,
        borderRadius: '20px', 
        height: 400,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%', 
        maxWidth: '500px',
        overflowY:'hidden' // Prevent default scrollbar appearance
      }}>
        <ReactCoolScrollbar style={{ height: '100%' }}>
          <List>
            {messages.map((msg, index) => (
              <ListItem key={index}>
                <ListItemText 
                  primary={<strong style={{ color:'steelblue' }}>{msg.sender}:</strong>} 
                  secondary={<span style={{ color:'steelblue' }}>{msg.text}</span>} 
                  sx={{ textAlign : msg.sender === "User" ? "right" : "left"}} />
              </ListItem>
            ))}
          </List>
        </ReactCoolScrollbar>
      </Box>

      <ColoredTextField 
  variant="outlined" 
  placeholder="Type your question..." 
  disabled={isListening}
  value={isListening ? input + (transcript.length ? (input.length ? ' ': '') + transcript : '') :input}  
  onChange={(e) => setInput(e.target.value)} 
  onKeyDown={handleKeyDown} 
  fullWidth 
  sx={{ mb :2,marginLeft: '-15px', }}
  InputProps={{
    endAdornment: (
      <Button variant="contained" onClick={handleSend} sx={{ ml: 1, backgroundColor: 'black', color: 'white' }}>
        Send
      </Button>
    ),
  }}
/>

<button

  onClick={() => {

    startStopListening();

  }}

  style={{

    backgroundColor: isListening ? "#d62d20" : "#008744",

    borderRadius: '50%',

    cursor: 'pointer',

    border: 'none',

    transition: 'background-color 0.3s ease',

    width: '70px',

    height: '70px',

    padding: '10px',

    marginLeft: '213px',

    marginTop: '10px',

  }}

>

  <FontAwesomeIcon icon={faMicrophone} size="lg" color={isListening ? "#fff" : "#fff"} />

</button>

      
      {/* Inline styles for scrollbar and voice button customization */}
      <style jsx global>{`
       @keyframes pulse {

    0% {

      transform: scale(0.9);

      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.5);

    }

    70% {

      transform: scale(1);

      box-shadow: 0 0 0 10px rgba(255, 255, 255, 0.5);

    }

    100% {

      transform: scale(0.9);

      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.5);

    }

  }
          .rcs-scrollbar {
              background-color: #f1f1f1; /* Background of the scrollbar */
          }

          .rcs-inner-handle {
              background-color: #888; /* Color of the scrollbar handle */
              border-radius:10px; /* Rounded corners for the handle */
          }

          .rcs-inner-handle:hover {
              background-color:#555; /* Darker color on hover */
          }
       `}</style>
      
    </Box>
   );
};

export default MentalHealthChat;
