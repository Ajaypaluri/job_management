README.md
# Job Management Admin Interface

A full-stack web application designed to manage job postings and provide a smooth admin interface for creating, viewing, and filtering job listings.  
This project was developed as part of the **Full Stack SDE Intern** assignment and matches the provided Figma design with pixel-perfect implementation.

---

## 🚀 Live Links

- **Frontend:** [https://job-management-frontend-ten.vercel.app/](https://job-management-frontend-ten.vercel.app/)  
- **Backend API:** [https://job-management-backend-701e.onrender.com/](https://job-management-backend-701e.onrender.com/)  

---

## 📌 Features

- **Pixel-perfect UI** based on Figma design (spacing, colors, fonts preserved).
- **Responsive Design** that works across desktop and mobile screens.
- **Job Listing Page** with title, company, experience, type, and salary.
- **Filter Functionality** to filter jobs by:
  - Job title or role
  - Location
  - Job type
  - Salary range slider
- **Backend API** for retrieving job data.
- **Deployed on Vercel (frontend)** and **Render (backend)**.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: [Next.js](https://nextjs.org/) (React)
- **State Management**: React Context API
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **HTTP Client**: Axios
- **Deployment**: [Vercel](https://vercel.com)

### **Backend**
- **Framework**: [NestJS](https://nestjs.com/) (Node.js)
- **ORM**: [TypeORM](https://typeorm.io/)
- **Database**: PostgreSQL (Hosted on [Render](https://render.com))
- **Deployment**: [Render](https://render.com)


---

## 📂 Folder Structure

```text

job_management/
│
├── frontend/ # React frontend
│ ├── src/
│ │ ├── components/ # UI components
│ │ ├── pages/ # Pages (Job List, etc.)
│ │ └── App.jsx
│ └── package.json
│
├── backend/ # Express backend
│ ├── models/ # MongoDB models
│ ├── routes/ # API routes
│ ├── server.js # Entry point
│ └── package.json
```

---

## ⚙️ Installation & Local Setup

1. **Clone the repository**
```bash
git clone https://github.com/Ajaypaluri/job_management.git
cd job_management


Backend Setup

cd backend
npm install
npm start


Runs on: http://localhost:5000

Frontend Setup

cd frontend
npm install
npm run dev


Runs on: http://localhost:5173

```
📌 Future Improvements

Add company logo upload feature for job postings.

Authentication system for admin login.

Pagination for large job lists.

Search optimization and backend filtering.

👤 Author

Ajay Paluri

[GitHub](https://github.com/Ajaypaluri) | [LinkedIn](https://www.linkedin.com/in/ajay-paluri-7967a11b8/)
