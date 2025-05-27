from sqlalchemy import Boolean, Column, Integer, String, Date, Index
from sqlalchemy.dialects.postgresql import UUID, TSVECTOR
import uuid
from database import Base

class CarbonCreditCertificates(Base):
     __tablename__ = 'carbon_credit_certificates'

     certificate_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)   
     project_description = Column(String)
     price = Column(Integer)
     vintage = Column(Date, index=True)
     carbon_reduction_amount = Column(Integer, index=True)
     certification_standard = Column(String, index=True)    
     retirement_status = Column(Boolean, index=True)
     social_benefits = Column(String)
     search_vector = Column(TSVECTOR, nullable=False)

     __table_args__ = (
        Index('ix_certificate_search_vector', 'search_vector', postgresql_using='gin'),
     )