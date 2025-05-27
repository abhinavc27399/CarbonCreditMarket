from pydantic import BaseModel

class Issuer(BaseModel):
    id : int
    name : str
    description : str