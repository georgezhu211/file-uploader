# File Uploader

A full-stack file management application built with Express, Prisma, and Cloudinary. Users can sign up, organize files into folders, upload files to cloud storage, and share folders via time-limited public links.

## Features

- **Authentication** — Sign up and log in with username/password (Passport.js local strategy)
- **Folders** — Create, rename, and delete folders to organize your files
- **File Uploads** — Upload files to Cloudinary cloud storage with automatic metadata tracking
- **File Details** — View file info (size, type, upload date) and download files
- **Folder Sharing** — Generate expiring share links so anyone can view a folder's contents without logging in
- **Retro UI** — Custom CSS theme with a retro aesthetic

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** PostgreSQL
- **ORM:** Prisma
- **View Engine:** EJS with express-ejs-layouts
- **File Storage:** Cloudinary
- **Auth:** Passport.js (local strategy) + express-session
- **Session Store:** Prisma Session Store
- **Validation:** express-validator
- **File Handling:** Multer

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database
- Cloudinary account

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd file-uploader
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file from the sample:

   ```bash
   cp .env.sample .env
   ```

4. Fill in your environment variables in `.env`:

   ```
   DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<database>"
   SESSION_SECRET="replace-with-a-random-secret"
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

5. Run database migrations:

   ```bash
   npx prisma migrate deploy
   ```

6. Generate the Prisma client:

   ```bash
   npx prisma generate
   ```

7. Start the development server:

   ```bash
   npm run dev
   ```

   The app will be running at `http://localhost:3000`.

## Project Structure

```
src/
├── app.js                 # Express app setup and middleware
├── config/                # Passport, Cloudinary, and Multer config
├── controllers/           # Route handlers
├── db/                    # Prisma client instance
├── errors/                # Custom error classes
├── middleware/            # Auth, validation, file upload, and resource middleware
├── repositories/          # Database access layer
├── routes/                # Express route definitions
├── utils/                 # Helper functions
└── views/                 # EJS templates
prisma/
└── schema.prisma          # Database schema
public/
└── css/                   # Static assets
```
