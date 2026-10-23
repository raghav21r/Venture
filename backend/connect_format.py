from sqlalchemy import String,Column,Integer
from sqlalchemy.ext.declarative import declarative_base
connection_model=declarative_base()
class Connection(connection_model):
    __tablename__='connection_circle'
    id=Column(Integer,primary_key=True,autoincrement=True)
    user_name=Column(String)
    user_mail=Column(String)
    mail=Column(String)
    phone_number=Column(String(15))
    name=Column(String)
    bio=Column(String)
    domain=Column(String)
    date=Column(String, nullable=True)
    time_slot=Column(String, nullable=True)