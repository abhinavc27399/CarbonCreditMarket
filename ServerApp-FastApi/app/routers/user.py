from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from schemas.users import User

router = APIRouter(
      prefix="/v1/user"
)

@router.post("/signup", tags=["user_sign_up"])
async def user_sign_up(user: User, db: Session = Depends(get_db)) -> bool:
               

    return False
