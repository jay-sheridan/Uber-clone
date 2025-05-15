# Backend API Documentation

## `/users/register` Endpoint

### Description
Register a new user by creating a user account with
## Request
- **HTTP Method:** `POST`
- **Endpoint:** `/users/register`
- **Request Body (JSON)**:
  ```json
  {
    "fullName": {
      "firstName": "string (min 3 chars)",
      "lastName": "string (optional, min 3 chars)"
    },
    "email": "valid email",
    "password": "string (min 6 chars)"
  }
  ```

## Response
- **Status:** `201 Created`: Returns a JSON object with `token` and the created `user`.
- **Body (JSON)**:
    ```json
    {
        "token": "string (JWT token)",
        "user": {
            "id": "string (user ID)",
            "fullName": {
                "firstName": "string",
                "lastName": "string (optional)"
            },
            "email": "valid email",
        }
    ``` 
- **422 Unprocessable Entity**: Returns an array of validation errors if inputs are invalid.
- **500 Internal Server Error**: Returns a generic error message for unexpected errors.