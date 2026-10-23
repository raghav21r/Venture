from sqlalchemy import Column,String,Integer,JSON
from sqlalchemy.ext.declarative import declarative_base
playbook=declarative_base()
class Playbook_format(playbook):
    __tablename__='playbooks'
    id=Column(Integer,primary_key=True,autoincrement=True)
    sector=Column(String,nullable=False)
    stage=Column(String,nullable=False)
    milestone_title=Column(String)
    tactics=Column(JSON)
    tools_platforms=Column(JSON)
    success_metric=Column(String)
    next_stage_trigger=Column(String)
    funding_suggestion=Column(String)
    common_mistake=Column(String)
    experience=Column(Integer,nullable=True)
    core_skills=Column(String,nullable=True)