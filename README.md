
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/ca8b6a06-b469-4b63-a2ff-aa7b45e363bb

## How to install this project on another computer

### Prerequisites

Before you begin, make sure you have the following installed on your computer:

1. **Node.js** (version 18 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Or install using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) (recommended)
   
2. **npm** (comes with Node.js) or **yarn** package manager

3. **Git** for cloning the repository
   - Download from [git-scm.com](https://git-scm.com/)

### Installation Steps

Follow these steps to set up the project on your computer:

```sh
# Step 1: Clone the repository using the project's Git URL
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install all project dependencies
npm install
# or if you prefer yarn:
# yarn install

# Step 4: Start the development server
npm run dev
# or with yarn:
# yarn dev

# Step 5: Open your browser and go to:
# http://localhost:8080
```

### Troubleshooting Installation

If you encounter issues during installation:

1. **Node.js version issues**: Make sure you're using Node.js version 18 or higher
   ```sh
   node --version
   ```

2. **Permission errors**: On macOS/Linux, you might need to use `sudo` or fix npm permissions
   ```sh
   sudo npm install
   ```

3. **Port already in use**: If port 8080 is busy, the dev server will automatically use another port

4. **Clear cache**: If dependencies seem corrupted, try:
   ```sh
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/ca8b6a06-b469-4b63-a2ff-aa7b45e363bb) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - Frontend framework
- **shadcn-ui** - Modern UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Tanstack Query** - Data fetching and caching
- **Lucide React** - Beautiful icons

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/ca8b6a06-b469-4b63-a2ff-aa7b45e363bb) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
