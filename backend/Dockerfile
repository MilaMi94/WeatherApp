# Use official Python image
FROM python:3.12-slim

# Set environment vars
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt gunicorn

# Copy project files
COPY . .

# Run the app with gunicorn
WORKDIR /app/weatherProject
CMD ["gunicorn", "weatherProject.wsgi:application", "--bind", "0.0.0.0:8000"]
