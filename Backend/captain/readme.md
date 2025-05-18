# Captain API Documentation

## `/captains/register` Endpoint

### Description
Registers a new captain account.

### Request
- **HTTP Method:** `POST`  
- **Endpoint:** `/captains/register`  
- **Request Body (JSON)**:
  ```json
  {
    "fullName": {
      "firstName": "string (min 3 chars)",
      "lastName": "string (min 3 chars) (optional)"
    },
    "email": "valid email",
    "password": "string (min 6 chars)",
    "vehicle": {
      "color": "string (min 3 chars)",
      "plate": "string (min 3 chars)",
      "capacity": "number (min 1)",
      "vehicleType": "string ('car', 'motorcycle', or 'auto')"
    }
  }
  ```

### Response
- **Status:** `201 Created`: Returns a JSON object with `token` and the created `captain`.
- **Data (JSON)**:
    ```json
    {
        "token": "string (JWT token)",
        "captain": {
            "id": "string (captain ID)",
            "fullName": {
                "firstName": "string",
                "lastName": "string (optional)"
            },
            "email": "valid email",
            "vehicle": {
                "color": "string",
                "plate": "string",
                "capacity": "number",
                "vehicleType": "string ('car', 'motorcycle', or 'auto')"
            }
        }}
    ``` - **400 Bad Request**: 
  - Validation errors (array of error messages).  
  - Captain already exists.  
- **500 Internal Server Error**: Returns a generic error message for unexpected errors.
---
## `/captains/login` Endpoint

### Description
Logs in an existing captain by verifying credentials.

### Request
- **HTTP Method:** `POST`  
- **Endpoint:** `/captains/login`  
- **Request Body (JSON)**:
  ```json
  {
    "email": "valid email",
    "password": "string (min 6 chars)"
  }
  ```

### Response
- **Status:** `200 OK`: Returns a JSON object with `token` and the logged-in `captain`.
- **Data (JSON)**:
  ```json
  {
    "token": "string (JWT token)",
    "captain": {
      "id": "string (captain ID)",
      "fullName": {
        "firstName": "string",
        "lastName": "string (optional)"
      },
      "email": "valid email",
      "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": "number",
        "vehicleType": "string ('car', 'motorcycle', or 'auto')"
      }
    }
  }
  ```
- **400 Bad Request**: Validation errors or wrong credentials.  
- **500 Internal Server Error**: Returns a generic error message for unexpected errors.
---
## `/captains/profile` Endpoint

### Description
Returns the profile of the currently authenticated captain.

### Request
- **HTTP Method:** `GET`  
- **Endpoint:** `/captains/profile`  
- **Request Body:** *None*

### Authentication
- **Authentication Required**: Yes
- **Headers**: 
  - `Authorization`: `Bearer <token>` (JWT token)
####  or ####
- **cookies**: 
  - `token`: `<token>` (JWT token)

### Response
- **Status:** `200 OK`: Returns the captain's data.  
- **Data (JSON)**:
  ```json
  {
    "id": "string (captain ID)",
    "fullName": {
      "firstName": "string",
      "lastName": "string (optional)"
    },
    "email": "valid email",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string ('car', 'motorcycle', or 'auto')"
    }
  }
  ```
- **401 Unauthorized**: Returns a message if no valid token is provided.  
- **500 Internal Server Error**: Returns a generic error message for unexpected errors.
---
## `/captains/logout` Endpoint

### Description
Logs out the currently authenticated captain.

### Request
- **HTTP Method:** `GET`  
- **Endpoint:** `/captains/logout`  
- **Request Body:** *None*

### Authentication
- **Authentication Required**: Yes
- **Headers**: 
  - `Authorization`: `Bearer <token>` (JWT token)
####  or ####
- **cookies**: 
  - `token`: `<token>` (JWT token)

### Response
- **Status:** `200 OK`:  
  ```json
  {
    "message": "Logged out successfully"
  }
  ```
- **401 Unauthorized**: Returns a message if no valid token is provided.  
- **500 Internal Server Error**: Returns a generic error message for unexpected errors.