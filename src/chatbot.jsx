import React, { useState, useEffect, useRef } from 'react';
import './main.css';
import axios from 'axios';

function App() {
  const [mensagens, setMensagens] = useState([]);
  const [mensagemDigitada, setMensagemDigitada] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const corpoRef = useRef(null);
  const apiKey = 'xxxxxx-xxxxxx-xxxxxxx'; //Substitua pelo apiKey fornecida


  const userId = localStorage.getItem('userId'); 
  console.log(userId)
  

  const handleEnviarMensagem = async () => {
    if (mensagemDigitada) {
      setIsLoading(true);

      
      const userMessage = `${mensagemDigitada} Em no máximo 150 caracteres`;
      const newUserMessage = { user: mensagemDigitada };
      const updatedMessages = [...mensagens, newUserMessage];

      try {
        const client = axios.create({
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });

        const params = {
          model: 'text-davinci-003',
          prompt: userMessage, 
          max_tokens: 150, 
          temperature: 0.5,
        };

        const result = await client.post('https://api.openai.com/v1/completions', params);

        let modelResponse = result.data.choices[0].text;

        
        modelResponse = modelResponse.replace('Em no máximo 150 caracteres', '');

        setIsLoading(false);

        const newBotMessage = { bot: modelResponse };
        updatedMessages.push(newBotMessage);

        setMensagens(updatedMessages);
        setMensagemDigitada('');

      
        saveMessagesToLocalStorage(userId, updatedMessages);
      } catch (error) {
        console.error(`Error -> ${error}`);
        setIsLoading(false);
      }
    }
  };

  const saveMessagesToLocalStorage = (userId, messages) => {
    localStorage.setItem(`chatHistory-${userId}`, JSON.stringify(messages));
  };

  const getMessagesFromLocalStorage = (userId) => {
    const storedMessages = localStorage.getItem(`chatHistory-${userId}`);
    return storedMessages ? JSON.parse(storedMessages) : [];
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleEnviarMensagem();
    }
  };

  useEffect(() => {
    if (corpoRef.current) {
      corpoRef.current.scrollTop = corpoRef.current.scrollHeight;
    }
  }, [mensagens]);

  useEffect(() => {
    if (userId) {
   
      const storedMessages = getMessagesFromLocalStorage(userId);
      if (storedMessages.length > 0) {
        setMensagens(storedMessages);
      }
    }
  }, [userId]);

  return (
    <div className='container'>
      <div className='box'>
        <div className='titulo'>
          <h1>MACIEL GPT</h1>
        </div>
        <div className='corpo' ref={corpoRef}>
          {mensagens.map((message, index) => (
            <div key={index} className='mensagem'>
              {message.user && (
                <div className='user-message'>
                  <div className='user-balloon'>
                    {message.user.replace(' resumida em no máximo 150 tokens', '')}
                  </div>
                </div>
              )}
              {message.bot && (
                <div className='bot-message'>
                  <div className='bot-balloon'>
                    {message.bot}
                  </div>
                </div>
              )}
            </div>
          ))}
          {isLoading && <div className='loading'>Carregando...</div>}
        </div>
        <div className='enviar'>
          <button onClick={handleEnviarMensagem}>Enviar</button>
          <input
            type='text'
            value={mensagemDigitada}
            onChange={(e) => setMensagemDigitada(e.target.value)}
            placeholder='Digite sua mensagem'
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
