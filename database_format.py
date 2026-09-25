from sqlalchemy import Column,Integer,String,Float
from sqlalchemy.ext.declarative import declarative_base
database_model=declarative_base()
class Profile(database_model):
    __tablename__='profile'
    name=Column(String)
    email=Column(String)
    password=Column(String)
    phone_number=Column(String,primary_key=True)
    job_title_or_work = Column(String)
    experience = Column(String) 
    core_skills = Column(String) 