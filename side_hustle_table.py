from sqlalchemy import String,Float,Column,Integer
from sqlalchemy.ext.declarative import declarative_base
side_model=declarative_base()
class SideHustle(side_model):
    __tablename__='side_hustle'
    mail=Column(String)
    id=Column(Integer,primary_key=True,autoincrement=True)
    core_skills=Column(String)
    experience=Column(Integer)
