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
├── backend/                          # NestJS Backend
│   ├── src/
│   │   ├── app/                      # Core application setup
│   │   │   ├── app.controller.ts     # Root route controller (e.g., health check)
│   │   │   ├── app.module.ts         # Root module imports
│   │   │   └── app.service.ts        # Shared services
│   │   │
│   │   ├── jobs/                     # Jobs feature module
│   │   │   ├── dto/
│   │   │   │   └── job.entity.ts     # Database entity definition
│   │   │   ├── jobs.controller.ts    # REST endpoints (/jobs)
│   │   │   ├── jobs.module.ts        # Feature module registration
│   │   │   └── jobs.service.ts       # Business logic
│   │   │
│   │   └── main.ts                   # App entry point
│   │
│   ├── test/                         # Jest/unit tests
│   ├── .env                          # Database/API secrets
│   ├── nest-cli.json                 # NestJS generator config
│   └── tsconfig.json                 # TypeScript settings
│
└── frontend/                        # Next.js Frontend
    ├── app/                          
    │   ├── Components/               # Reusable UI components
    │   │   └── JobListPage.tsx       # Job listing component
    │   │
    │   ├── services/                 # API clients
    │   │   └── jobService.ts         # Axios/API calls to backend
    │   │
    │   ├── globals.css               # Tailwind/global styles
    │   ├── layout.tsx                # Root layout (metadata, providers)
    │   └── page.tsx                  # Homepage (/) 
    │
    ├── public/                       # Static assets
    │   └── favicon.ico
    │
    ├── .env.local                    # Frontend env vars (API_URL)
    ├── next.config.js                # Next.js plugins/config
    └── tailwind.config.js            # Tailwind customization
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
