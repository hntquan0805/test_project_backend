# Backend Project

> A backend service built with Node.js + Express.

---

## Technology Requirements

| Technology | Recommended Version |
|-----------|----------------------|
| [Node.js](https://nodejs.org/) | >= 18.x |
| [npm](https://www.npmjs.com/) | >= 9.x |
| [Express](https://expressjs.com/) | ^4.x |
| [Sequelize](https://sequelize.org/) | ^6.x |

---

## Installation & Setup

### 1. Clone repository

```bash
git clone https://github.com/hntquan0805/test_project_backend.git
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file at the root based on the `.env.example` template:

```bash
cp .env.example .env
```

Update the values in `.env` as needed (database credentials, port, etc.).

### 4. Run database migrations

```bash
npx sequelize-cli db:migrate
```

### 5. Run seeders

```bash
npx sequelize-cli db:seed:all
```

### 6. Run development server

```bash
npm run dev
```

The server will be running at: [http://localhost:3000](http://localhost:3000)

### 7. Build for production

```bash
npm start
```

---

## Project Structure

```
src/
├── config/        # Configuration files (database, environment)
├── controllers/   # Request handlers
├── data/          # Static data or data files
├── migrations/    # Database migration files
├── models/        # Database models
├── repositories/  # Data access layer
├── routes/        # API route definitions
├── seeders/       # Database seeders
├── services/      # Business logic
└── app.js         # Entry point
```

---

## Contributors

| Name | Contact |
|------|---------|
| Ho Ngoc Trung Quan | hntquan0805@gmail.com |

---

> Last updated: March 2026