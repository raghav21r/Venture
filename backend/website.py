from fastapi import FastAPI,Depends,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from display import Content
from launchpad_data import Startup_data
import database_format
from connect import Advisor
from playbook_data import playbooks_data
from login import Login
import connect_format
import set_table
from roadmap_format import Roadmap_feature
import playbook_format
import json,re
from side_hustle import Side_Hustle_Data
import side_hustle_table
import playbook_table
from playbook_table import Playbook_format,playbook
import launchpad_feature
from enum import Enum
from set import SetStage
from database import engine,conn,SessionLocal
from prompt_format import prompt_data
import chatbot_prompt
import joblib
import uuid
import ftfy
import roadmap_format
from mentorship_format import New_Mentor
import pandas as pd
import numpy as np
import requests as req
from tensorflow.keras.preprocessing.text import one_hot
from AI_model import chat
web=FastAPI()
web.add_middleware(
    CORSMiddleware,allow_origins='http://localhost:3000',allow_credentials=True,allow_methods=['*'],
    allow_headers=['*'],
)
set_table.declrative_model.metadata.create_all(bind=engine)
side_hustle_table.side_model.metadata.create_all(bind=engine)
database_format.database_model.metadata.create_all(bind=engine)
launchpad_feature.StartUp_Roadmap.metadata.create_all(bind=engine)
chatbot_prompt.prompts.metadata.create_all(bind=engine)
connect_format.connection_model.metadata.create_all(bind=engine)
playbook_table.Playbook_format.metadata.create_all(bind=engine)
roadmap_format.Roadmap_feature.metadata.create_all(bind=engine)
vectorizer_comp=joblib.load('vector_convertor_suggestion.pkl')
side_hustle_model=joblib.load('side_hustle_model.pkl')
mvp_predictor=joblib.load('total_cost_predictor.pkl')
time_period_model=joblib.load('time_predictor.pkl')
vocabulary=joblib.load('launch_vocab_size.pkl')
dicts=joblib.load('sector_mapping.pkl')
new_webhook="http://localhost:5678/webhook-test/book_appointment"
class Sector(str,Enum):
    d='D2C'
    b='B2C'
    b2b='B2B'
    b2c='B2C'

dbb=SessionLocal()
for value in playbooks_data:
    dbb.add(Playbook_format(**value))
dbb.commit()
dbb.close()
def configuring_venture_bot(user,road_map,profile,stage):
    if road_map:
        context = f"""You are VentureBot, an AI startup consultant for the Indian startup ecosystem.
This founder has an active Scaling Engine roadmap already generated for them. Ground your advice
in this existing roadmap and their profile — be consistent with what they've already been told,
and help them solve specific problems as they come up, rather than repeating the full roadmap.

FOUNDER'S PROFILE:
- Startup idea: {user.startup_idea}
- Sector: {user.industry_sector}, Stage: {stage.stage}
- Job title / background: {profile.job_title_or_work}
- Core skills: {profile.core_skills}

CURRENT ACTIVE ROADMAP:
- This quarter's priority: {road_map.generated_priority}
- Roadmap milestones: {road_map.generated_roadmap}
- Funding recommendation: {road_map.funding_recommendation}

Answer the founder's questions directly and practically. Reference the roadmap above when relevant,
but focus on solving the specific problem they're asking about right now."""
    else:
        context = f"""You are VentureBot, an AI startup consultant for the Indian startup ecosystem.
This founder hasn't generated a Scaling Engine roadmap yet. Use their basic profile below to give
grounded, practical advice.

FOUNDER'S PROFILE:
- Startup idea: {user.startup_idea if user else 'Not yet provided'}
- Sector: {user.industry_sector if user else 'Unknown'}
- Job title / background: {profile.job_title_or_work if user else 'Unknown'}"""
    return context

