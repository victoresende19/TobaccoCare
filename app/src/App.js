import React, { useState } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import logo from './tabagismo.jpg';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResponse(null);
    try {
      const res = await axios.post('https://medicalrag.onrender.com/ask_question', { question: question });
      setResponse(res.data.answer);
    } catch (error) {
      setResponse('Erro ao obter resposta. Tente novamente.');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div style={{ position: 'relative', width: '100%' }}>
        <img src={logo} alt="Logo" />
        <div className="title-overlay">TabaccoCare</div>
      </div>
      <div className="description-text">
        O assistente TabaccoCare tem como objetivo fornecer uma aplicação que utilize a técnica de Retrieval Augmented Generation (RAG) para responder a perguntas específicas de médicos sobre o protocolo de tratamento do tabagismo, com base no documento disponibilizado pelo INCA (Instituto Nacional de Câncer).
      </div>
      <p>Por favor, insira sua pergunta abaixo:</p>
      <input
        type="text"
        placeholder="Digite sua pergunta..."
        value={question}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>
        Enviar
      </button>
      {loading ? <><div>Isso pode levar cerca de 8 segundos... <br></br></div><CircularProgress color="inherit" /></> :
        <><div className="response">{response || "Sua resposta aparecerá aqui..."}</div><br></br><br></br></>
      }
    </div>
  );
}

export default App;
