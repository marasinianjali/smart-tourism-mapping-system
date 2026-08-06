# Smart Tourism Mapping System (STMS)

A full-stack tourism management and exploration platform built with **Django REST Framework**, **React**, and **PostGIS**. 
The system helps tourists discover attractions, explore nearby destinations, generate travel itineraries, and navigate using interactive maps.

## Features

### Public Features

* Browse tourist destinations
* Search tourist places
* Filter by category and province
* Interactive map using Leaflet
* Nearby places based on current location
* Navigation with routing
* Trip planner with multi-day itinerary generation
* View destination details
* Reviews and ratings

### Administration

* Role-based authentication
* Tourist place management
* Category management
* District management
* Image management
* Review moderation
* Approval workflow for tourist places

## Technology Stack

### Backend

* Python
* Django
* Django REST Framework
* PostgreSQL
* PostGIS
* Simple JWT Authentication

### Frontend

* React
* React Router
* Tailwind CSS
* Axios
* React Leaflet
* Leaflet Routing Machine

## Project Structure

```text
backend/
├── apps/
│   ├── accounts/
│   ├── common/
│   └── tourism/
├── config/
└── requirements.txt

frontend/
├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   └── services/
```

## Current Features (Version 1)

* User Authentication
* Role-Based Access Control
* Tourist Place CRUD
* Categories and Districts
* Tourist Place Images
* Reviews
* Interactive Maps
* Nearby Places (PostGIS)
* Navigation and Routing
* Trip Planner (Version 1)

## Planned Features (Version 2)

* Smart itinerary optimization
* Distance-aware trip clustering
* Personalized recommendations
* Favorite places
* AI-assisted travel suggestions
* Travel history
* Analytics dashboard

## Getting Started

### Backend

```bash
cd backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

## Screenshots

Screenshots will be added as development progresses.

## Status

🚧 Currently under active development.

Completed major modules:

* Authentication
* Tourist Place Management
* Reviews
* Maps
* Nearby Search
* Navigation
* Trip Planner (Version 1)

Next milestone:

* Smart Trip Planner (Version 2)

## Author

**Anjali Marasini**

Bachelor in Computer Application (BCA)

Backend Developer | Django | React | GIS
