# Documentation- Person Resource
  Test instructions available in README.md
  * local domain- `http://localhost:4000`
  * deployment domain- `https://hngstage1-api-akinolaaa.onrender.com`

## Assumptions && Limitations
* The `name` property in the person resource is not unique.
* A person and only be uniquely identified by the id.
* You can search by name in the `get all persons` request with a `name` query.
* Read and write operations on a unique resource can only be accessed through the id of the resource and not the name.
  
## Example Requests
### Create Person
* URL: `/api`
* Method: `GET`
* Body:
  ```bash
  {
    "name": "akinola"
  }
  ```
* Response: JSON response- object of person
  ```bash 
  status: 201 
  ```
  ```bash
  {
   "name": "john doe",
   "_id": "650083f2863af7986b5ab2df",
   "__v": 0
  }
  ```
  
### Get All Persons
### Without query
* URL: `/api`
* Method: `GET`
* Response: JSON response- Array of persons
  ```bash 
  status: 200 
  ```
  ```bash
    [
      {
         "_id": "64fef108ecd6b9fe4f0452da",
         "name": "someone",
         "__v": 0
      },
      {
         "_id": "64fef5eda7024fd4a5f6866f",
         "name": "sometwotwo",
         "__v": 0
      }
   ]
  ```
### With query
* URL: `/api?name=someone`
* Method: `GET`
* Response: JSON response- Array of persons
  ```bash 
  status: 200 
  ```
  ```bash
   [
      {
         "_id": "64fef108ecd6b9fe4f0452da",
         "name": "someone",
         "__v": 0
      }
   ]
  ```
  
### Get Single Person
* URL: `/api/:personId`
* Method: `GET`
* Response: JSON object of specified person with id: `personId`
  ```bash 
  status: 200 
  ```
   ```bash
  {
      "_id": "64fef108ecd6b9fe4f0452da",
      "name": "someone",
  }
  ```


### Update Person
* URL: `/api/:personId`
* Method: `PATCH`
* Body:
  ```bash
  {
    "name": "wavy"
  }
  ```
* Response: JSON response- object of person
  ```bash 
  status: 200
  ```
  ```bash
  {
   "_id": "64fef5eda7024fd4a5f6866f",
   "name": "wavy"
  }
  ```

### Delete Person
* URL: `api/persons/:personId`
* Method: `PATCH`
* Response: JSON response- object of person
  ```bash 
  status: 200
  ```
  ```bash
  {
   "msg": "person deleted successfully"
  }
  ```

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

