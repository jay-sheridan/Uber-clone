# Backend API Documentation

## `/users/register` Endpoint

### Description
Register a new user account.

### Request
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
- **Data (JSON)**:
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
        }}
    ``` 
- **422 Unprocessable Entity**: Returns an array of validation errors if inputs are invalid.
- **500 Internal Server Error**: Returns a generic error message for unexpected errors.

---

## `/users/login` Endpoint

### Description
Logs in an existing user by validating credentials and returning a JWT token.

### Request
- **HTTP Method:** `POST`
- **Endpoint:** `/users/login`
- **Request Body (JSON)**:
  ```json
  {
    "email": "valid email",
    "password": "string (min 6 chars)"
  }
  ```

### Response
- **200 OK**: 
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
          }}
      ``` 
- **400 Bad Request**: Returns an array of validation errors if inputs are invalid.
- **401 Unauthorized**: Returns a message if credentials are incorrect.
- **500 Internal Server Error**: Returns a generic error message for unexpected errors.