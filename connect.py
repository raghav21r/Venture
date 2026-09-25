from typing import Optional

from pydantic import BaseModel
from datetime import time
class Advisor(BaseModel):
    user_mail:str
    user_name:str
    advisor_mail:str
    phone_number:str
    name:str
    bio:str
    domain:str
    date:Optional[str]=None
    time_slot:Optional[str]=None