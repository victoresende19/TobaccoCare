# TobaccoCare

<hr>

A plataforma TobaccoCare tem como objetivo fornecer uma aplicação que utilize a técnica de Retrieval Augmented Generation (RAG) para responder a perguntas específicas de médicos sobre o protocolo de tratamento do tabagismo, com base no documento disponibilizado pelo INCA (Instituto Nacional de Câncer), do qual pode ser acessado [clicando aqui](https://www.inca.gov.br/sites/ufu.sti.inca.local/files//media/document//protocolo-clinico-e-diretrizes-terapeuticas-do-tabagismo.pdf). 

## Acesse 

Para facilitar o teste do MedicalChat, foi desenvolvido um website que realiza consultas à API criada. Dessa forma, a API foca em simplificar o acesso às informações contidas no "Protocolo Clínico e Diretrizes Terapêuticas do Tabagismo". A API foi criada através das bibliotecas FastAPI, FAISS (Meta), OpenAI e LangChain Community, em linguagem Python, e é necessário obter uma API_KEY da OpenAI, a qual você pode criar gratuitamente, basta [clicar aqui](https://openai.com/index/openai-api/). Além disso, visando a acessibilidade, criou-se a plataforma TobaccoCare por meio do framework React, em linguagem JavaScript. 

O deploy da API foi realizado utilizando o [Google Cloud](https://cloud.google.com/), sob o plano gratuito. Devido às limitações deste plano, como o uso de máquinas menos robustas, o tempo de resposta pode ser maior em comparação ao uso local da API. Por fim, o frontend da plataforma teve o deploy através do (Vercel)[https://vercel.com/]. Para acessar e testar o aplicativo, visite: [https://tabagismo-app.vercel.app/](https://tobacco-care.vercel.app/).

<hr>

# API

## Configurações

Para fazer o uso da API, basta seguir os seguintes passos:

- Instale as bibliotecas necessárias:
```
pip install -r requirements.txt
```

- No arquivo ```.env```, preencha sua API_KEY da OpenAI:
```
OPENAI_API_KEY=SUA_API_KEY
```

- Por fim, execute a API:
```
python -m uvicorn main:app
```

## Utilização
Para executar a API localmente, os seguintes métodos estarão disponíveis. Utilize ferramentas como o Postman ou Insomnia para realizar as requisições:
- Informações: método com as informações básicas referente a API:
    - ``` (GET): http://127.0.0.1:8000```
- Criação do banco de dados vetorial: método para criar o banco de dados vetorial:
    - ```(POST): http://127.0.0.1:8000/create_vector_db```

- Pergunta: método para enviar perguntas ao modelo, baseadas no contexto do PDF:
    - ``` (POST): http://127.0.0.1:8000/ask_question```
    - Corpo da Requisição JSON: ```{ "question": "Qual o CID do tabagismo?" }```
    - Corpo da Requisição JSON: ```{ "question": "Quais são os efeitos patológicos a longo prazo do tabagismo?" }```

## Tecnologias

Conforme mencionado anteriormente, o sistema foi desenvolvido em Python e faz uso dos seguintes frameworks e bibliotecas externas:
- FastAPI: Utilizado para a criação de uma API RESTful, permitindo uma interação eficiente e moderna entre o cliente e o servidor.
- LangChain Community: Aplicado no desenvolvimento de soluções que integram modelos de linguagem de larga escala (LLMs).
- PyPDF: Empregado na leitura e manipulação de documentos PDF, essencial para extrair textos dos arquivos.
- FAISS: Para busca eficiente de similaridade e agrupamento de vetores densos.
- OpenAI: Fornece modelos avançados de inteligência artificial para a criação de embeddings e geração de respostas baseadas em texto.

## Arquitetura
O sistema segue o fluxo operacional detalhado abaixo, cujo diagrama arquitetural pode ser consultado para mais informações:
- Leitura do PDF: A primeira etapa envolve a extração de texto dos documentos PDF, essencial para as operações subsequentes.
- Criação de um banco de dados vetorial para armazenar embeddings:
    - Os textos dos PDFs são divididos em segmentos menores (chunks), convertidos em embeddings e armazenados em um diretório com arquivo pickle para a busca eficiente de similaridade e agrupamento dos embeddings. Quando uma pergunta é feita, ela também é transformada em embedding, assim o sistema compara esses vetores com os armazenados, usando a diferença de cossenos para encontrar os textos mais relevantes e próximos à pergunta, criando o contexto que será utilizado em um template de prompt para responder à pergunta de fato;
    - Para criação dos embeddings, foi utilizado o [OpenAIEmbeddings](https://platform.openai.com/docs/guides/embeddings/use-cases);
- Prompt template:
    - Retorna os documentos do arquivo pickle gerado pelo FAISS, que são considerados relevantes para a pergunta com base em suas pontuações de similaridade, visando a criação do contexto.
    - Responda as perguntas baseado apenas no contexto a seguir:
    {contexto}
    Responda à pergunta com base no contexto acima: {pergunta}.
    Forneça uma resposta detalhada.
    Não justifique suas respostas.
    Não forneça informações não mencionadas nas INFORMAÇÕES DE CONTEXTO.
    Não diga “de acordo com o contexto” ou “mencionado no contexto” ou similar.
- Responde a pergunta por meio do contexto fornecido (PDF) e prompt, utilizando o modelo OpenAI (gpt-3.5-turbo-0125).

<hr>

## Esquematização plataforma TobaccoCare
![Untitled (1)](https://github.com/victoresende19/TobaccoCare/assets/63743020/e5add826-0cda-4079-9c38-f2f6cb9307e3)

## Esquematização LLM com RAG (API)
![Untitled](https://github.com/victoresende19/TabagismoRAG/assets/63743020/eb4cb83e-b179-4c07-bc93-c806262ad579)





