from pydantic import BaseModel
class Content(BaseModel):
    name:str
    email:str
    password:str
    phone_number:str
    job_title_or_work:str
    experience:int
    core_skills:str
