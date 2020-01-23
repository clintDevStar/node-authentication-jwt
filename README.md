# Authentication and Authorization with JWT

# Technology
1. Node.js
2. Express
3. MongoDB
4. JWT

## Server is running at:

https://fullstack-app.herokuapp.com/

## API Endpoints

| EndPoint              | Functionality                  |
| --------------------- | ------------------------------ |
| GET /users            | Get all the users              |
| POST /users           | Register a User                |
| POST /users           | Login a User                   |

* For /GET users endpoint, you need an admin token, Login with username: admin and password: admin@123, get the token then use the token to GET all users