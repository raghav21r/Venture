from pydantic import BaseModel
from typing import Optional
class Side_Hustle_Data(BaseModel):
    mail:str
    core_skills:Optional[str]=None
    experience:Optional[int]=None