def configuration_of_chatbot(playbook,user,profile):
    system_prompt=f"""You are VentureBot's Scaling Strategist, an expert AI startup consultant 
    specialized in the Indian startup ecosystem. You are given a proven strategy playbook for a 
    specific sector and stage, along with a specific founder's real financial and professional profile. 
    Your job is to adapt the playbook into a personalized, practical roadmap for THIS founder — 
    not repeat generic advice.

    PROVEN PLAYBOOK ({playbook.sector} sector, {playbook.stage} stage):
    - Core milestone: {playbook.milestone_title}
    - Tactics: {playbook.tactics}
    - Tools/platforms: {playbook.tools_platforms}
    - Success metric: {playbook.success_metric}
    - Next stage trigger: {playbook.next_stage_trigger}
    - Funding suggestion: {playbook.funding_suggestion}
    - Common mistake to avoid: {playbook.common_mistake}

    FOUNDER'S REAL PROFILE:
    - Startup idea: {user.startup_idea}
    - Job title / current work: {profile.job_title_or_work}
    - Core skills: {profile.core_skills}
    - Years of experience: {profile.experience}
    - Monthly income: ₹{user.monthly_income}
    - Monthly savings: ₹{user.monthly_savings}
    - Monthly expenses: ₹{user.monthly_expenses}
    - Investment available: ₹{user.investment}

    INSTRUCTIONS:
    1. Identify the single most important priority this founder should focus on this quarter, 
    chosen from the playbook's tactics but tailored to fit their specific skills, background, 
    and available capital.
    2. Break this down into a 90-day roadmap of 3-5 concrete milestones, each paired with one 
    specific action the founder should take. Ground these in the playbook's tactics, but 
    adjust scope/budget to match what this founder can realistically execute.
    3. Recommend a funding approach appropriate to their financial situation, informed by but 
    not limited to the playbook's funding suggestion — factor in their actual savings and 
    investment available.
    4. If their available investment or savings appears insufficient for any tactic, adjust the 
    roadmap's first milestone to address that constraint directly rather than ignoring it.
    5. Do not invent tools, platforms, or programs not present in the playbook or well-established 
    in the Indian startup ecosystem.
    6. Respond with ONLY a valid JSON object, no markdown code fences, no explanation text before 
    or after. Use exactly this structure:

    {{
    "generated_priority": "one clear sentence stating this quarter's top priority",
    "generated_roadmap": [
        {{"milestone": "short milestone name", "action": "specific action to take"}},
        {{"milestone": "short milestone name", "action": "specific action to take"}}
    ],
    "funding_recommendation": "one to two sentences on the appropriate funding approach for this founder"
    }}
    """
    return [{'role':'system','content':system_prompt}]

import re

