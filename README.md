<p align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Zustand-2E4A8E?style=for-the-badge&logo=zustand&logoColor=white" alt="Zustand" />
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white" alt="React Hook Form" />
  <img src="https://img.shields.io/badge/ZOD-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
  <img src="https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions" />
</p>

# Meal Recipe App

<a href="https://ibb.co/twx25b0q"><img src="https://i.ibb.co/WNPz1crk/image.png" alt="image" border="0" /></a>

This is a Single Page Application (SPA) built with React that allows users to browse, create, and manage a list of meal recipes. It demonstrates a modern frontend stack and includes features like client-side routing, state management, form handling, and persistent storage.

## Live Demo

You can view the live application deployed on GitHub Pages:

[**https://forthang.github.io/salfa/**](https://forthang.github.io/salfa/) or [**http://80.249.147.241/products**](http://80.249.147.241/products)

## Features

- **Browse & Paginate:** View a list of meals fetched from a public API, with simple pagination controls.
- **Search:** Instantly search for meals by either title or description without needing to press enter.
- **Filtering:** Filter the view to show "All", "Liked", and "Deleted" meals.
- **Create Meals:** Add your own custom meal recipes to the list via a dedicated creation form, including a photo upload.
- **Edit Meals:** Modify the title, description, and photo of any meal.
- **Like & Delete:** Mark meals as "Liked" or "Deleted" (soft delete).
- **Persistence:** All user actions (creations, edits, likes, deletes) are saved to the browser's `localStorage`, so your changes will be there when you return.


## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/forthang/salfa.git
    cd salfa
    ```

2.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).
### Or with docker
  ```bash
  git switch develop
  docker build  -t frontend-salfa .
  docker run -d -p 80:80 --name salfa-app frontend-salfa
 ```
  
## Available Scripts

In the `frontend` directory, you can run the following commands:

-   `npm run dev`: Starts the development server with Hot Module Replacement (HMR).
-   `npm run build`: Compiles and bundles the application for production into the `dist` folder.
-   `npm run lint`: Runs ESLint to check for code quality and style issues.
-   `npm run preview`: Starts a local server to preview the production build from the `dist` folder.
