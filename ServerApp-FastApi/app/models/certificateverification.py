from sqlalchemy import Column, ForeignKey, Integer, Date
from sqlalchemy.dialects.postgresql import UUID
from database import Base

class CertificateVerification(Base):
     __tablename__ = 'certificate_verification'

     certificate_id = Column(UUID(as_uuid=True), ForeignKey("carbon_credit_certificates.certificate_id"), primary_key=True)
     verifier_id = Column(Integer, ForeignKey("verifiers.id"), index=True)
     verified_on = Column(Date, index=True)  