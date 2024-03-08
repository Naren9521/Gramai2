#importing necessary modules 
from fastapi import FastAPI, HTTPException,Request, UploadFile, File
from typing import List,Dict
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.responses import HTMLResponse,FileResponse
from transformers import pipeline

import re
import nltk 
from nltk import sent_tokenize
from nltk.corpus import words
import pandas as pd 
import openai
import json
import language_tool_python
tool = language_tool_python.LanguageToolPublicAPI('en-US')
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from sqlalchemy import create_engine, Column, Integer, VARCHAR,String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select

import google.generativeai as genai

gemini_api_key = "AIzaSyA4bBJcK46WPwsq_uyneA2ZdItZpUr0Wsc"
genai.configure(api_key = gemini_api_key)
model = genai.GenerativeModel('gemini-pro')

db_user = 'postgres'
db_password = 'proshort123'
db_host = 'localhost'
db_port = '5432'
db_name = 'ent_fapi'

engine = create_engine(f'postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}')
Base = declarative_base()

class login_details(Base):
    __tablename__ = 'login_details'
    email_id = Column(String, primary_key=True)
    password = Column(String)
    
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/signup")
async def signup(data:dict):
    username = data.get('username')
    password = data.get('password')
    new_user = login_details(email_id=username, password=password)
    session.add(new_user)
    session.commit()
    session.close()

@app.post("/signin")
async def signin(data:dict):
    username = data.get('email')
    password = data.get('password')
    user = session.query(login_details).filter_by(email_id=username, password=password).first()
    return user is not None
    
@app.post("/translation")
async def translate(data:dict):
    response = model.generate_content(data.get('text')+" translate to english")
    text = response.text
    print(text)
    return {'text':text}


@app.post("/feedback")
async def feedback(text_data:dict):
    response = model.generate_content(text_data.get('text') + " Please give me honest feedback for the above text and also give a better sentence in place of it")
    text = response.text
    print(type(text))
    print(text)
    return {'text':text}
    
@app.post("/summarization")
async def summarize(text_data:dict):
    text = text_data.get("text","")
    summarizer = pipeline("summarization")
    return (summarizer(text, max_length=250, min_length=30, do_sample=False)[0]['summary_text'])

@app.post("/grammar_correct")
async def check_grammar(text_data:dict):
    sentence = text_data.get("text", "")
    try:     
        errors = []
        sentences = tokenize_sentences(sentence)     
        for sentence in sentences:
            suggestions = tool.check(sentence)            
            for mistake in suggestions:
                error_info = {
                'sentence':sentence,
                'error': sentence[mistake.offset:mistake.offset + mistake.errorLength],
                'suggestions': mistake.replacements
                }
                errors.append(error_info)
        response_data = {'errors': errors}
        print(response_data)
        return JSONResponse(content=response_data, status_code=200)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.post('/similar_text_class')
async def check_similar(text_data: dict):
    all_submissions = text_data['fileContents']
    all_filenames = text_data['fileNames']
    print(text_data)
    
    text1  = ""
    # Initialize variables to store the most similar text, its name, and similarity percentage
    most_similar_text_one = ""
    most_similar_text_two = ""
    most_similar_name_one = ""
    most_similar_name_two = ""
    max_similarity_percentage = 0.0
    for i in range(len(all_submissions)):
        for j in range(i+1,len(all_submissions)):
            similarity_percentage = calculate_similarity(all_submissions[i],all_submissions[j])
            if similarity_percentage > max_similarity_percentage:
                max_similarity_percentage = similarity_percentage
                most_similar_text_one = all_submissions[i]
                most_similar_text_two = all_submissions[j]
                most_similar_name_one = all_filenames[i]
                most_similar_name_two = all_filenames[j]
    # Return the most similar text, its name, and similarity percentage
    return JSONResponse(content={
        "most_similar_name_one": most_similar_name_one,
        "most_similar_text_one": most_similar_text_one,
        "most_similar_name_two": most_similar_name_two,
        "most_similar_text_two": most_similar_text_two,
        "overall_similarity": max_similarity_percentage
    }, status_code=200)
  
    
@app.post("/similar_text")
async def check_similarity(text_data: dict):
    text1 = text_data.get("text1", "")
    text2 = text_data.get("text2", "")

    if not text1 or not text2:
        raise HTTPException(status_code=400, detail="Both texts must be provided.")

    input_sentence_tokenized1 = sent_tokenize(text1)
    input_sentence_tokenized2 = sent_tokenize(text2)
    overall_similarity = calculate_similarity(text1,text2)
    similar_sentences = []

    for i in input_sentence_tokenized1:
        for j in input_sentence_tokenized2:
            similarity = calculate_similarity(i, j)
            if similarity >= 60:  # 60%threshold
                similar_sentences.append((i, j))
    return JSONResponse(content={"overall_similarity": overall_similarity, "similar_sentences": similar_sentences}, status_code=200)

    # return similar_sentences

def calculate_similarity(text1, text2):    
    vectorizer = CountVectorizer()
    vectorizer.fit([text1, text2])

    # texts to vectors
    vector1 = vectorizer.transform([text1]).toarray()
    vector2 = vectorizer.transform([text2]).toarray()

    # cosine similarity 
    similarity = cosine_similarity(vector1, vector2)[0, 0]
    
    # Converting cosine smilarity to percentage
    similarity_percentage = similarity * 100

    return similarity_percentage


def tokenize_sentences(text):
       
    text = text.replace('.', '. ')
    sentences = sent_tokenize(text)

    return sentences

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)