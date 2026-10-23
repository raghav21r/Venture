from typing import Optional
from pydantic import BaseModel
class New_Mentor(BaseModel):
    advisor_mail:str
    phone_number:str
    name:str
    bio:str
    domain:str
    date:Optional[str]=None
    time_slot:Optional[str]=None
