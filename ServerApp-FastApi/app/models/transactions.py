from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from database import Base


class Transactions(Base):
     __tablename__ = 'transactions'
     id = Column(Integer, primary_key=True)
     certificate_id = Column(UUID(as_uuid=True), ForeignKey('carbon_credit_certificates.certificate_id'), index=True)
     date_time = Column(DateTime, default=datetime.now(), nullable=False)
     from_user = Column(Integer, ForeignKey("users.id"), index=True)
     to_user = Column(Integer, ForeignKey("users.id"), index=True)
