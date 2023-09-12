# REST API with Node.js and Express

This is a simple REST API built using Node.js and Express. It provides endpoints for managing a person resource where a user can perform CRUD operations on the resource.

## Prerequisites

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Getting Started
On your terminal, type the following commands;
1. Clone the repository:

```bash
git clone https://github.com/Akinolaaa/hng-task-1.git
cd hng-task-1
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:
```bash
npm start
```

## Testing the API
1. Create `.env` file in the root folder i.e. file name should be .env
2. Copy and paste the following into the .env file created
   ```bash
   DB_URI=mongodb+srv://nodexexpress:bhQk6XJ5BehGDwYI@nodeexpressprojects.1we4a.mongodb.net/HNG-STAGE-2?retryWrites=true&w=majority
   ```
3. Run the command the following command in your terminal to begin testing.
   ```bash
   npm run test
   ```
### Note: During testing, person created with the create endpoint is deleted with the delete endpoint
The postman collection is the file named `hng.postman_collection.json`
