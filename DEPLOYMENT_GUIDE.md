# PUBLIC DEPLOYMENT GUIDE — THE CRICKET ARCHIVE

This document provides step-by-step instructions for deploying **THE CRICKET ARCHIVE** to public hosting via **Vercel** and **GitHub**.

---

## Recommended Deployment Path: Vercel + GitHub (Free Tier Compatible)

Next.js is maintained by Vercel, making Vercel the optimal hosting platform with native support for Turbopack, App Router server rendering, and zero-configuration edge routes.

### Method A: One-Click GitHub & Vercel Web Deployment (Recommended)

1. **Push Repository to GitHub**:
   In your terminal, run:
   ```bash
   git remote add origin https://github.com/<your-username>/cricketarchive.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com) and log in.
   - Click **"Add New Project"** -> **"Import Git Repository"**.
   - Select your `cricketarchive` repository.

3. **Configure Project Settings**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `next build` (or leave default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Environment Variables**:
   Under **Settings -> Environment Variables**, add:
   - `NODE_ENV` = `production`
   - `CRICKET_AI_API_KEY` = *(Optional: your AI API key for extended queries)*

5. **Deploy**:
   - Click **"Deploy"**.
   - In 60 seconds, Vercel will output your live public production URL (e.g. `https://cricketarchive.vercel.app`).

---

### Method B: Deploying via Vercel CLI

If you have a Vercel token or active CLI session:
```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## Production Verification Checklist

Once deployed to your public URL, test the following:
- [ ] **Homepage (`/`)**: Loads hero banner and featured player cards.
- [ ] **Player Profile (`/players/ab-de-villiers`)**:
  - Test Match Archive pagination and filtering.
  - Test Format Statistics tabs (Test, ODI, T20I, IPL).
  - Verify world record milestone cards.
- [ ] **Ask The Archive (`/api/ask`)**: Ask *"What was AB's fastest century?"* and verify the response.
- [ ] **Mobile Navigation**: Open on a mobile device and verify the hamburger menu works.
