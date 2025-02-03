<div align="center">
<h1>Onlinestore RESTFul API Express.js</h1>
</div>

---

## Overview
> npm start

**Authentication**
> **Admin :** To get an admin user, please change the role in the database role : Vendor / Customer to admin

> **Customer / Vendor :**  choice role default : customer and vendor

- `POST /users/register` - Create new user
  ```json
  {
    "name" : "example", // required | 
    "email" : "example@mail.com", // required
    "password" : "admin", // required
    "password_confirmation" : "admin", // required
    "phone_number" : "0835XXXXXXXX", // required
    "address" : "JL damai No 20 Block D, Yogyakarta", // required
    "role" : 1, // 1 -> customer , 2-> vendor || required
    "gender" : 2, // 1 -> male , 2 -> female || required
    "profile_picture" : "image.jpg" // required
    }
  ```

- `POST /users/login/` - Login 
  ```json
    {
    "email" : "example@mail.com",
    "password" : "admin"
    }
  ```

## Vendor Features
> **Vendor :** Become a seller

- `POST /products/` - Create new product
- `PATCH /products/:id` - Update product
- `GET /products/user` - Get all user products
- `GET /products/` - Get all products
- `DELETE /products/:id` - Delete product
- `GET /products/quaey` - Get by keywords
- `GET /feedbacks/` - Get all feedback
- `GET /feedbacks/:productID` - Get all feedbacks by productID


## Customer Features
> **Customer** 

- `GET /products/` - Get all products
- `POST /orders/` - Create new order
- `GET /orders/:id` - Get detail orders
- `DELETE /orders/:id` - Delete order
- `POST /feedbacks/` - Create new feedback to vendor
 
## Admin Features
> **Admin** 

- `GET /admin/users/` - Get all users
- `GET /admin/users/:id` - Get detail user
- `DELETE /admin/users/:id` - Delete user
  
[Read Documentation](guide/docs.md)