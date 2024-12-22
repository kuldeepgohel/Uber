- # /users/register Endpoint Documentation
-
- ## Description
- The `/users/register` endpoint is responsible for registering a new user in the system. It performs the following steps:
-
- 1. Validates the request body using the `express-validator` library. If there are any validation errors, it returns a 400 Bad Request response with the errors.
- 2. Extracts the `fullname`, `email`, and `password` from the request body.
- 3. Hashes the password using the `userModel.hashPassword` function.
- 4. Creates a new user in the system using the `userService.createUser` function, passing in the `firstname`, `lastname`, `email`, and `hashedPassword`.
- 5. Generates an authentication token for the new user using the `user.generateAuthToken` function.
- 6. Returns a 201 Created response with the generated token and the user object.
-
- ## Status Codes
- - 201 Created: The user was successfully registered.
- - 400 Bad Request: There were validation errors in the request body.
- - 500 Internal Server Error: An error occurred while processing the request.
-
- ## Request Data
- The `/users/register` endpoint expects the following data in the request body:
-
- - `fullname` (object): An object containing the user's first and last name.
- - `firstname` (string): The user's first name.
- - `lastname` (string): The user's last name.
- - `email` (string): The user's email address.
- - `password` (string): The user's password.
# /users/login Endpoint Documentation

## Description
The `/users/login` endpoint is responsible for authenticating a user and generating an authentication token. It performs the following steps:

- Validates the request body using the `express-validator` library. If there are any validation errors, it returns a 400 Bad Request response with the errors.
- Extracts the `email` and `password` from the request body.
- Finds the user in the system using the `userService.findUserByEmail` function.
- Compares the provided password with the hashed password stored in the user object using the `userModel.comparePassword` function.
- If the passwords match, it generates an authentication token for the user using the `user.generateAuthToken` function.
- Returns a 200 OK response with the generated token and the user object.

## Status Codes
- 200 OK: The user was successfully authenticated.
- 400 Bad Request: There were validation errors in the request body.
- 401 Unauthorized: The provided email or password was incorrect.
- 500 Internal Server Error: An error occurred while processing the request.

## Request Data
The `/users/login` endpoint expects the following data in the request body:
- `email` (string): The user's email address.
- `password` (string): The user's password.

