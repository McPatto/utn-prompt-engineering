# Mattress Management System

## Description
Web system for mattress inventory management, with functionalities to manage products, view statistics, and handle stock.

## Project Structure

├── frontend/ # React Application
│ ├── src/
│ │ ├── components/ # Reusable components
│ │ ├── pages/ # Main pages
│ │ └── services/ # API services
│ └── package.json
│
└── backend/ # Node.js/Express Server
├── controllers/ # Application controllers
└── routes/ # API routes

## Prerequisites
- Node.js (v20.11.1 or higher)
- MongoDB
- npm or yarn

## Installation

### Backend
1. Navigate to the backend directory:
```bash
cd backend
```
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the backend directory with the following variables:
```bash
MONGODB_URI=your_mongodb_connection_string
PORT=3001
```
4. Start the server:
```bash
npm run dev
```

### Frontend
1. Navigate to the frontend directory:
```bash
cd frontend
```
2. Install dependencies:
```bash
npm install
```
3. Start the frontend:
```bash
npm run dev
```

The application will open at `http://localhost:3000`

## Main Dependencies

### Backend
- Express.js - Web framework
- Mongoose - MongoDB ODM
- Cors - CORS middleware
- Dotenv - Environment variables handler

### Frontend
- React - UI library
- React Router - Routing
- Axios - HTTP client
- Material-UI - UI components

## Main Features
- Mattress inventory management
- Statistics dashboard
- Complete product CRUD
- Responsive interface
- Authentication system

## API Endpoints

### Products
- GET `/api/mattresses` - Get all mattresses
- POST `/api/mattresses` - Create new mattress
- PUT `/api/mattresses/:id` - Update mattress
- DELETE `/api/mattresses/:id` - Delete mattress

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