def parsing2(text: str) -> str:
    if not text:
        return text
    # Remove stray non-Latin script fragments
    text=ftfy.fix_text(text)
    text = re.sub(r'[\u0600-\u06FF\u0400-\u04FF\u0900-\u0D7F\u4e00-\u9fff]+', '', text)
    # Remove isolated single/double stray uppercase-letter artifacts glued to real words (e.g. "Wed Ul")
    # Collapse extra whitespace
    text = re.sub(r' {2,}', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()
def parsing(ai_response):
    if not ai_response:
        return None
    clean = re.sub(r'^```json\s*|\s*```$', '', ai_response.strip())
    try:
        return json.loads(clean)
    except json.JSONDecodeError as e:
        print(f"JSON parse failed: {e}")
        print(f"Attempted to parse: {clean[:500]}...")
        return None
def top_3_suggestions(skills_data):
    scores=side_hustle_model.decision_function(skills_data)[0]
    top_3=np.argsort(scores)[-3:][::-1]
    side_hustle_work=[]
    for idx in top_3:
        side_hustle_work.append({
            'side_hustle':side_hustle_model.classes_[idx]
        })
    return side_hustle_work
def get_db():
    db=conn()
    try:
        yield db
    finally:
        db.close()

@web.get('/')
def home():
    return "Make Your Startup Ambition True"
@web.get('/Profile')
def show(mail:str,database:Session=Depends(get_db)):
    content= database.query(database_format.Profile).filter(database_format.Profile.email==mail).first()
    if content:
        return {
            'name':content.name,
            'email':content.email,
            'Phone Number':content.phone_number,
            'Job Title/Work':content.job_title_or_work
        }
    return {'message':'Invalid credentials'}
@web.post('/Signup')
def input_section(info:Content,database:Session=Depends(get_db)):
    new_user = database_format.Profile(**info.model_dump())
    database.add(new_user)
    database.commit()
    return {"status":'Sign Up Completed'}

@web.post('/Login')
def login_page(credentials: Login, database: Session = Depends(get_db)):
    credential = database.query(database_format.Profile)\
                          .filter(database_format.Profile.email == credentials.email)\
                          .filter(database_format.Profile.password == credentials.password).first()
    if not credential:
        return {'status': 'Login failed', 'message': 'Invalid password or email'}
    return {
        'status': 'Login successfull',
        'email': credential.email,
        'name': credential.name
    }

@web.post("/Launchpad")
def startup_planner(idea: Startup_data, database: Session = Depends(get_db)):

    database.add(launchpad_feature.StartUp_Roadmap(**idea.model_dump()))
    database.commit()

    # Step 2 — Fetch record

    records = (
        database.query(launchpad_feature.StartUp_Roadmap)
        .filter(launchpad_feature.StartUp_Roadmap.mail == idea.mail)
        .order_by(launchpad_feature.StartUp_Roadmap.id.desc())
        .first()
    )

    # Step 3 — Extract fields
    sector          = records.industry_sector.lower()
    invest          = records.investment
    income          = records.monthly_income
    spendings       = records.monthly_expenses
    monthly_savings = records.monthly_savings       # ← calculate, don't fetch
    # Step 4 — Encode
    sector_encoded = dicts.get(sector, 0)
    idea_encoded   = one_hot(records.startup_idea, vocabulary)  # must return DataFrame with 4 cols
    print("vocabulary:", vocabulary)
    print("type:", type(vocabulary))

# Test one_hot output
    test = one_hot("AI powered finance tracker", vocabulary)
    print("one_hot output:", test)
    # Step 5 — Build MVP input
    sector_df = pd.DataFrame([[sector_encoded]], columns=['sector'])
    expected=['sector','0','1','2','3']
    # Handle both numpy array and DataFrame from one_hot()
    if isinstance(idea_encoded, pd.DataFrame):
        idea_df = idea_encoded
    else:
        idea_df = pd.DataFrame(idea_encoded)

    mvp_data = pd.concat([sector_df, idea_df], axis=1)
    mvp_data=mvp_data.reindex(columns=expected,fill_value=0)
    
    # Step 6 — Predict MVP cost
    mvp_cost       = float(mvp_predictor.predict(mvp_data)[0])  # ← convert to float
    emergency_fund = 0.2 * mvp_cost
    buffer         = spendings * 6
    total_capital  = mvp_cost + buffer + emergency_fund

    # Step 7 — Predict time period
    base_data = pd.DataFrame([{
        'sector':          sector_encoded,
        'monthly_income':  income,
        'monthly_expenses': spendings,
        'monthly_savings': monthly_savings,
        'investment':      invest,
        'survival_buffer': buffer,
        'total_capital':   total_capital
    }])
    time_period_data=pd.concat([base_data,idea_df.reset_index(drop=True)],axis=1)
    expected_features=['sector','monthly_income','monthly_expenses','monthly_savings'
                       ,'investment','survival_buffer','total_capital','0','1','2','3','4','5']
    time_period_data=time_period_data.reindex(columns=expected_features,fill_value=0)
    total_time_to_build = float(time_period_model.predict(time_period_data)[0])
    
            
    # Step 8 — Return response
    return {
        "mvp_cost":           round(mvp_cost, 2),
        "survival_buffer":    round(buffer, 2),
        "emergency_fund":     round(emergency_fund, 2),
        "total_capital":      round(total_capital, 2),
        "months_to_launch":   round(total_time_to_build, 1),
    }
@web.post('/SideHustle')
def side(details:Side_Hustle_Data,database:Session=Depends(get_db)):
    side_hustle_info=[]
    database.add(side_hustle_table.SideHustle(**details.model_dump()))
    database.commit()
    record=(
        database.query(launchpad_feature.StartUp_Roadmap)
        .filter(launchpad_feature.StartUp_Roadmap.mail == details.mail)
        .order_by(launchpad_feature.StartUp_Roadmap.id.desc())
        .first()
    )
    skills= details.core_skills.lower()
    experience=details.experience
    if not record:
        raise HTTPException(status_code=404,detail='User not found')
    skills_encoded=vectorizer_comp.transform([skills]).toarray()
    skills_encoded1=pd.DataFrame(skills_encoded,columns=[str(i) for i in range(skills_encoded.shape[1])])
    exeprience_df=pd.DataFrame([[experience]],columns=['experience'])
    side_hustle_data=pd.concat([skills_encoded1,exeprience_df],axis=1)
    if hasattr(side_hustle_model,'feature_names_in_'):
        side_hustle_data=side_hustle_data.reindex(columns=side_hustle_model.feature_names_in_,fill_value=0)
        side_hustle=top_3_suggestions(side_hustle_data)
        for activity in side_hustle:
            hustle_name=activity.get('side_hustle')
            for key,value in activity.items():
                prompt=f"what is {value} as a side hustle?Answer it in 2 sentences."
                details=chat([{'role':'user','content':prompt}],500)
                side_hustle_info.append({
                    'side_hustle':hustle_name,
                            'description':details
                        })
    return {'side_hustle':side_hustle_info}
@web.post('/SetStage')
def set_stage(details:SetStage,database:Session=Depends(get_db)):
    company_state=database.query(set_table.Stage).filter(set_table.Stage.mail==details.mail).first()
    if company_state is None:
        company_state=set_table.Stage(
            mail=details.mail,stage=details.stage,current_mrr=details.current_mrr,state_of_company=details.state_of_company
        )
        database.add(company_state)
    else:
        company_state.stage=details.stage.value
        company_state.current_mrr=details.current_mrr
        company_state.state_of_company=details.state_of_company
    database.commit()
    return {'status':'updated','mail':company_state.mail,'stage':company_state.stage,'state of company':company_state.state_of_company}
@web.post('/ScalingEngine')
def scaling_engine(user_email: str, database: Session = Depends(get_db)):
    # 1. Fetch user's Launchpad profile
    stage = database.query(set_table.Stage)\
                    .filter(set_table.Stage.mail == user_email)\
                    .first()
    user= database.query(launchpad_feature.StartUp_Roadmap)\
                    .filter(launchpad_feature.StartUp_Roadmap.mail == user_email)\
                    .first()
    profile=database.query(database_format.Profile).filter(database_format.Profile.email==user_email).first()
    if not user:
        return {"error": "sign in or create account"}

    # 2. Ensure stage is set before proceeding
    if not stage.stage:
        return {"error": "Stage not set. Please call /SetStage first."}

    # 3. Fetch matching playbook
    playbook = database.query(Playbook_format)\
                        .filter(Playbook_format.sector == user.industry_sector,
                                Playbook_format.stage == stage.stage)\
                        .first()
    if not playbook:
        return {"error": f"No playbook found for sector={user.industry_sector}, stage={stage.stage}"}

    # 4. Build prompt and call the model
    messages = configuration_of_chatbot(playbook,user,profile)
    raw_response = chat(messages,2500)  # see note below on chat() signature
    print(f"raw ai response:{repr(raw_response)}")
    # 5. Parse response
    parsed = parsing(raw_response)
    print(f"parsed ai response:{repr(parsed)}")
    # 6. Overwrite logic — check if a roadmap already exists for this user
    existing = database.query(Roadmap_feature)\
                        .filter(Roadmap_feature.mail == user_email)\
                        .first()

    if parsed:
        roadmap_json = parsed.get("generated_roadmap", [])
        priority = parsed.get("generated_priority", "")
        funding = parsed.get("funding_recommendation", "")
    else:
        # fallback — store raw text so nothing is lost
        roadmap_json = []
        priority = raw_response
        funding = "Could not parse structured recommendation — see priority field for raw output."

    if existing:
        existing.sector = user.industry_sector
        existing.stage = stage.stage
        existing.generated_priority = priority
        existing.generated_roadmap = roadmap_json
        existing.funding_recommendation = funding
    else:
        database.add(Roadmap_feature(
            mail=user_email,
            sector=user.industry_sector,
            stage=stage.stage,
            generated_priority=priority,
            generated_roadmap=roadmap_json,
            funding_recommendation=funding
        ))

    database.commit()

    return {
        "priority": priority,
        "roadmap": roadmap_json,
        "funding_recommendation": funding
    }
@web.post('/Chatbot')
def venture_bot(prompt:prompt_data,database:Session=Depends(get_db)):
    user=database.query(launchpad_feature.StartUp_Roadmap)\
                  .filter(launchpad_feature.StartUp_Roadmap.mail==prompt.user_email)\
                  .first()
    road_map=database.query(Roadmap_feature)\
                     .filter(Roadmap_feature.mail==prompt.user_email)\
                     .first()
    history=database.query(chatbot_prompt.Prompt_format)\
                      .filter(chatbot_prompt.Prompt_format.user_email == prompt.user_email)\
                      .all()
    profile=database.query(database_format.Profile)\
                    .filter(database_format.Profile.email==prompt.user_email)\
                        .first()
    stage=database.query(set_table.Stage)\
                    .filter(set_table.Stage.mail==prompt.user_email)\
                    .first()
    context=configuring_venture_bot(user,road_map,profile,stage)

    messages=[{'role':'system','content':context}]
    for h in history:
        messages.append({'role':'user','content':h.user_prompt})
        if h.ai_response:
            messages.append({'role':'assistant','content':h.ai_response})
    messages.append({'role':'user','content':prompt.prompts})
    response=chat(messages,1000)
    response=parsing2(response)
    database.add(chatbot_prompt.Prompt_format(
        user_email=prompt.user_email,
        user_prompt=prompt.prompts,
        ai_response=response
    ))
    database.commit()
    return {'response': response}
@web.get("/ChatBot/history")
def chat_history(user_email:str,database:Session=Depends(get_db)):
    history=database.query(chatbot_prompt.Prompt_format)\
                  .filter(chatbot_prompt.Prompt_format.user_email == user_email)\
                  .all()
    database.commit()
    return [
        {'user':h.user_prompt,'ai':h.ai_response} for h in history
    ]
@web.post('/Mentorship')
def connect_to_experts(new_mentor:New_Mentor,database:Session=Depends(get_db)):
    database.add(connect_format.Connection(
        mail=new_mentor.advisor_mail,
        phone_number=new_mentor.phone_number,
        name=new_mentor.name,
        bio=new_mentor.bio,
        domain=new_mentor.domain,
    ))
    database.commit()
    
    
    return (
        {'name':new_mentor.name,'bio':new_mentor.bio,'MailID':new_mentor.advisor_mail,'Contact':new_mentor.phone_number}
    )
@web.get('/Mentorship/Experts')
def get_experts(database:Session=Depends(get_db)):
    experts=database.query(connect_format.Connection).all()
    database.commit()
    return (
        {
            'name':e.name,'bio':e.bio,'domain':e.domain,'mail': e.mail,'phone_number': e.phone_number
        }
        for e in experts
    )
@web.post('/Mentorship/book')
def book_appointment(user_details: Advisor, database: Session = Depends(get_db)):
    meeting_link = f"https://p2p.mirotalk.com/join/{uuid.uuid4().hex[:8]}"

    database.add(connect_format.Connection(
        user_name=user_details.user_name,
        user_mail=user_details.user_mail,
        mail=user_details.advisor_mail,
        name=user_details.name,
        bio=user_details.bio,
        domain=user_details.domain,
        date=user_details.date,
        time_slot=user_details.time_slot,
    ))
    database.commit()

    try:
        req.post(new_webhook, json={
            "Sender's Name": user_details.user_name,
            'name': user_details.name,
            'expert_mail': user_details.advisor_mail,
            'user_mail': user_details.user_mail,
            'date': user_details.date,
            'time_slot': user_details.time_slot,
            'meeting_link': meeting_link
        })
    except Exception as e:
        print(f"n8n webhook call failed: {e}")

    return {'response': 'Appointment booked', 'status': 'pending acknowledgement'}
@web.get('/Mentorship/appointment')
def mentor(user_email:str,database:Session=Depends(get_db)):
    booking_details=database.query(connect_format.Connection)\
                            .filter(connect_format.Connection.user_mail==user_email)\
                            .all()
    database.commit()
    return[
        {
            "mentor_name":detail.name,
            "mentor_mail":detail.mail,
            "domain":detail.domain,
            "date":detail.date,
            "time_slot":detail.time_slot
        }
        for detail in booking_details
    ]
