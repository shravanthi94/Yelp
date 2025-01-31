# Yelp Application

This is Yelp Web Application that allows users to register and order food online from the list of available restaurants and register for interesting events.

## Prototype of Yelp application

### Steps to deploy this application

#### Backend

1. Clone the repository's back end folder "Backend" into any machine having node.js installed on it.
2. Open the terminal in the folder "Backend".
3. Execute "npm install" to install all the dependencies.
4. Create a database "yelp" in MySQL database server and create sql tables.
5. Update "db.js" file in "config" folder inside Backend folder with database name and connection details.
6. Update the app.js file in Backend folder with frontend server's IP address and port.
7. Execute "node index" to run the backend server.
8. Launch the application

#### Front End

1. Clone the repository's front end folder "frontend" into any machine having node.js installed on it.
2. Open the terminal in the folder "frontend".
3. Execute "npm install" to install all the dependencies.
4. Update the "proxy" value in frontend "package.json" file with the backend server's IP address and port.
5. Go to the "Backend" folder in the terminal and use "npm run dev" command.

Open the browser and navigate to Front end server's IP address with Port number (Eg: 127.0.0.1:3000) to find the landing page.
