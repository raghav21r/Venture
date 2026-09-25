from sqlalchemy import String,Column,Float,JSON,Integer
from sqlalchemy.ext.declarative import declarative_base
roadmap=declarative_base()
class Roadmap_feature(roadmap):
    __tablename__='roadmap'
    id=Column(Integer,primary_key=True,autoincrement=True)
    mail=Column(String)
    sector=Column(String)
    stage=Column(String)
    generated_priority=Column(String)
    generated_roadmap=Column(JSON)
    funding_recommendation=Column(String)