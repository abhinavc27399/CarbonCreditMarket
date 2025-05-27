from sqlalchemy import Column, ForeignKey, Integer, Date
from sqlalchemy.dialects.postgresql import UUID
from database import Base

class CertificateIssuance(Base):
     __tablename__ = 'certificate_issuance'

     certificate_id = Column(UUID(as_uuid=True), ForeignKey("carbon_credit_certificates.certificate_id"), primary_key=True)
     issuer_id = Column(Integer, ForeignKey("issuers.id"), index=True)
     issued_on = Column(Date, index=True)     
     