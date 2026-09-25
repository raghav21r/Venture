from openai import OpenAI
import time
from key import api

client = OpenAI(api_key=api, base_url="https://openrouter.ai/api/v1")

model="openrouter/free"
def chat(message,tokens):
    
    print(f"Trying {model}...")
    response = client.chat.completions.create(
    model=model,
    messages=message,
    max_tokens=tokens
    )
    print(f"Success with {model}")
    return response.choices[0].message.content
