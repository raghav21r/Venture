from pydantic import BaseModel
from typing import List
class Generated(BaseModel):
    milestone:str
    action:str
class Roadmap_data(BaseModel):
    mail:str
    sector:str
    stage:str
    generated_priority:str
    generated_roadmap:List[Generated]
    funding_recommendation:str