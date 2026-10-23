from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
launchpad_model = declarative_base()

class StartUp_Roadmap(launchpad_model):
    __tablename__ = 'startup_roadmap'
    mail = Column(String)
    id = Column(Integer, primary_key=True, autoincrement=True)
    startup_idea = Column(String)
    industry_sector = Column(String)
    investment = Column(Float)
    current_mrr = Column(Float, default=0.0)
    monthly_income = Column(Float)
    monthly_savings = Column(Float)
    monthly_expenses = Column(Float)