from sqlalchemy import Column,Integer,String,Float,Date
from sqlalchemy.ext.declarative import declarative_base
prompts=declarative_base()
class Prompt_format(prompts):
    __tablename__='prompt'
    id=Column(Integer,primary_key=True,autoincrement=True)
    user_email=Column(String)
    user_prompt=Column(String)
    ai_response=Column(String)
    