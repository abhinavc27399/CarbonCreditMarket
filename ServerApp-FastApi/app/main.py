from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Annotated
from database import engine, get_db
from models import user, issuers, verifiers, certificateissuance, certificateverification, carboncreditcertificate, transactions
from routers import users

# The server side app instance for carbon credit market web application
app = FastAPI()

# Create required tables if they don't exist
models = [user.Users, issuers.Issuers, verifiers.Verifiers, 
          certificateissuance.CertificateIssuance, certificateverification.CertificateVerification,
          carboncreditcertificate.CarbonCreditCertificates, transactions.Transactions]

for model in models:
    model.metadata.create_all(bind=engine)


# Include all routers 
routers = [users.router]

for router in routers:
    app.include_router(router)