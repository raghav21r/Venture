from pydantic import BaseModel
from enum import Enum
class Stage(str,Enum):
    pre_revenue='pre_revenue'
    early_revenue='early_revenue'
    scaling='scaling'

class SetStage(BaseModel):
    mail:str
    stage:Stage
    current_mrr:float=0.0
    state_of_company:str