# CarRental

CarRental is a full-stack web application for seamless car rental management. It enables users to browse, book, and manage cars, while owners can add vehicles, track bookings, and monitor revenue through a dedicated dashboard.

## Features

- **User Experience**
  - Browse available cars by location and date
  - Secure booking
  - View and manage personal bookings
  - modern UI

- **Owner Dashboard**
  - Add, edit, and delete car listings
  - View real-time stats: total cars, bookings, monthly revenue
  - Manage booking requests and statuses
  - Track recent bookings

- **Technical Highlights**
  - **Frontend:** React 19, Vite, React Router v7, Axios
  - **Backend:** Node.js, Express 5, MongoDB (Mongoose 8)
  - **Authentication:** JWT-based secure login
  - **Image Uploads:** Multer & Cloudinary integration
  - **Deployment:** Vercel (client & server)
  - **RESTful APIs:** For all core operations

## Project Structure

```
carRental/
│
├── client/                # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # Auth context & protected routes
│   │   ├── pages/         # App pages (Home, Bookings, Owner Dashboard, etc.)
│   │   ├── assets/        # Images & icons
│   │   └── main.jsx       # App entry point
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # API routes
│   │   ├── middlewares/   # Auth & upload middlewares
│   │   ├── utils/         # Utility functions (e.g., Cloudinary)
│   │   ├── app.js         # Express app setup
│   │   └── index.js       # Server entry point
│   ├── package.json
│   └── vercel.json
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB database (local or Atlas)
- Cloudinary account (for image uploads)
- Vercel account (for deployment)

### Setup

#### 1. Clone the repository

```bash
git clone https://github.com/itsanuragpatel1/car-rental.git
cd car-rental
```

#### 2. Configure environment variables

Create `.env` files in both `client` and `server` folders.  
Sample for `server/.env`:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### 3. Install dependencies

```bash
cd server
npm install

cd client
npm install
```

#### 4. Run the development servers

**Backend:**

```bash
npm run dev
```

**Frontend:**

```bash
npm run dev
```

The frontend will run on [http://localhost:5173](http://localhost:5173)  
The backend will run on [http://localhost:3000](http://localhost:3000) (or your configured port)

## API Endpoints

- `/api/user` – User registration, login, profile, car browsing
- `/api/owner` – Owner dashboard, car management
- `/api/booking` – Booking creation, management

## Deployment

Both client and server are configured for deployment on Vercel.  
See `vercel.json` in each folder for build and routing settings.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Acknowledgements

- [React](https://react.dev/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/)
- [Vercel](https://vercel.com/)

---

**For questions or demo requests, feel free to reach out!**
