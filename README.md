# Crabon Credit Market[Yet to be Named] - Web Application: Vite + React + FastAPI

A full-stack web application using:
- **Frontend**: Vite + React + TypeScript + MUI (Material UI)
- **Backend**: FastAPI + SQLAlchemy + PostgreSQL

---

## 🌐 Features
- Modern responsive UI built with Material UI components
- Fast and efficient frontend powered by Vite and React
- RESTful API built with FastAPI
- PostgreSQL for relational data management
- SQLAlchemy ORM for secure and scalable database access
- Along with Raw SQL operation for leveraging PostgreSQL in-built functions and datatypes

---

## 📁 Project Structure

``` text
root/
├── ClientApp-React/                 # Frontend (Vite + React + TS + MUI)
│   ├── public/
│   ├── src/
|   .
|   .
|   .
│   └── vite.config.ts
│
├── ServerApp-FastApi/               # Backend (FastAPI + SQLAlchemy) + PostgreSQL[DataBase]
│   ├── app/
│   ├── env/ 
│   └── requirements.txt
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20.18.3)
- Python (3.11.9)
- PostgreSQL (setup with appropriate user/db)nv 

### 1. Clone the Repository
```bash
git clone https://github.com/abhinavc27399/CarbonCreditMarket.git
cd your-repo
```

### 2. Setup the Backend (FastAPI)
```bash
cd ServerApp-FastApi
python -m venv env
source env/bin/activate  # or env\Scripts\activate on Windows
pip install -r requirements.txt

# Update .env or use a local settings file for DB credentials
# Create DB tables
uvicorn app.main:app --reload
```

### 3. Setup the Frontend (React)
```bash
cd ClientApp-React\app
npm install
npm run dev
```

---

## 🛠 Technologies Used

### Frontend:
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [MUI](https://mui.com/)

### Backend:
- [FastAPI](https://fastapi.tiangolo.com/)
- [SQLAlchemy](https://www.sqlalchemy.org/)
- [PostgreSQL](https://www.postgresql.org/)

---

## ⚙️ API Documentation
Once the backend server is running, access Swagger UI at:
```
http://localhost:8000/docs
```

---

## 🧪 Testing
Add unit and integration tests using `pytest` for backend and `vitest` or `jest` for frontend.

---

## 📦 Deployment
Choice of cloud stack at individual discretion

---

## 🙌 Contributing
1. Fork the project
2. Create your feature branch (`git checkout -b feat/feature-name`)
3. Commit your changes (`git commit -m 'feat: add feature'`)
4. Push to the branch (`git push origin feat/feature-name`)
5. Open a pull request

---

## 📄 License
This project is yet to be licensed 


