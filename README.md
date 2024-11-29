# Book Management

To run your full stack Book Management application locally, you'll need to follow these steps for both the frontend and backend. Here’s a detailed guide:

## Installation

Prerequisites

Make sure you have the following installed:
```
Node.js (v14 or higher)
npm (comes with Node.js)
PostgreSQL (or your preferred database)
```
# Step 1: Clone the Repository
If you haven't already, clone your project repository from GitHub:
```
git clone https://github.com/raj8807/bookmanagement.git


cd <your-project-directory>
```
# Step 2: Set Up the Backend
Navigate to the Backend Directory:

```
cd backend
```
Install Dependencies:
```
npm install
```
Set Up the Database:

Make sure your PostgreSQL database is running. Create a new database for the application if you haven't already.
Update your database configuration in .env file of Backend 

Your .env file should include your database connection string, 
JWT secret, and any other necessary environment variables. Example:
```
DB_HOST
DB_PORT
DB_USERNAME
DB_PASSWORD
DB_DB_NAME
JWT_SECRET
```



# Step 3: Set Up the Frontend
Open a New Terminal and Navigate to the Frontend Directory:

```
cd ../frontend
```
Install Dependencies:
```
npm install
```

Create a .env file in the frontend directory if it doesn't exist.
Add the API endpoint for your backend. For example:
```
REACT_APP_API_URL=http://localhost:3001
```

# For Start Server 

can start both application using single command 
on <your-project-directory> Run 
```
npm install

npm run dev
```

OR 
Start the Frontend Development Server:
```
cd ../frontend
npm start
```
Start the Backend Development Server:
```
cd ../backend
npm run start:dev
```


# Step 4: Access the Application

Open your web browser and navigate to http://localhost:3000 (or the port specified by your React app) to access the frontend.
The frontend should be able to communicate with the backend running on http://localhost:3001.


# Step 5: Testing the Application
You should be able to create, view, edit, and delete books through the frontend interface.



# Summary
Clone the repository.

Set up and run the backend.

Set up and run the frontend.

Access the application in your browser.

If you encounter any issues during setup, check the console for error messages, and ensure your environment 
variables are correctly configured. Feel free to reach out for further assistance!
