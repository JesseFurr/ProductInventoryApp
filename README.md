# Product Inventory App

A full-stack inventory management application built with ASP.NET Core, Entity Framework Core, SQL Server, and React.

The project was created as a hands-on full-stack learning project to practice building a REST API, connecting it to a relational database, and consuming that API from a React frontend.

## Features

- Create products
- View all products
- Edit existing products
- Delete products
- Server-side validation with ASP.NET Core Data Annotations
- Client-side display of validation errors
- Search products by name
- Sort products by:
  - Name
  - Price
  - Quantity
- Ascending and descending sorting
- Filter products by minimum and maximum price
- Responsive product card layout
- Loading and error states
- Cancel product editing

## Tech Stack

### Backend

- C#
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- LINQ
- Dependency Injection
- DTOs
- Data Annotations

### Frontend

- React
- JavaScript
- Vite
- HTML
- CSS
- Fetch API

- ## Screenshot

![Product Inventory App](screenshots/productapp.png)

## Project Structure

```text
ProductInventoryApp/
│
├── Controllers/
├── Data/
├── DTOs/
├── Migrations/
├── Models/
├── Services/
│
├── product-client/
│   ├── src/
│   │   ├── api/
│   │   ├── App.jsx
│   │   ├── ProductForm.jsx
│   │   └── ProductList.jsx
│   └── package.json
│
├── Program.cs
├── appsettings.json
└── ProductApi.csproj




Backend Architecture

The ASP.NET Core backend is separated into several layers.

Controllers handle HTTP requests and responses.
DTOs define the data exposed through the API.
Services contain product-related business and database logic.
Entity Framework Core handles database access.
SQL Server stores product data.

The API supports standard CRUD operations:

GET    /api/products
GET    /api/products/{id}
POST   /api/products
PUT    /api/products/{id}
DELETE /api/products/{id}
Frontend Architecture

The React frontend communicates with the ASP.NET Core API using HTTP requests through the Fetch API.

API-related code is separated into:

src/api/productsApi.js

while App.jsx manages application state and coordinates the UI.

Reusable components include:

ProductForm.jsx
ProductList.jsx

Running the Project: Requirements
You will need:

.NET 9 SDK
SQL Server
Node.js
npm

1. Clone the repository
git clone https://github.com/JesseFurr/ProductInventoryApp.git

Then navigate into the project directory.

2. Configure the database

Update the connection string in:

appsettings.json

Example:

"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=ProductApiDb;Trusted_Connection=True;TrustServerCertificate=True;"
}

Apply the Entity Framework migrations:
Update-Database

Or with the .NET CLI:
dotnet ef database update

3. Run the ASP.NET Core API

From the backend project directory:
dotnet run

4. Configure the React frontend

Create a .env file inside:
product-client/

Add the API address:
VITE_API_URL=http://localhost:5149

The exact port may differ depending on your local ASP.NET configuration.

5. Run the React frontend

From the product-client directory:
npm install
npm run dev

Open the Vite address shown in the terminal, typically:
http://localhost:5173
Validation

Product creation and updates are validated by the ASP.NET Core API.

Examples include:

Product name is required
Product name has a maximum length
Price must be within an allowed range
Quantity cannot be negative

Validation responses from the API are parsed and displayed by the React frontend.

What I Practiced

This project helped reinforce:

Building RESTful APIs with ASP.NET Core
CRUD operations
Entity Framework Core
SQL Server integration
Dependency Injection
DTOs and model validation
Async programming with async / await
HTTP response handling
React state management
Controlled form inputs
Component props
Array methods such as map, filter, and sort
Client-side searching, filtering, and sorting
Separating frontend API logic from UI logic
Responsive CSS layouts
Future Improvements

Possible future additions include:

Authentication and user accounts
Product categories
Pagination
Server-side searching and filtering
Automated testing
Cloud deployment

Author:
Jesse Furr
