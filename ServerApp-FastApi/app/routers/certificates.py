from fastapi import APIRouter, Depends
from requests import Session
from sqlalchemy import text
from database import get_db
from schemas.carboncreditcertificate import  CarbonCreditSearchRequest, CarbonCreditSuggestion, CarbonCreditCertificate


router = APIRouter(
      prefix="/v1/certificates",
      tags=["certificates"]
)

@router.post("/suggestions/fetch")
async def search_certificates(request: CarbonCreditSearchRequest,  db: Session = Depends(get_db)) -> list[CarbonCreditSuggestion]:
    # Actual Search------------------------------------------------------------------------------------------------------------------------
    # stmt = text("""
    #     SELECT * FROM certificate
    #     WHERE search_vector @@ plainto_tsquery(:search_query)
    # """)
    # result = db.execute(stmt, {"search_query": request.search_text}).fetchall()


    # Simulated Suggestion Repsonse return, remove when database is running and has required tables with vector search is implemented-----------
    response : list[CarbonCreditSuggestion] = []
    response.append(CarbonCreditSuggestion(name="New Green Tech Solution", group="issuer", tags=["issuer, new, company"]))
    return response


@router.post("/fetch")
async def search_certificates(request: CarbonCreditSearchRequest) -> list[CarbonCreditCertificate]:

    # Simulated Certificate repsonse return, remove when database is running and has required tables with vector search is implemented-----------    
    response : list[CarbonCreditCertificate] = []
    response.append(CarbonCreditCertificate(certificate_id="94hr82h8f2n22end", project_title="New Green Tech Solution", project_description="forestation for carbon sequestration"))

    return response
