# DriveSuite — Setup Guide (Windows 10)

## STEP 1 — Install Node.js
1. Go to: https://nodejs.org
2. Click "LTS" (the green button)
3. Download and run the installer
4. Click Next → Next → Install (keep all defaults)
5. When done, restart your computer

## STEP 2 — Verify Node is installed
Open Command Prompt (press Windows key, type "cmd", press Enter)
Type this and press Enter:
  node --version
You should see something like: v20.11.0
Then type:
  npm --version
You should see something like: 10.2.4

## STEP 3 — Set up Supabase (free)
1. Go to: https://supabase.com
2. Click "Start your project" → sign up with GitHub or email
3. Click "New project"
4. Give it a name: drivesuite
5. Set a database password (save it somewhere!)
6. Choose region: Europe (West) — closest to UK
7. Click "Create new project" — wait 2 minutes

8. When ready, click "SQL Editor" in the left menu
9. Click "New query"
10. Open the file: supabase-setup.sql (from this folder)
11. Copy all the text and paste it into Supabase SQL editor
12. Click "Run"
13. You should see "Success" — your database is ready

14. Now click "Project Settings" → "API" in the left menu
15. Copy these two values (you'll need them in Step 5):
    - Project URL (looks like: https://xxxx.supabase.co)
    - anon/public key (long string starting with eyJ...)

## STEP 4 — Put the project files on your computer
1. Create a folder on your Desktop called: drivesuite
2. Copy ALL the files from this project into that folder
   (keep the folder structure exactly as it is)

## STEP 5 — Add your Supabase keys
1. Open the file: .env.local (in your drivesuite folder)
2. Replace the placeholder text:
   NEXT_PUBLIC_SUPABASE_URL=paste_your_project_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_anon_key_here
3. Save the file

## STEP 6 — Install and run
Open Command Prompt and type these commands ONE BY ONE:

  cd Desktop\drivesuite

Then:
  npm install

Wait for it to finish (might take 2-3 minutes), then:
  npm run dev

You should see:
  ▲ Next.js 14.x.x
  - Local: http://localhost:3000

## STEP 7 — Open in browser
Go to: http://localhost:3000
You should see the DriveSuite login page!

Click "Sign up" to create your first account, then log in.

## STEP 8 — Add your tool URLs
Open: app/dashboard/page.js
Find this section near the top:
  url: 'YOUR_PUPIL_PROGRESS_URL',
  url: 'YOUR_REVIEW_MULTIPLIER_URL',
  etc.

Replace each one with the actual URL of your deployed tools.

## STEP 9 — Deploy to Vercel (go live)
1. Go to: https://vercel.com → sign up free
2. Click "Add New Project"
3. Upload your project folder OR connect GitHub
4. Add your environment variables:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
5. Click Deploy
6. Vercel gives you a free URL like: drivesuite.vercel.app

## COMMON ERRORS

Error: "npm is not recognized"
→ Node.js is not installed properly. Redo Step 1 and restart your computer.

Error: "Cannot find module"
→ Run npm install again

Error: "Invalid API key" on login
→ Check your .env.local file — make sure there are no spaces around the = sign

Page shows blank white screen
→ Open browser console (F12 → Console) and send me the error message

## QUESTIONS?
Message on WhatsApp with any error messages you see.
