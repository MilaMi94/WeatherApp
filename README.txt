# 🌦️ Weather App - Django + React

A full-stack web application that shows weather data and includes user registration, login, and protected views.

---

## 🧰 Tech Stack

- **Backend**: Django REST Framework
  - Handles API logic and user authentication
  - Connected to a PostgreSQL database
- **Frontend**: React (Vite)
  - Handles UI and routes
  - Communicates with the Django API
- **Database**: PostgreSQL
  - Stores users and weather-related data

---

## 🛡️ Authentication

- Implemented using Django's built-in authentication system (`auth`)
- Token-based authentication using Django REST Framework (DRF)
- Login/Register functionality available from the frontend

---

## 🏗️ Project Structure

WeatherApp/
├── backend/
| │── weatherProject/ # Django project
│ │  ├── weatherProject/ # Django project
│ │  |  ├── settings.py
│ │  |  ├── urls.py
│ │  |  ├── wsgy.py
│ │  |  └── ...
│ │  ├── auth_app/ # Handles user auth (login, register)
│ │  ├── weather_api_backend/ # Handles weather API logic
│ │  ├── manage.py
│ │  └── requirements.txt
│ │
│ ├── .env
│ └── requirements.txt
│
│
├── frontend/ # React app (Vite)
│ ├── src/
│ ├── public/
│ ├── .env
│ └── ...
├── docker-compose.yaml
└── README.md




Setting up Postgress

Create a database: mydb

Create a user: myuser

Grant privileges and make sure it accepts TCP connections

Update settings.py with your DB credentials

Run migrations:
python manage.py migrate
python manage.py runserver

💻 Frontend Setup (React)

Navigate to the frontend folder:
cd frontend
npm install

Start frontend:
npm run dev

Environment Variables
Backend: Set PostgreSQL credentials in settings.py

Frontend: If needed, create .env and add your API base URL:
VITE_API_URL=http://localhost:8000/api/

Created by Mila Bogdanovic 