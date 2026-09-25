from sqlalchemy import Column,Integer,String,Float
from sqlalchemy.ext.declarative import declarative_base
declrative_model=declarative_base()
class Stage(declrative_model):
    __tablename__='stage'
    id=Column(Integer,autoincrement=True,primary_key=True)
    mail=Column(String)
    stage=Column(String)
    current_mrr=Column(Float)
    state_of_company=Column(String)