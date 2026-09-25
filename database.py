from sqlalchemy import create_engine,URL
from sqlalchemy.orm import sessionmaker
db_url=URL.create(
    drivername='postgresql',
    username='postgres',
    password='raghav21@2005',
    host='localhost',
    port=5432,
    database='User_Profile'
)

engine=create_engine(db_url)
conn=sessionmaker(autocommit=False,autoflush=False,bind=engine)
SessionLocal=conn
