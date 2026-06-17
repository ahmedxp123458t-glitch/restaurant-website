# La Maison - Restaurant Website

A full-stack restaurant website built with the **MERN stack** (MongoDB, Express, React, Node.js). Features a dynamic menu with category filtering and an online reservation system.

---

## Project Architecture & Flow

```
┌─────────────────────────────────────────────────────────┐
│                      Client (React)                      │
│  ┌──────────┐  ┌──────┐  ┌────────────┐  ┌──────────┐  │
│  │  Navbar   │  │ Hero │  │    Menu    │  │Reservation│  │
│  │ (fixed)   │  │(hero)│  │(filterable)│  │  (form)   │  │
│  └──────────┘  └──────┘  └────────────┘  └──────────┘  │
│                        ┌────────┐                        │
│                        │ Footer │                        │
│                        └────────┘                        │
│                          │  fetch                         │
│                          ▼                                │
│              ┌─────────────────────┐                      │
│              │   proxy :5000/api   │                      │
│              └─────────────────────┘                      │
└──────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────┐
│                   Server (Express)                        │
│  ┌─────────────┐   ┌──────────────────────┐              │
│  │ /api/menu   │──▶│ MenuItem.find(filter) │              │
│  │   GET       │   └──────────────────────┘              │
│  ├─────────────┤   ┌──────────────────────────┐          │
│  │/api/reserv. │──▶│ Reservation.create(body)  │          │
│  │   POST      │   └──────────────────────────┘          │
│  └─────────────┘                                         │
└──────────────────────────────────────────────────────────┘
                           │
                           ▼
              ┌──────────────────────┐
              │     MongoDB Atlas    │
              │  ┌────────────────┐  │
              │  │  restaurant    │  │
              │  │  ├─ menuitems  │  │
              │  │  └─reservations│  │
              │  └────────────────┘  │
              └──────────────────────┘
```

### Data Flow

1. **Menu Display** -- On page load, React fetches `GET /api/menu` → Express queries MongoDB → returns JSON → rendered as cards in a grid. Users filter by category (appetizers, mains, desserts, beverages) via client-side filtering.

2. **Reservation Booking** -- User fills form → React sends `POST /api/reservations` → Express validates & saves to MongoDB → returns success response → success message shown.

---

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 18, CSS3 (responsive design) |
| Backend  | Node.js, Express 4                  |
| Database | MongoDB + Mongoose ODM              |
| Tooling  | concurrently (dev script)          |

---

## Prerequisites

- [Node.js](https://nodejs.org/) v16+
- [MongoDB](https://www.mongodb.com/try/download/community) running locally on port 27017 (or set `MONGO_URI` env variable)
- npm

---

## How to Run

### 1. Clone / Navigate to project

```bash
cd restaurant-website
```

### 2. Install all dependencies

```bash
npm run install-all
```

This installs dependencies for root, server, and client.

### 3. Seed the menu database

Ensure MongoDB is running, then:

```bash
npm run seed
```

This populates the database with 13 sample menu items across 4 categories.

### 4. Start the app

Run both server and client together:

```bash
npm run dev
```

Or run them separately in two terminals:

```bash
# Terminal 1 - Backend
npm run server      # Runs on http://localhost:5000

# Terminal 2 - Frontend
npm run client      # Runs on http://localhost:3000
```

### 5. Open in browser

Visit **http://localhost:3000**

---

## API Endpoints

| Method | Endpoint              | Description                    |
|--------|-----------------------|--------------------------------|
| GET    | `/api/menu`           | Get all menu items             |
| GET    | `/api/menu?category=mains` | Filter by category        |
| GET    | `/api/reservations`   | Get all reservations           |
| POST   | `/api/reservations`   | Create a new reservation       |
| GET    | `/api/orders`         | Get all orders                 |
| POST   | `/api/orders`         | Place a new order (COD)        |
| GET    | `/`                   | Health check                   |

### POST /api/reservations Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "123-456-7890",
  "date": "2025-12-25",
  "time": "19:00",
  "guests": 4,
  "notes": "Anniversary dinner"
}
```

---

## Usage Manual

### Home Page
- Full-screen hero section with restaurant name and tagline
- Click **"Reserve a Table"** to jump to the reservation form

### Menu Section
- Displays all menu items with real food images from Unsplash
- Use category buttons (`All`, `Appetizers`, `Mains`, `Desserts`, `Beverages`) to filter items
- Each card shows the item image, name, description, and price
- **3D tilt effect** on mouse hover (perspective transform)
- **Shimmer loading animation** while images load
- Hover over cards for image zoom + overlay effect
- Click **"Order Now"** to open the order popup

### Reservation Form
- Fill in: Full Name, Email, Phone, Number of Guests, Date, Time
- Optional: Special requests or dietary notes
- Submit to save the reservation to MongoDB
- A green success banner appears on confirmation

### Order Now (Popup Modal)
- Click **"Order Now"** on any menu item card
- A popup modal appears with an order form
- Fill in: Full Name, Phone Number, Delivery Address, Quantity
- Payment method is **Cash on Delivery (COD)** (pre-selected)
- Shows total amount based on item price and quantity
- On submit, order is saved to the database
- Success animation with order summary is displayed

### Footer
- About section with restaurant description
- Operating hours
- Contact information (address, phone, email)

### Responsive Design
- Works on desktop, tablet, and mobile
- Navigation collapses smoothly
- Menu grid switches to single column on small screens
- Reservation form fields stack vertically on mobile

---

## Project Structure

```
restaurant-website/
├── package.json                          # Root scripts
├── README.md
├── server/
│   ├── package.json
│   ├── server.js                         # Express app entry point
│   ├── seed.js                           # Database seeder
│   ├── config/
│   │   └── db.js                         # MongoDB connection
│   ├── models/
│   │   ├── MenuItem.js                   # Menu schema
│   │   ├── Order.js                      # Order schema (COD)
│   │   └── Reservation.js                # Reservation schema
│   └── routes/
│       ├── menu.js                       # Menu API routes
│       ├── order.js                      # Order API routes
│       └── reservation.js                # Reservation API routes
└── client/
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── index.js
        ├── App.js                        # Main app component
        ├── App.css                       # All styles
        └── components/
            ├── Navbar.js
            ├── Hero.js
            ├── Menu.js
            ├── OrderModal.js             # Order popup with COD form
            ├── Reservation.js
            └── Footer.js
```

---

## Customization

- **Change restaurant name** -- Edit `client/src/components/Navbar.js` (logo), `Hero.js` (heading), and `Footer.js`
- **Update menu items** -- Modify `server/seed.js` and re-run `npm run seed`
- **Change colors** -- Edit CSS variables in `client/src/App.css`
- **Use a different MongoDB** -- Set `MONGO_URI` environment variable (e.g., MongoDB Atlas)
- **Change contact details** -- Edit `client/src/components/Footer.js`

---

## License

MIT
