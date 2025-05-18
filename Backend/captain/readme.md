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
```