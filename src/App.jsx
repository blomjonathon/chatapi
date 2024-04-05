import React, { useState } from 'react';
import axios from 'axios';

const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/chat/completions';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(apiUrl, {
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: question },
        ],
        model: 'gpt-3.5-turbo',
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });

      const answer = response.data.choices[0].message.content;
      setAnswer(answer);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>ChatGPT Frontend</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your question:
          <input type="text" value={question} onChange={handleChange} />
        </label>
        <button type="submit">Ask</button>
      </form>
      {answer && <div>Answer: {answer}</div>}
    </div>
  );
}

export default App;
