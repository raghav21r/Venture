from pydantic import BaseModel
from typing import List,Optional
class Tactic(BaseModel):
    title:str
    description:str
    platform:str
class Playbook_format(BaseModel):
    sector:str
    stage:str
    milestone_title:str
    tactics:List[Tactic]
    tools_platforms:List[str]
    success_metric:str
    next_stage_trigger:str
    funding_suggestion:str
    common_mistake:Optional[str]