<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project. -->

# 🕌 Halal Impact School – Student Result Page

A responsive and dynamic result page built for Halal Impact School. This project fetches and displays students’ academic results using Supabase as the backend and Vite + React for the frontend.

## 🚀 Features

- 🔐 Environment variables securely managed using `.env`
- 📡 Real-time data fetching from Supabase
- 🧮 Dynamic subject support (nursery, primary, secondary)
- ✅ Clean and intuitive UI for parents and students
- 📱 Fully responsive across devices
- ⚡ Fast builds using Vite

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, Realtime)
- **Hosting (optional):** Netlify or Vercel

## 📁 Folder Structure

├── public/
├── src/
│ ├── components/
│ ├── pages/
│ ├── utils/
│ └── supabaseClient.js
├── .env
├── .gitignore
├── index.html
├── package.json
└── vite.config.js

## 🔐 Environment Variables

To keep sensitive info secure, create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_KEY=your-supabase-key

    These variables are accessed in code using import.meta.env.

🧪 How to Run Locally

    Clone the repo

git clone https://github.com/your-username/halal-impact-result-page.git
cd halal-impact-result-page

    Install dependencies

npm install

    Create .env file

cp .env.example .env
# Then edit and add your keys

    Start development server

npm run dev

📤 Deployment

You can deploy this app easily on platforms like Vercel or Netlify. Don’t forget to add your environment variables in the platform’s dashboard.
📘 License

This project is for internal use by Halal Impact School. Contact the school admin for deployment or production use.

    Designed & Developed by Arnold Midalla
```
