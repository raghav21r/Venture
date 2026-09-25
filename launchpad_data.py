from pydantic import BaseModel
from datetime import date
from typing import Optional
class Startup_data(BaseModel):
    mail:str
    startup_idea:str
    industry_sector:str
    investment:float
    monthly_savings:float
    monthly_income:float
    monthly_expenses:float
    
