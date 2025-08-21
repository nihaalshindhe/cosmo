# Cosma Beauty – Mini Assignment

A demo of Cosma Beauty’s core flow:
- User searches a concern
- Sees mapped treatments and provider packages
- Submits an enquiry (stored backedurl + admin//admin/enquiries)

---

## Tech Stack
- Node.js + Express
- MongoDB Atlas (Mongoose)
- React + Tailwind (CDN)
- express-validator for input validation

---

## Setup
### ENV
MONGO_URI=your_mongo_atlas_uri
PORT=4000

### Backend
```bash
cd backend
npm install
node seed.js
npm start
```
### FrontEnd
```bash
cd frontend
npm install
npm start
```