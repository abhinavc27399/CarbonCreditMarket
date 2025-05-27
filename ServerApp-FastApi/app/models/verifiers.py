from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, Index
from sqlalchemy.dialects.postgresql import TSVECTOR
from database import Base


class Verifiers(Base):
    __tablename__ = 'verifiers'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    description = Column(String)
    