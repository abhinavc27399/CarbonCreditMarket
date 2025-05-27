from pydantic import BaseModel
from datetime import datetime


class TransactionHistory(BaseModel):
    sold_by : str
    bought_by : str
    date_time : datetime