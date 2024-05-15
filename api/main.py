from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from utils.pdf_reader import pdf_extract
from utils.db_embeddings import create_db_embeddings, query_vector_db
from utils.model import rag_model
from utils.schema import Query
from dotenv import load_dotenv
import numpy as np
import pickle
import os

load_dotenv() 
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_methods=["GET", "POST"],
    allow_credentials=True,
    allow_origins=["*"], 
    allow_headers=["*"]
)

VECTOR_STORE_PATH = "db"
DOC_PATH = "data/protocolo-clinico-e-diretrizes-terapeuticas-do-tabagismo.pdf"
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')

@app.get("/")
async def root():
    return JSONResponse(
        status_code = 200,
        content = {
            "info": "Essa API tem como objetivo fornecer uma aplicação que utilize a técnica de Retrieval Augmented Generation (RAG) para responder a perguntas específicas de médicos sobre o protocolo de tratamento do tabagismo, com base no documento disponibilizado pelo INCA (Instituto Nacional de Câncer)."
        },
    )

@app.get("/create_vector_db")
async def create_vector_db():
    try:
        pages = pdf_extract(DOC_PATH)
        create_db_embeddings(pages, OPENAI_API_KEY, VECTOR_STORE_PATH)
        return JSONResponse(
            status_code=200, 
            content={"message": "Banco de dados vetorial criado com sucesso."}
            )
    except Exception as e:
        return JSONResponse(
            status_code=500, 
            content={"error": str(e)}
        )

@app.post("/ask_question")
async def ask_question(query: Query):
    try:
        question = query.question
        pages = pdf_extract(DOC_PATH)
        docs_faiss = query_vector_db(pages, question, OPENAI_API_KEY, VECTOR_STORE_PATH)
        context_text = "\n\n".join([doc.page_content for doc, _score in docs_faiss])
        answer = rag_model(context_text, question, OPENAI_API_KEY)
        return JSONResponse(
            status_code=200, 
            content={"answer": answer}
        )
    except Exception as e:
        return JSONResponse(
            status_code=500, 
            content={"error": str(e)}
        )
