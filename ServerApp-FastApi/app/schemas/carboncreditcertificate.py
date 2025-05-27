from pydantic import BaseModel
from datetime import datetime
from transactionhistory import TransactionHistory

class CarbonCreditSearchRequest(BaseModel):
    search_text: str

class CarbonCreditSuggestion(BaseModel):
    name: str
    group: str
    tags: list[str]

class CarbonCreditCertificate(BaseModel):
    certificate_id: str
    issued_by: str
    issued_on: datetime
    project_title: str
    project_description: str
    verified_by: str
    verified_on: datetime
    price: int
    carbon_reduction_amount: int
    certification_standard: str    
    vintage: int
    transaction_history: TransactionHistory
    retirement_status: bool
    social_benefits: str