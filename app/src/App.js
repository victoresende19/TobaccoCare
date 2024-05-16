import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import logo from './tabagismo.jpg';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(20);

  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResponse(null);
    setCountdown(20);
    try {
      const res = await axios.post('https://tobaccocare.rj.r.appspot.com/ask_question', { question: question });
      setResponse(res.data.answer);
    } catch (error) {
      setResponse('Erro ao obter resposta. Tente novamente.');
    }
    setLoading(false);
  };

  useEffect(() => {
    let timer;
    if (loading && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [loading, countdown]);

  return (
    <div className="container">
      <div style={{ position: 'relative', width: '100%' }}>
        <img src={logo} alt="Logo" />
        <div className="title-overlay">TobaccoCare</div>
      </div>
      <div className="description-text">
        O assistente TobaccoCare tem como objetivo fornecer uma aplicação que utilize a técnica de Retrieval Augmented Generation (RAG) para responder a perguntas específicas de médicos sobre o protocolo de tratamento do tabagismo, com base no documento disponibilizado pelo <a href="https://www.inca.gov.br/sites/ufu.sti.inca.local/files//media/document//protocolo-clinico-e-diretrizes-terapeuticas-do-tabagismo.pdf" target="_blank">INCA (Instituto Nacional de Câncer)</a>.
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
      {loading ? (
        <>
          <div>Isso pode levar cerca de {countdown} segundos...</div>
          <CircularProgress color="inherit" />
        </>
      ) : (
        <>
          <div className="response">{response || "Sua resposta aparecerá aqui..."}</div>
          <br /><br />
        </>
      )}
    </div>
  );
}

export default App;
