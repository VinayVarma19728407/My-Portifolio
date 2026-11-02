# Ganapathiraju Vinay Kumar Varma — Developer Portfolio

A static, accessible developer portfolio showcasing software engineering, machine learning research, and industrial data engineering projects.

Built with **React 19**, **TypeScript**, **Vite**, and **Modern CSS**. Optimized for static edge deployment on **Vercel**.

---

## 🚀 Features

- **Anti-AI Design Aesthetic**: Editorial layout with deep slate/zinc background, sharp borders, warm accents, and high-contrast typography (no cliché glassmorphism or neon purple gradients).
- **Embedded Photo**: Your personal headshot is embedded in `public/assets/avatar.jpg` and served statically.
- **Projects Showcase (Data-Driven)**:
  - **SchemeSetu**: Centralized welfare & dynamic eligibility platform (React, Node.js, Express, JWT, REST APIs).
  - **Adaptive RL CPU Scheduler**: Alibaba cluster trace workload prediction (CatBoost, R² = 0.8899) and PPO reinforcement learning scheduler.
  - **Smart Health Recommendation System**: Clinical triage advisory engine with Groq API and LLaMA 3 explainability.
  - **Portfolio Site**: Static, accessible, sub-second LCP portfolio.
- **Experience Timeline**:
  - **RINL Vizag Steel Plant**: Data Analyst Intern (Oracle SQL, SQL*Loader, 80.5k rows, industrial SCADA & PLC exposure).
  - **Vellore Institute of Technology (VIT Chennai)**: B.Tech in CSE (AIML), GPA 8.88 / 10.00.
- **Certifications**:
  - **IBM Generative AI (CEGENAI1IN)** with direct credential verification link.
  - **RINL Industrial Internship Certificate** (IT & ERP Department).
  - **Prolearn / Adroit Technologies IBM Advanced Generative AI**.
- **Full Accessibility**: Keyboard navigable, semantic HTML5, WCAG 2.1 AA focus rings, skip-to-content anchor, and ARIA labels.

---

## 🛠️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production (outputs to dist/)
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 🌐 Deploy to Vercel

### Option 1: Automatic Deploy via GitHub (Recommended)
1. Initialize git and push to your repository:
   ```bash
   git init
   git add .
   git commit -m "feat: complete portfolio implementation"
   git branch -M main
   git remote add origin https://github.com/VinayVarma/My-Portfolio.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your `My-Portfolio` repository.
4. Framework preset will automatically detect **Vite** (`Build command: npm run build`, `Output: dist`).
5. Click **Deploy**.

### Option 2: Deploy directly via Vercel CLI
```bash
npx vercel
```
