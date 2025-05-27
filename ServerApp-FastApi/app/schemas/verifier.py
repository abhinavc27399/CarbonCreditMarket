from pydantic import BaseModel

class Verifier(BaseModel):
    id : int
    name : str
    description : str