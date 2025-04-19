# Listingz - Property Listing Website

Listingz is a full-stack web application for property listing and exchange. Users can buy, sell, and browse property listings, as well as read blog content about real estate.

## Features

- User registration and authentication
- Property listing and browsing
- Property filtering and search
- User dashboard for managing listings
- Admin dashboard for site management
- Blog section with articles about real estate
- Favorite properties system
- Responsive design for all devices

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Styled Components for styling
- Axios for API requests

### Backend
- Node.js
- Express.js
- MongoDB for database
- Mongoose for object modeling
- JWT for authentication

## Color Scheme

- Primary: #ed1c24 (Red)
- Secondary: #f1d302 (Yellow)
- Tertiary: #4c2719 (Brown)
- Background: #f7f9f9 (Light Gray)
- Dark: #080f0f (Almost Black)

## Project Structure

```
listingz-app/
├── client/               # Frontend React application
│   ├── public/           # Public assets
│   └── src/              # React source files
│       ├── components/   # Reusable components
│       ├── pages/        # Page components
│       ├── context/      # Context API files
│       └── assets/       # Assets (images, styles)
└── server/               # Backend Node.js application
    ├── config/           # Configuration files
    ├── controllers/      # Route controllers
    ├── middleware/       # Express middleware
    ├── models/           # Mongoose models
    ├── routes/           # Express routes
    └── uploads/          # Uploaded files
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd listingz-app
```

2. Install dependencies:
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Create a `.env` file in the server directory with the following variables:
```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/listingz
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
```

4. Start the development servers:
```bash
# Start backend server
cd server
npm run dev

# Start frontend server in a new terminal
cd client
npm start
```

## API Endpoints

### Auth Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/me` - Get current user
- `PUT /api/users/updatedetails` - Update user details
- `PUT /api/users/updatepassword` - Update password

### Property Routes
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get a single property
- `POST /api/properties` - Create a new property
- `PUT /api/properties/:id` - Update a property
- `DELETE /api/properties/:id` - Delete a property
- `GET /api/properties/featured` - Get featured properties

### Blog Routes
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get a single blog
- `POST /api/blogs` - Create a new blog
- `PUT /api/blogs/:id` - Update a blog
- `DELETE /api/blogs/:id` - Delete a blog
- `POST /api/blogs/:id/comments` - Add a comment to a blog

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contributors

- Your Name - Initial work 