from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# URL for a local db with super user 'postgres' and its password, change accordingly as per requirements
URL_DATABASE = 'postgresql://postgres:{password}@localhost:5432/CarbonCreditMarket'

# Create engine and session maker for db 
engine = create_engine(URL_DATABASE)
sessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# DB connection (Session Based)
def get_db():
    db = sessionLocal()
    try:
        yield db
    finally:
        db.close()

# Base model for all tables
Base = declarative_base()
