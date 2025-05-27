from sqlalchemy import Column, Integer, String, UniqueConstraint, CheckConstraint, Index
from database import Base

class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    carbon_credit_balance = Column(Integer, index=True)
    money_balance = Column(Integer, index=True)

    __table_args__ = (
        CheckConstraint("email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'", 
                       name="valid_email"),
        # Unique constraint on multiple columns
        UniqueConstraint('email', 'name', name='uix_email_name'),
        # Index on frequently queried columns
        Index('ix_users_email', 'email'),
        Index('ix_users_name', 'name'),
    )