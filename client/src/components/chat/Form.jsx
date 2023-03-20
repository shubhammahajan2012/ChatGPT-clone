import axios from 'axios'; // import the axios library for making HTTP requests
import { formatRelative } from 'date-fns';
import { useState } from 'react';

// Define a functional component called SendIcon that takes props as an argument
const SendIcon = props => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);

// Define a functional component called Form that takes a prop called setMessages
export default function Form({ setMessages }) {
  const [message, setMessage] = useState('');

   // Define an asynchronous function called messageResponse that sends an HTTP POST request to a server endpoint with the user's message and adds the server's response to the array of messages using the setMessages function.
  const messageResponse = async () => {
    const { data } = await axios.post('http://localhost:4000/message', {
      message
    });

    setMessages(prev => [
      ...prev,
      {
        msg: data.message,
        type: 'bot',
        time: formatRelative(new Date(), new Date())
      }
    ]);
  };

    // Define a function called sendMessage that is called when the user clicks the "Send" button. It adds the user's message to the array of messages, clears the input field, and calls the messageResponse function to send the message to the server.
  const sendMessage = async e => {
    e.preventDefault();

    if (!message) return; // If the message is empty, return without doing anything

    setMessages(prev => [
      ...prev,
      {
        msg: message,
        type: 'user',
        time: formatRelative(new Date(), new Date())
      }
    ]); // Add the user's message to the array of messages using the setMessages function, along with a type of "user" and the current time formatted using the formatRelative function.


    setMessage('');

    await messageResponse();  // Call the messageResponse function to send the user's message to the server
  };

  return (
    <form className="relative flex items-center">
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        className="bg-[#3A3F47] text-white placeholder:text-[#949494] text-sm rounded-2xl p-4 w-full outline-none"
        placeholder="Type your message here..."
      />
      <button
        type="submit"
        onClick={sendMessage}
        className="absolute right-0 mr-2 bg-white hover:opacity-50 active:opacity-100 transition-colors py-2 px-3 rounded-xl"
      >
        <SendIcon className="w-5 h-5 fill-[#3A3F47]" />
      </button>
    </form>
  );
}
