from pydantic import BaseModel
from datetime import date
class prompt_data(BaseModel):
    prompts:str
    user_email:str
