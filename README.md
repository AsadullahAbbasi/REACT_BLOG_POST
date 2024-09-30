Mega Blog - CRUD Blog Posting App

Deployed Link (https://react-blog-app-three-hazel.vercel.app/) 
A full-stack blog application built using React, Vite, and Appwrite. This project demonstrates creating, reading, updating, and deleting blog posts with Appwrite as the backend and various libraries like Redux Toolkit, React Hook Form, TinyMCE, and Tailwind CSS for managing state, form validation, rich text editing, and styling.

Features:
User Authentication using Appwrite.
CRUD operations for blog posts (Create, Read, Update, Delete).
Rich text editor for post creation using TinyMCE.
Image upload and management using Appwrite's file storage (Bucket).
State management using Redux Toolkit.
Form validation with React Hook Form.
Responsive UI design with Tailwind CSS.
Tech Stack
Frontend: React, Vite, Redux Toolkit, React Hook Form, TinyMCE
Backend: Appwrite for database, authentication, and storage
Styling: Tailwind CSS
Build Tool: Vite
Deployment: Vercel (for frontend), Appwrite (backend services)
Setup Instructions
Follow these steps to set up and run the project locally.

1. Clone the Repository
git clone https://github.com/yourusername/mega-blog.git
cd mega-blog

2. Install Dependencies
Make sure you have Node.js installed. Run the following command to install all required dependencies:
npm install
3. Set Up Environment Variables
Create a .env file at the root of your project and add the following environment variables. These are necessary to connect to your Appwrite project and services.

VITE_APPWRITE_URL="https://cloud.appwrite.io/v1".
VITE_APPWRITE_PROJECT_ID="".
VITE_APPWRITE_DATABASE_ID="".
VITE_APPWRITE_COLLECTION_ID="".
VITE_APPWRITE_BUCKET_ID="".

4. Running the App
To start the development server locally, use:

npm run dev
This will run the app at http://localhost:3000/ by default.

5. Build the App for Production
To build the project for production deployment:

npm run build
This will create a dist folder containing the optimized static files for deployment.

Environment Variables
This app relies on environment variables to configure Appwrite services.

Variable	Description
VITE_APPWRITE_URL	Appwrite endpoint URL
VITE_APPWRITE_PROJECT_ID	Your Appwrite project ID
VITE_APPWRITE_DATABASE_ID	Database ID for storing blog posts
VITE_APPWRITE_COLLECTION_ID	Collection ID for blog posts
VITE_APPWRITE_BUCKET_ID	Bucket ID for file uploads (images, etc.)
Make sure you replace these variables with your actual Appwrite project details in the .env file.

Deploying the App
Frontend Deployment (Vercel)
You can deploy the frontend of your app to Vercel.

Push your code to a GitHub repository.
Go to the Vercel dashboard, import your GitHub repository, and configure it.
Add the same environment variables on Vercel by going to your project settings -> Environment Variables.
Deploy!
Backend (Appwrite)
The backend is powered by Appwrite. Ensure you have the correct project and collection IDs set up in your Appwrite console.
