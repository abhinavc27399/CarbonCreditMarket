from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date, Index
from sqlalchemy.dialects.postgresql import TSVECTOR
from database import Base


class Issuers(Base):
    __tablename__ = 'issuers'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    description = Column(String)
