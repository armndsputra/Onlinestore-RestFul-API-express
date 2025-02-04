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
    "role" : 1, // customer : 1, vendor : 2 || required
    "gender" : 2, // male : 1, female : 2 || required
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

- [x] `POST /products/` - Create new product
- [x] `PATCH /products/:id` - Update product
- [x] `GET /products/user` - Get all user products
- [x] `GET /products/` - Get all products
- [x] `DELETE /products/:id` - Delete product
- [x] `GET /products/quaey` - Get by keywords
- [x] `GET /feedbacks/` - Get all feedback
- [x] `GET /feedbacks/:id` - Get all feedbacks by productID


## Customer Features
> **Customer** 

- [x] `GET /products/` - Get all products
- [x] `POST /orders/` - Create new order
- [x] `GET /orders/:id` - Get detail orders
- [x] `DELETE /orders/:id` - Delete order
- [x] `POST /feedbacks/` - Create new feedback to vendor
 
## Admin Features
> **Admin** 

- [x] `GET /admin/users/` - Get all users
- [x] `GET /admin/users/:id` - Get detail user
- [x] `DELETE /admin/users/:id` - Delete user
  
[Read Documentation](guide/docs.md)