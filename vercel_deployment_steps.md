# EXACT DEPLOYMENT STEPS FOR PREORBIT FRONTEND (VERCEL)

Follow these EXACT steps to deploy your Angular frontend on Vercel and fix the 404 error.

## OPTION 1: Deploying via Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** -> **Project**.
3. Select your `PREORBIT` repository from GitHub/GitLab and click **Import**.
4. You will see the **Configure Project** screen. Fill it out EXACTLY like this:

   - **Project Name**: `preorbit`
   - **Framework Preset**: `Angular`
   - **Root Directory**: `frontend` *(Click "Edit", select the "frontend" folder, and save)*

5. Click to expand the **Build and Output Settings** section. Fill it out EXACTLY like this:

   - **Build Command**: `npm run build` *(Toggle the override switch ON if needed)*
   - **Output Directory**: `dist/frontend/browser` *(Toggle the override switch ON and paste this EXACTLY)*
   - **Install Command**: `npm install` *(Toggle the override switch ON if needed)*

6. Click the **Deploy** button.
7. Wait for the build to finish. Your app will now load correctly without a 404 error.

---

## OPTION 2: Deploying via Vercel CLI (Command Line)

If you prefer to deploy using the command line directly from your VS Code terminal, follow these EXACT steps:

1. Open your terminal in the root folder (`d:\Sigma Batch\Web Development\PREORBIT`).
2. Install the Vercel CLI globally (if you haven't already):
   ```bash
   npm i -g vercel
   ```
3. Run the deploy command:
   ```bash
   vercel
   ```
4. Answer the prompts EXACTLY as follows:

   - `Set up and deploy “d:\Sigma Batch\Web Development\PREORBIT”? [Y/n]` -> **Y**
   - `Which scope do you want to deploy to?` -> *(Select your account)*
   - `Link to existing project? [y/N]` -> **N**
   - `What’s your project’s name?` -> **preorbit**
   - `In which directory is your code located?` -> **./frontend**
   - `Want to modify these settings? [y/N]` -> **y**
   - `Build Command:` -> **npm run build**
   - `Output Directory:` -> **dist/frontend/browser**
   - `Install Command:` -> **npm install**

5. Vercel will build and deploy your project. It will give you a "Production" link when finished.

## Verification

After deployment, your application will correctly route all pages (like `/dashboard`) without throwing a 404 because:
1. We set the correct Output Directory (`dist/frontend/browser`).
2. The `vercel.json` file inside your `frontend` folder handles the Angular SPA routing fallback.
3. Your `environment.prod.ts` is correctly pointing to your Render backend `https://preorbit.onrender.com/api`.
