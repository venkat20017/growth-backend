# Sanity Setup Guide

## 1. Install CLI
If you haven't already:
```bash
npm install -g @sanity/cli
```

## 2. Initialize Project
Run this command in the root of your project (or outside if you prefer to keep the studio separate, but inside is fine):
```bash
sanity init
```
- **Project Name:** `venkat-blog` (or your choice)
- **Dataset:** `production`
- **Template:** Clean project / scratch
- **Output path:** `studio` (Recommended to keep it in a subfolder named `studio`)

## 3. Configure Schemas
1.  Go to the new `studio` folder.
2.  Copy the files from `sanity-schemas/` (in the root) to `studio/schemas/`.
    -   Copy `sanity-schemas/post.js` -> `studio/schemas/post.js`
    -   Copy `sanity-schemas/index.js` -> `studio/schemas/index.js` (Overwrite if exists)

## 4. Deploy
Inside the `studio` folder:
```bash
cd studio
sanity deploy
```
This will give you your Studio URL (e.g., `https://venkat-blog.sanity.studio`).

## 5. Connect to Frontend
1.  Get your **Project ID** from the `sanity.json` or `sanity.cli.ts` file (or the dashboard).
2.  Open your `.env` (or create one) in the **root** of your React project.
3.  Add:
    ```
    VITE_SANITY_PROJECT_ID=your_project_id_here
    ```

## 6. CORS
Make sure to add `http://localhost:5173` (and your production domain) to the **API > CORS Origins** settings in your Sanity Management Dashboard (https://www.sanity.io/manage).
